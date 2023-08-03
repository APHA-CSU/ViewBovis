# ViewBovis

![GitHub Actions](https://github.com/aphascience/ViewBovis/actions/workflows/build_and_test.yml/badge.svg)

---

`ViewBovis` is an APHA web application for use as a disease surveillance and breakdown investigation tool for bovine TB. It combines Whole Genome Sequencing (WGS) data of M. bovis with geographical locations of hosts animals to understand bTB transmission.

![Capture](https://github.com/aphascience/ViewBovis/assets/10742324/76f407b7-2351-4a43-8efe-3e02cf1bd0c0)

## Flask

TODO

## ViewBovis API

TODO

## Nextstrain

TODO

## Installation

**Please note**: These installation instructions are intended for developers who wish to install, run and develop on the app. This will install the code natively. **Alternatively, for deployment instructions and other details on running the app in production see the [README in `/server`](https://github.com/aphascience/ViewBovis/tree/main/server).**

### Source code
To get source code, Javascript and HTML files, clone this GitHub repository:  
```
git clone https://github.com/aphascience/ViewBovis.git
```
```
cd ViewBovis
```

### Python and dependencies

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

## Running the app

Simply run:

```
cd app
```
```
python deploy.py --data_path <path/to/data/dir>
```
This will start a Flask development server listening at localhost on port 5000. 

To connect to the app simply visit `http://127.0.0.1:5000` on the device that the server is running on.

## <a name="data"></a> Data

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
