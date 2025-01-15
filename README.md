# ViewBovis

![GitHub Actions](https://github.com/aphascience/ViewBovis/actions/workflows/build_and_test.yml/badge.svg)

---

`ViewBovis` is an APHA web application for use as a disease surveillance and breakdown investigation tool for bovine TB. It combines Whole Genome Sequencing (WGS) data of M. bovis with geographical locations of hosts animals to understand bTB transmission.

![Capture](https://github.com/aphascience/ViewBovis/assets/10742324/76f407b7-2351-4a43-8efe-3e02cf1bd0c0)

## ViewBovis API

This repository provides a rest API for the ViewBovis application. The API is written in Python using the [Flask web framework](https://flask.palletsprojects.com/en/3.0.x/). The main interface to the API can be observed in `app/viewbovis.py` which shows the five API endpoints: `/`, `/sample`, `sample/movements`, `/sample/related` and `/sample/matrix`. The main implementation for these endpoints is found in `app/viewbovis_data.py`, where the application queries the database and SNP matrix CSVs for data and constructs python dictonaries to be returned as JSON by the API.

Requests at `/` return the main `index.html` page. All other requests return data in JSON format relating to a sample of interest (SOI) (the SOI is encoded in a query string paramater along with additional information). To see details of each endpoint please read the docstrings found in `app/viewbovis.py` and `app/viewbovis_data.py` along with the viewing the integration tests, found at `app/tests/integration_tests.py` which serves as documentation for the API detailing the expected response to a wide variety of requests at each endpoint. 

## Nextstrain

[Nextstrain](https://nextstrain.org/) is a key feature of the ViewBovis application that provides clade-wise phylogentic trees for M. bovis isolates in cattle and wildlife alongside a geographical map of isolate location. An [APHA developed version of Auspice](https://github.com/APHA-CSU/auspice) (Nextstrain's web-tool for visualising phylogentic data) is included within the main ViewBovis application via an iframe. This means that the client must be able to directly connect to a running Auspice server in order for the iframe to work.

For more details on Auspice and Nextstrain, please see the [APHA's auspic repo](https://github.com/APHA-CSU/auspice) and the documentation at [nextstrain.org](https://nextstrain.org/).

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
python3.10 -m pip install virtualenv
```
4. Setup and activate new virtual environment:
```
python3.10 -m virtualenv -p /usr/bin/python3.10 </path/to/the/new/virtualenv/>
```
```
source </path/to/the/new/virtualenv/>bin/activate
```
5. The app uses the [`Flask`](https://flask.palletsprojects.com/en/2.0.x/) web development framework and has a number of other Python dependencies. To install all dependencies:
```
pip install -r requirements.txt
```
6. The frontend of the app depends on `react-Vitejs`, `react-Vitejs` needs `Node.js` and `npm`. To install `Node.js` and `npm`:
#### Download and install nvm:
```
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.1/install.sh | bash
```

#### Download and install Node.js:
```
nvm install 20
```

## Running the app

### To run the backend(Flask) server, Simply run:

```
cd app
```
```
python deploy.py --data_path <path/to/data/dir>
```
This will start a Flask development server listening at localhost on port 5000. 

To connect to the app simply visit `http://127.0.0.1:5000` on the device that the server is running on.

### To run the frontend(react Vite.js) server, Simply run:
```
cd app/front_end
```
```
npm install
```
```
npm run dev
```
This will start a React development server listening at localhost on port 5173. 

To connect to the app simply visit `http://127.0.0.1:5173` on the device that the server is running on.
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
