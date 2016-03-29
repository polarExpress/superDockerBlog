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
* REGISTER USER
*
***************************************/

//POST for new registration path = /register
router.post('/', function(req, res, next){
  if(!req.body.username || !req.body.password){
    return res.status(400).json({message: 'Please fill out all fields'});
  }

  var user = new User();

  user.username = req.body.username;

  user.setPassword(req.body.password)

  user.save(function (err) {
    if(err) {
      return next(err);
    }

    return res.json({token: user.generateJWT()})
  });
});

module.exports = router;
