var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('./log');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var mongoose = require('./db');

// Mongoose config
require('./models/Posts');
require('./models/Comments');

//Passport config
var passport = require('passport');
require('./models/Users');
require('./config/passport');

// Routes for db
var routes = require('./routes/index');
var postsRouter = require('./routes/posts');
var loginRouter = require('./routes/login');
var registerRouter = require('./routes/register');

var app = express();

var env = process.env.NODE_ENV;
logger.info("Environment: ", env);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/admin', express.static('static'));
app.use('/admin/tests', express.static('tests'));

//Inital render of template
app.use('/admin', routes);

app.use('/admin/posts', postsRouter);
app.use('/admin/login', loginRouter);
app.use('/admin/register', registerRouter);

app.use(passport.initialize());

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

//Listen on exposed port 80

module.exports = app;
