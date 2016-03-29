var express = require('express');
var router = express.Router();

//Mongoose paths API
var mongoose = require('../db');

//Passport
var passport = require('passport');

//Authentication middleware: https://github.com/auth0/express-jwt
var jwt = require('express-jwt');
var config = require('../config/env/common');
var secret = config.secret;
var auth = jwt({secret: secret, userProperty: 'payload'});

var User = mongoose.model('User');

/**************************************
*
* LOGIN USER
*
***************************************/

//POST for new login path = /login
router.post('/', function(req, res, next) {
  if(!req.body.username || !req.body.password) {
    return res.status(400).json({message: 'Please fill out all fields'});
  }

  passport.authenticate('local', function(err, user, info) {
    if(err) {
      return next(err);
    }

    if(user) {
      return res.json({token: user.generateJWT()});
    } else {
      return res.status(401).json(info);
    }
  })(req, res, next);
});

module.exports = router;
