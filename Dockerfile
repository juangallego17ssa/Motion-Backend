# The FROM instruction specifies the Parent Image from which you are building.
FROM continuumio/miniconda3:latest
ENV LANG=C.UTF-8 LC_ALL=C.UTF-8

# Installs node
RUN apt-get update
RUN apt-get upgrade -y
RUN apt-get install curl -y
RUN curl -sL https://deb.nodesource.com/setup_14.x | bash - && apt-get install -y nodejs

# Creates the directories that will have our image! You can change them if you want, but be consequent and change them everywhere!
RUN mkdir -p /backend
RUN mkdir -p /scripts
RUN mkdir -p /static-files
RUN mkdir -p /media-files
RUN mkdir -p /frontend

# Copy the requirements file from local folder to image
COPY ./backend/requirements.yml /backend/requirements.yml

# create the environment inside the docker container
RUN /opt/conda/bin/conda env create -f /backend/requirements.yml


# Copy the script folder from local folder to image
COPY ./scripts /scripts

# Mark the script as executable, so it will run once you run the image
RUN chmod +x ./scripts

# we set the path where all the python pacakages are
ENV PATH /opt/conda/envs/conda_motion/bin:$PATH
ENV PYTHONDONTWRITEBYTECODE=1
# activate the environment
RUN echo "source activate conda_motion" >~/.bashrc

# pass all the files and folders from local folder to image
COPY ./backend /backend

# install the frontend dependencies and copy the frontend files
WORKDIR /frontend
COPY ./frontend/package.json /frontend/
COPY ./frontend/package-lock.json /frontend/
RUN npm install
COPY ./frontend/ /frontend
RUN npm run build

# set the working directory to /backend for whenever you login into your container
WORKDIR /backend
