# ViewBovis

![GitHub Actions](https://github.com/aphascience/ViewBovis/actions/workflows/build_and_test.yml/badge.svg)

* TODO: add details on Nextstrain!

### **under development**

---

`ViewBovis` is an APHA web application for use as a disease surveillance and breakdown investigation tool for bovine TB. It combines Whole Genome Sequencing (WGS) data of M. bovis with geographical locations of hosts animals to understand bTB transmission.

![Capture](https://user-images.githubusercontent.com/10742324/225293739-eaf5ac12-53ad-44d3-abe0-449d4988bdf5.PNG)

## Development
**Please note**: These installation instructions are intended for developers who wish to install, run and develop on the app. This will install the code natively. **Alternatively, for deployment instructions and other details on running the app in production see [Production](#production).**
### Installation

#### Source code
To get source code, Javascript and HTML files, clone this GitHub repository:  
```
git clone https://github.com/aphascience/ViewBovis.git
```
```
cd ViewBovis
```

#### Python and dependencies

1. The app depends on Python and is tested on `Python3.10`. To install `Python3.10`:

```
sudo apt-get update -y
```
```
sudo apt-add-repository ppa:deadsnakes/ppa
```
```
sudo apt-get install Python3.10
```
2. Install the pip package manager:

```
curl -sS https://bootstrap.pypa.io/get-pip.py | python3.10
```
3. It is recommended to use a virtual environment using either [`venv`](https://docs.python.org/3/library/venv.html) or [`virtualenv`](https://virtualenv.pypa.io/en/stable/installation.html). To install `virtualenv`:

```
python3 -m pip install virtualenv
```
4. Setup and activate new virtual environment:
```
virtualenv -p /usr/bin/python3.10 </path/to/the/new/virtualenv/>
```
```
source </path/to/the/new/virtualenv/>bin/activate
```
5. The app uses the [`Flask`](https://flask.palletsprojects.com/en/2.0.x/) web development framework and has a number of other Python dependencies. To install all dependencies:
```
pip install -r requirements.txt
```

### Running the app

Simply run:

```
cd app
```
```
python deploy.py --data_path <path/to/data/dir>
```
This will start a Flask development server listening at localhost on port 5000. 

To connect to the app simply visit `http://127.0.0.1:5000` on the device that the server is running on.

#### <a name="data"></a> Data

A local data directory must be structured as follows:

```
├── snp_matrix
│   ├── B1-11_01Mar23_matrix.csv
│   ├── B2-11_01Mar23_matrix.csv
│   ├── B3-11_01Mar23_matrix.csv
│   .
|   .
|   .
└── viewbovis.db
```

where the `snp_matrix` directory contains SNP matrix CSV files for all 30 M. bovis clades and `viewbovis.db` is a sqlite database containing metadata relating to host species movements, dates and WGS information. All data are outputs of [`btb-forestry`](https://github.com/APHA-CSU/btb-forestry). 

When running locally for development purposes, the application can be pointed to this folder at runtime.

## <a name="production"></a> Production

### Architecture

The system architecure diagram, shown below, illustrates the data flow for the ViewBovis web app:

1. WGS data and sample results csv files are stored within the `s3-csu-003` bucket within the CSU community on the SCE. When new samples are added to the bucket, a job manager (human) uploads sample metadata to LIMS which resides on the DEFRA corporate network.
1. The metadata warehouse is a SQL database that resides on the corporate network. It links with the LIMS and SAM/CTS databases to provide metadata for the ViewBovis application. 
1. The WGS data in `s3-csu-003` and metadata warehouse exports are periodically processed by running [`btb-forestry`](https://github.com/APHA-CSU/btb-forestry/tree/main) which generates the SNP matrixes, `viewbovis.db` database file and JSON exports required to serve ViewBovis. `btb-forestry` is manually run on a dev machine by a human service manager and will automatically download the conesnus sequences from `s3-csu-003` and automatically upload the results to `s3-csu-003`. 
1. The ViewBovis application runs on the production machine `ranch-159` from the `ranch-159` user. This machine has been specifically approved by APHA IT to serve users within the DEFRA corporate network via `port 80`. When the server is booted up it automatically downloads the latest production data from `s3-csu-003` via a system service to `/ViewBovis`.
1. An [nginx](https://nginx.org/en/) proxy server that runs on the machine routes external requests from `port 80` at the `viewbovis-beta.int.sce.network` subdomain to `port 3000` on localhost. The app itself is run using [Gunicorn](https://gunicorn.org/) as production server within a [Docker](https://www.docker.com/) container which shares the host machine's networking namespace. Gunicorn serves the app to `port 3000` within the container and therefore also on the host machine. The Nextsrain Auspice dashboard is also served through nginx on a separate subdomain, `nextstrain-beta.int.sce.network`. Requests at this subdomain are forwarded to port 4001 by nginx. The Auspice dashboard is embedded in the app, using an iframe which points back to the externally facing `nextstrain-beta.int.sce.network` subdomain.
1. Requests from users on the corporate network are routed to `ranch-159` via the SCE managed PaloAlto VPN service. The VPN manages traffic into and out of the SCE, as well as authenticating requests to users via a login screen. The VPN ensures only those who have been granted access by SCE governance can reach the server. Authenticated requests are routed to `ranch-159`, `port 80`.


### PaloAlto Hosting

To access the ViewBovis application, users log in via the SCE PaloAlto VPN Service on a web browser (e.g. chrome) in the corporate network (shown below). Once authenticated via a password challenge, users arrive at a portal. The portal contains buttons that point to each of the applications that run on `ranch-159`.

### `ranch-159` Management

`ranch-159` is the production machine that serves multiple applications to the corporate network. This section describes how to manage `ranch-159`. To minimise the risks of service disruption, it's crucial the server is managed with care and caution. Think about your actions when interacting with the server, and ask questions if you are unsure. 

#### Access to `ranch-159`

`ranch-159` can be accessed remotely from a DEFRA computer using SSH or via NoMachine. The `ranch-159` user is the common access user that runs production services. If you are not performing maintainance on the production service, you should login with your personal SCE username. 

For a guide on how SSH into an SCE EC2 instance, such as `ranch-159`, see the [SCE SPOL article](https://defra.sharepoint.com/teams/Team741/SitePages/Help-articles.aspx).

#### Automated operational procedures

`ranch-159` is turned on automatically at 8am and switched off automatically at 10pm, 7 days a week. 

Automatic start-up is managed by SCE support, and power-down is implemented via a cronjob on `ranch-159`.

`systemd` is used to manage system services crucial to running the ViewBovis application. 

##### On startup

When the server is booted, systemd will automatically run services to:

1. Pull the production data from `s3-csu-003` and save to `/ViewBovis` (TODO). This data will be structured as outlined [above](#data). 
1. Start the nginx proxy server.
1. Start the ViewBovis Docker container by running [`deploy.sh`](https://github.com/aphascience/ViewBovis/blob/main/deploy.sh). This runs the container.

These services ensure that the app is automatically made available to users as soon as the server starts.

##### On shutdown

Before the server shuts down, systemd will run a service to run [`parse_nginx_log.py`](https://github.com/aphascience/ViewBovis/blob/main/parse_nginx_log.py).  

## Gunicorn

TODO

## nginx

TODO

## Deployment

TODO

## Logging and analytics

TODO