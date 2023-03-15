# ViewBovis

* TODO: add details on Nextstrain!

### **under development**
---

`ViewBovis` is an APHA web application for exploring Whole Genome Sequencing (WGS) data of M. bovis, linking genetic relatedness with geographical locations of hosts to understand bTB transmission.

![Capture](https://user-images.githubusercontent.com/10742324/225293739-eaf5ac12-53ad-44d3-abe0-449d4988bdf5.PNG)


## Data

A local data repository must be structured as follows:

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

where the `snp_matrix` directory contains SNP matrix CSV files for all 30 M. bovis clades and `viewbovis.db` is a sqlite database. All data are outputs of [`btb-forestry`](https://github.com/APHA-CSU/btb-forestry). 


## Installation

### Source code
To get source code, Javascript and HTML files, clone this GitHub repository:  
```
git clone https://github.com/aphascience/ViewBovis.git
cd ViewBovis
```

### Python and dependencies

1. The app depends on Python and is tested on `Python3.10`. To install `Python3.10`:

```
sudo apt-get update -y
sudo apt-add-repository ppa:deadsnakes/ppa
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
source </path/to/the/new/virtualenv/>bin/activate
```
5. The app uses the [`Flask`](https://flask.palletsprojects.com/en/2.0.x/) web development framework and has a number of other Python dependencies. To install all dependencies:
```
pip install -r requirements.txt
```

## Running the app

***currently the app is only built for running in development mode**

### Native
If Python and all dependencies have been correctly installed the app can be run natively. 

Simply run:

```
cd app
python deploy.py --data_path <path/to/data/dir>
```
This will start a Flask development server listening at localhost on port 5000. 

To connect to the app simply visit `http://127.0.0.1:5000` on the device that the server is running on.

### Docker
To run the app inside a Docker container, you must have the [Docker engine](https://docs.docker.com/engine/install/) installed on your system.

You will not need to have Python and other dependencies installed.

1. Build the docker container:

```
cd ViewBovis
docker build -t viewbovis .
```
2. Run the container
```
bash deploy.sh <path/to/data/directory>
```

As with running the app natively, to connect to the app simply visit `http://127.0.0.1:5000` on the device that the Docker container is running on.

