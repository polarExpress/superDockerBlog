/*
*	Mongodb database middleware for connecting to database 
*/

var mongoose = require('mongoose');

var logger = require('../log');

var dbUri = 'mongodb://mongodb/blog';

// Connect to the database defined in env

logger.debug("Connecting Mongoose...");

var retryTimeout = 5;

var recursiveMongoConnect = function(uri) {
	mongoose.connect(uri, function(err) {
		if (err) {
			if (retryTimeout > 45) {
				throw new Error("Mongoose connection failed:", err);
			}

			logger.error("Mongoose connection error:", err);
			logger.error("Retrying Mongoose connect in " + retryTimeout +
				" seconds...");

			setTimeout(function() {
				retryTimeout *= 3;	// 5 -> 15 -> 45
				recursiveMongoConnect(uri);
			}, retryTimeout * 1000);

			return;
		}

		logger.info("Mongoose connection ready" +
			(retryTimeout > 5 ? " after retry." : "."));
	});
};

recursiveMongoConnect(dbUri);

module.exports = mongoose;
