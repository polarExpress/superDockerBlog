# Angular super blog

### Version
0.0.0

### Tech

Dillinger uses a number of open source projects to work properly:

* [AngularJS] - HTML enhanced for web apps!
* [Twitter Bootstrap] - great UI boilerplate for modern web apps
* [node.js] - evented I/O for the backend
* [Express] - fast node.js network app framework
* [Gulp] - the streaming build system
* [jQuery]


### Installation

You need to have nodeJS and bower installed on your local machine. I assume you have root privileges.

```sh
$ apt-get update && apt-get install node
$ apt-get install nodejs
$ apt-get install npm
$ apt-get install bower
```
Then you need to go inside folder called blog and run these two commands in order to create static folder and move all html files inside (in future gulp will do those things):

```sh
$ npm run createStatic
$ npm run moveHtml
```

Then go into blog folder and execute two commands:

```sh
$ docker-compose -f development.yml build
$ docker-compose -f development.yml up
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

   [node.js]: <http://nodejs.org>
   [Twitter Bootstrap]: <http://twitter.github.com/bootstrap/>
   [jQuery]: <http://jquery.com>
   [express]: <http://expressjs.com>
   [AngularJS]: <http://angularjs.org>
   [Gulp]: <http://gulpjs.com>
