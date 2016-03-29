FROM node:4.3.0

MAINTAINER Timotej Kos timppa.12@outlook.com

RUN mkdir -p blog
WORKDIR /blog

# Install packages
ADD package.json /blog/package.json
RUN npm install

# Add everything
ADD . /blog

ENTRYPOINT ["npm"]
