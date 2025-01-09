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

# Install python dependencies
RUN python3 -m pip install -r requirements.txt

################## BUILD REACT FILES #################
WORKDIR "/ViewBovis/app/front_end"

#Set Enough space for vitejs esbuild
ENV NODE_OPTIONS="--max_old_space_size=8192"
COPY ./ ./

RUN apt-get -y update

#Install curl
RUN apt-get -y install curl gnupg

#Install nodejs setup files
RUN curl -sL https://deb.nodesource.com/setup_20.x  | bash -

#Install nodejs and run build process for front-end
RUN apt-get -y install nodejs && npm install && npm run build
################### ENTRY ##############################

WORKDIR "/ViewBovis/app"
