//Mongo middleware
var mongoose = require('../db');
//Node crypto library
var crypto = require('crypto');
//JWT token generator
var jwt = require('jsonwebtoken');
//Variables
var config = require('../config/env/common');

var UserSchema = new mongoose.Schema({
  username: {
    type: String,
    lowercase: true,
    unique: true
  },
  hash: String,
  salt: String
});

//Node crypto library for hashing password
UserSchema.methods.setPassword = function(password){
  this.salt = crypto.randomBytes(16).toString('hex');
  //Key length = 64, iterations = 1000 (need to be same in validPassword function)
  this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64).toString('hex');
};

UserSchema.methods.validPassword = function(password) {
  var hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64).toString('hex');

  return this.hash === hash;
};

UserSchema.methods.generateJWT = function() {
  var secret = config.secret;

  // Token expiration set to 60 days
  var today = new Date();
  var exp = new Date(today);
  exp.setDate(today.getDate() + 60);

  return jwt.sign({
    _id: this._id,
    username: this.username,
    exp: parseInt(exp.getTime() / 1000),
  }, secret);
};

mongoose.model('User', UserSchema);
