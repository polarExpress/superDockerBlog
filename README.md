# Angular super blog

### Installation

You need to have nodeJS and bower installed on your local machine. I assume you have root privileges.

```sh
$ apt-get update && apt-get install node
$ apt-get install nodejs
$ apt-get install npm
$ apt-get install bower
```

Then go into blog folder and execute two commands:

```sh
$ npm run install 
$ cd .. && cd admin && npm run install 
```

And after that docker setup:

```sh
$ docker-compose -f development.yml build
$ docker-compose -f development.yml up
```
Then go to your localhost and you should see the app runing. If you have problems with libsass or node-sass just change command:

```sh
$ start:development: npm run installSass
```
