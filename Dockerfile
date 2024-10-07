FROM ubuntu:22.04

################## METADATA ##########################

LABEL base.image=ubuntu:22.04
LABEL software="ViewBovis"
LABEL about.summary="web-app for bovine TB outbreak surveillance and analysis"
LABEL about.documentation="https://github.com/aphascience/ViewBovis"

################## SETUP ############################

# args
ARG port=3000
ARG workers=8

# Copy repository
WORKDIR "/ViewBovis/"
COPY ./ ./
RUN cd app

################## DEPENDENCIES ######################

# Update
RUN apt-get -y update

# Install python3 
RUN apt-get -y install python3 python3-pip

## Install pip
RUN apt-get -y install curl
RUN curl -sS https://bootstrap.pypa.io/get-pip.py | python3.10 

# Install python dependencies
RUN python3.10 -m pip install -r requirements.txt
################### ENTRY ##############################

WORKDIR "/ViewBovis/app"
