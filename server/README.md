
# Production

This document is intended as a guide for individuals deploying or managing ViewBovis as a production service. It includes details on:
1. [containerisation](#docker) with [Docker](https://www.docker.com/); 
1. [the architecture of application hosting the SCE](#architecture);
1. [how to connect to and update the server](#ranch-869);
1. [the automated procedures and services](#system) which are configured to run the application and log its outputs;
1. [nginx proxy server](#nginx);
1. [logging](#logging); 
1. [analytics](#analytics); 
1. [deployment](#deploy).

## <a name="docker"></a> Docker container

Importantly, when run in production, ViewBovis runs within a Docker container. The main advantage of this being the reduced effort to re-deploy on a new server if required. 

### Dockerfile

The [Dockerfile](https://github.com/aphascience/ViewBovis/blob/main/Dockerfile) defines the Docker image by setting up key features:
1. the base os (ubuntu 22.04);
1. copies files from this repository into the image;
1. installs all dependencies, e.g. [Flask](https://flask.palletsprojects.com/en/2.3.x/), [Gunicorn](https://gunicorn.org/) etc;
1. the entry point/command to run in order to start the app.

It is not necessary to manually build the Docker image or run the container as automated [system services](#system) take care of this. However, if you wish to manually build the image for any reason, run `docker build -t viewbovis .` from the root of this repository.

And to manually start the container:

```
docker run --rm -d --network host --name viewbovis \
    --mount type=bind,source=/ViewBovis,target=/data \
    --mount type=bind,source=/var/log/viewbovis-access.log,target=/ViewBovis/access.log \
    --mount type=bind,source=/var/log/viewbovis-error.log,target=/ViewBovis/error.log \
    viewbovis
```

This will also automatically start the app. The container will share the host machine's networking namespace, thanks to `--network host`. Thus, requests on any port of localhost on the host machine will be forwarded to the same port of the container. 

### Gunicorn production server

Gunicorn is installed within the Docker image, and implicitly run when the container is launched. Therefore, it is not necessary to install or configure it when setting up the server or deploying the app.

Gunicorn is a Python WSGI HTTP Server for UNIX. It is capable of running applications written in the Flask/Django frameworks scalably in a production environment. It is advised to run the Flask application using Gunicorn because the server that's bundled with Flask is not scalable and intended for development purposes only (e.g. a single client).

When the Docker container is launched it runs Gunicorn with the following command:

```
gunicorn -b 127.0.0.1:3000 -w 4 deploy:app --log-level=info --access-logfile /ViewBovis/access.log --error-logfile /ViewBovis/error.log
```
This will start the Gunicorn running the ViewBovis application running in the Docker container, on port 3000 on localhost with 4 worker threads.

## <a name="architecture"></a> Architecture

The system architecure diagram, shown below, illustrates the data flow for the ViewBovis web app:

1. WGS data and sample results csv files are stored within the `s3-csu-003` bucket within the CSU community on the SCE. When new samples are added to the bucket, a job manager (human) uploads sample metadata to LIMS which resides on the DEFRA corporate network.
1. The metadata warehouse is a SQL database that resides on the corporate network. It links with the LIMS and SAM/CTS databases to provide metadata for the ViewBovis application. 
1. The WGS data in `s3-csu-003` and metadata warehouse exports are periodically processed by running [`btb-forestry`](https://github.com/APHA-CSU/btb-forestry/tree/main) which generates the SNP matrixes, `viewbovis.db` database file and JSON exports required to serve ViewBovis. `btb-forestry` is manually run on a dev machine by a human service manager and will automatically download the conesnus sequences from `s3-csu-003` and automatically upload the results to `s3-csu-003`. 
1. The ViewBovis application runs on the production machine `ranch-869` from the `ranch-869` user. This machine has been specifically approved by APHA IT to serve users within the DEFRA corporate network via `port 80`. When the server is booted up it automatically downloads the latest production data from `s3-csu-003` via a system service to `/ViewBovis`.
1. An [nginx](https://nginx.org/en/) proxy server that runs on the machine routes external requests from `port 80` at the `viewbovis-beta.int.sce.network` subdomain to `port 3000` on localhost. The app itself is run using [Gunicorn](https://gunicorn.org/) as production server within a [Docker](https://www.docker.com/) container which shares the host machine's networking namespace. Gunicorn serves the app to `port 3000` within the container and therefore also on the host machine. The Nextsrain Auspice dashboard is also served through nginx on a separate subdomain, `nextstrain-beta.int.sce.network`. Requests at this subdomain are forwarded to port 4001 by nginx. The Auspice dashboard is embedded in the app, using an iframe which points back to the externally facing `nextstrain-beta.int.sce.network` subdomain.
1. Requests from users on the corporate network are routed to `ranch-869` via the SCE managed PaloAlto VPN service. The VPN manages traffic into and out of the SCE, as well as authenticating requests to users via a login screen. The VPN ensures only those who have been granted access by SCE governance can reach the server. Authenticated requests are routed to `ranch-869`, `port 80`.

![architecture](https://github.com/aphascience/ViewBovis/assets/10742324/081165f2-2785-4335-91ad-a0a77f511b6c)

## <a name="ranch-869"></a> `ranch-869` Management

`ranch-869` is the production machine that serves multiple applications to the corporate network. To minimise the risks of service disruption, it's crucial the server is managed with care and caution. Think about your actions when interacting with the server, and ask questions if you are unsure. 

### Access to `ranch-869`

`ranch-869` can be accessed remotely from a DEFRA computer using SSH or via NoMachine. The `ranch-869` user is the common access user that runs production services. If you are not performing maintainance on the production service, you should login with your personal SCE username. 

For a guide on how SSH into an SCE EC2 instance, such as `ranch-869`, see the [SCE SPOL article](https://defra.sharepoint.com/teams/Team741/SitePages/Help-articles.aspx).

## <a name="system"></a> Automated operational procedures

`ranch-869` is turned on automatically at 8am and switched off automatically at 10pm, 7 days a week. 

Automatic start-up is managed by SCE support, and power-down is implemented via a cronjob on `ranch-869`.

`systemd` is used to manage system services crucial to running the ViewBovis application. 

#### On startup

When the server is booted, systemd will automatically run services to:

1. [`server/systemd/download_viewbovis_data.service`](https://github.com/aphascience/ViewBovis/blob/main/server/viewbovis.service) pulls the production data from `s3-csu-003` and saves it to `/ViewBovis`.
1. Start the nginx proxy server. - The nginx installation deals with this service, we just need to ensure that [nginx is installed on the server and the proxy server is configured correctly](#nginx). 
1. [`server/systemd/viewbovis.service`](https://github.com/aphascience/ViewBovis/blob/main/server/viewbovis.service) starts the ViewBovis Docker container by running [`deploy.sh`](https://github.com/aphascience/ViewBovis/blob/main/server/deploy.sh).
1. [`server/systemd/nextstrain.service`](https://github.com/aphascience/ViewBovis/blob/main/server/nextstrain.service) starts the Nextstrain auspice server. 

These services ensure that the app is automatically made available to users and that it is up-to-date with the latest production data as soon as the server starts.

#### On shutdown

Before the server shuts down, systemd will run a service, [`server/systemd/viewbovis_analytics.service`](https://github.com/aphascience/ViewBovis/blob/main/server/viewbovis_analytics.service), to run [`parse_nginx_log.py`](https://github.com/aphascience/ViewBovis/blob/main/parse_nginx_log.py).  

#### <a name="server-updates"></a> Updating 

When building the server, or after making changes to these systemd service files they need to be copied to the `/etc/systemd/system` folder on the server and subsequently the service need to be started: 

```
sudo cp /GITHUB_REPO/server/systemd/* /etc/systemd/system/
sudo systemctl daemon-reload
sudo systemctl enable viewbovis.service nextstrain.service viewbovis_analytics.service
sudo systemctl start viewbovis.service nextstrain.service vewbovis_analytics.service
```

## <a name="nginx"></a> nginx proxy server

Multiple Applications can be served simultaneously through a single externally-facing port. This is achieved using a nginx proxy server that forwards requests on `port 80` to `localhost` ports. The forwarding rule is based on the subdomain of the request: 

Currently, we have two services being served through nginx:

- `viewbovis-bets.int.sce.network` - `port 3000` 
- `nextstrain-beta.int.sce.network` - `port 4001`


### Installation

The nginx server only needs to be started once when building the server machine. 

The [nginx configuration](#https://github.com/aphascience/ViewBovis/blob/main/server/nginx.conf) is stored in `server/nginx.config`. To install and start the nginx server: 
```
sudo apt-get update
sudo apt-get install nginx
sudo cp /GITHUB_REPO/server/nginx.conf /etc/nginx/sites-enabled/default
sudo systemctl daemon-reload
sudo systemctl enable nginx
sudo systemctl start nginx
```

Once the nginx server is enabled it will automatically run on startup. To check the status of the nginx server, call:
```
sudo systemctl status nginx
```
Output:
```
● nginx.service - A high performance web server and a reverse proxy server
     Loaded: loaded (/lib/systemd/system/nginx.service; enabled; vendor preset: enabled)
     Active: active (running) since Fri 2023-07-28 08:00:40 BST; 2h 11min ago
       Docs: man:nginx(8)
   Main PID: 877 (nginx)
      Tasks: 5 (limit: 37665)
     Memory: 13.1M
     CGroup: /system.slice/nginx.service
             ├─877 nginx: master process /usr/sbin/nginx -g daemon on; master_process on;
             ├─885 nginx: worker process
             ├─886 nginx: worker process
             ├─887 nginx: worker process
             └─892 nginx: worker process

Jul 28 08:00:39 ranch-869 systemd[1]: Starting A high performance web server and a reverse proxy server...
Jul 28 08:00:40 ranch-869 systemd[1]: Started A high performance web server and a reverse proxy server.
```

### Configuring the proxy server

If you would change the ports that applications listen on, or change the number of applications, you will need to modify the nginx config. To modify the config, edit the `/etc/nginx/sites-enabled/default` file, restart the service and commit to source.

```
sudo cp /etc/nginx/sites-enabled/default /GITHUB_REPO/server/nginx.conf
git checkout -b NEW_BRANCH_NAME
git add /GITHUB_REPO/nginx/nginx.conf
git commit -m "modifying nginx config"
git push origin NEW_BRANCH_NAME
```

## <a name="logging"></a> Logging

Access and error logs are generated by the app.

The access log provides details on HTTP requests to the ViewBovis API. The error log records everything from info level and above, from the ViewBovis application, Flask and Gunicorn. These logs are generated inside the running Docker container however, are saved to mount points on the host container, `/var/log/viewbovis-access.log` and `/var/log/viewbovis-error.log`.   

## <a name="analytics"></a> Analytics

Some very basic analytics are recorded by parsing the nginx access log which provides details on what http requests have been made, i.e. which parts of the app are accessed.

[`parse_nginx_log.py`](https://github.com/aphascience/ViewBovis/blob/main/server/parse_nginx_log.py) is run via systemd prior to automatic shutdown of the server at 10pm each day.

The output of this script is a `json` file, detailing the number of times each API request was made in a given day. See example below:

```
{
    "/ ": 7,
    "/sample": 24,
    "/sample/related": 5,
    "/sample/matrix": 4,
    "/charon/getDataset": 22
}
```
This json file is saved daily to `/var/log/viewbovis_requests_YYYY-mm-dd` on the server, e.g. `/var/log/viewbovis_requests_2023-07-27`.

## <a name="deploy"></a> Deployment

Before deploying new versions of the software, it is important to deploy a version to the testing domain on `ranch-869`. To deploy a test version:

1. merge the `main` branch into the `prod-test` branch (this can be done locally):

    ```
    git checkout prod-test
    git merge master
    ```
1. push the `prod-test` branch to the remote repository in github.com:
    ```
    git push origin prod-test
    ```
    This will automatically trigger the test-deploy workflow in github actions which builds the test docker image and pushes it to DockerHub
1. log onto `ranch-869` as the `ranch-869` user and update the local test version of this repository:

    ```
    cd ~/ViewBovis-test
    git pull origin prod-test
    ```
1. and pull the latest test image from DockerHub:

    ```
    docker pull aphacsubot/viewbovis:prod-test
    ```
1. start the testing version of the application:
    
    ```
    bash server/deploy.sh /ViewBovis testing
    ```
1. connect to the testing version of the application via PaloAlto and test that all functionality of the app is working as designed. Use the [checklist document](https://defra.sharepoint.com/:w:/r/teams/Team4008/_layouts/15/Doc.aspx?sourcedoc=%7BFA3F5A41-F72D-4518-AAB1-FF02AE5A2D26%7D&file=ViewBovisChecks_FollowingARelease_September2023.docx&action=default&mobileredirect=true) for guidance on assuring that the app is working properly. 
1. if everything is working, kill the testing docker container and move onto deploying the production version:

    ```
    docker kill viewbovis-test
    ```


**To deploy a new production version of the software to the server:**

1. publish a new release of the software. For instruction on this, follow the [release process document](https://github.com/aphascience/ViewBovis/blob/main/release_process.md)
1. merging into the production branch will automatically trigger the deploy workflow in github actions which builds the production docker image and pushes it to DockerHub 
1. log onto `ranch-869` as the `ranch-869` user and update the local version of this repository:

    ```
    cd ~/ViewBovis
    git pull origin prod
    ```
1. and pull the latest production image from dockerhub:

    ```
    docker pull aphacsubot/viewbovis:prod
    ```

1. To make the latest changes immediately available, either reboot the server, `sudo reboot now`, or restart the ViewBovis container service, `sudo systemctl restart viewbovis.service`

If you are making changes to any of the server configuration files, e.g. `systemd`, these will need to updated in a more manual procedure as they sit outside of the Docker container. See [Updates](#server-updates) for this procedure.  
