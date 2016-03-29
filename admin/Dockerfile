FROM node:4.3.0

MAINTAINER Timotej Kos timppa.12@outlook.com

RUN apt-get update -qq && apt-get install -y build-essential

RUN mkdir -p admin
WORKDIR /admin

# Install Prerequisites
RUN npm install -g grunt-cli
RUN npm install -g bower

# Install packages
ADD package.json /admin/package.json
RUN npm install

# Manually trigger bower
ADD .bowerrc /admin/.bowerrc
ADD bower.json /admin/bower.json
RUN bower install --config.interactive=false --allow-root

# Add everything
ADD . /admin

ENTRYPOINT ["npm"]
