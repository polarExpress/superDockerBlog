var express = require('express');
var router = express.Router();

//Mongoose paths API
var mongoose = require('../db');

var logger = require('../log');

//Passport
var passport = require('passport');

//Authentication middleware: https://github.com/auth0/express-jwt
var jwt = require('express-jwt');
var config = require('../config/env/common');
var secret = config.secret;
var auth = jwt({secret: secret, userProperty: 'payload'});

var Post = mongoose.model('Post');
var Comment = mongoose.model('Comment');

/**************************************
*
* GET PATHS
*
***************************************/

//GET all posts path = /posts
router.get('/', function(req, res, next) {
  Post.find(function(err, posts) {
    if (err) {
      return next(err);
    }
    //Success, send posts to show in blog
    res.json(posts);
  });
});

//GET specific post by ID path = /posts/<postId>
router.get('/:post', function(req, res, next) {
  //populate method for retreiving comments along with post
  req.post.populate('comments', function(err, post) {
    if (err) {
      return next(err);
    }

    //Return JSON data to user
    res.json(post);
  });
});

/**************************************
*
* POST PATHS
*
***************************************/

//POST new post path = /posts
router.post('/', auth, function(req, res, next) {
  //Create new instance of post
  var post = new Post(req.body);
  //Set post author directly from payload
  post.author = req.payload.username;

  //Try to save post to the database
  post.save(function(err, post) {
    if(err) {
     return next(err);
    }

    res.json(post);
  });
});

//POST for comment in specific post /posts/<postId>/comments
router.post('/:post/comments', function(req, res, next) {
  Post.findById(req.post._id, function (err, post) {
    if (err) {
      logger.error("Post finding error: ", err);
      return;
    }
    //Create new comment
    var comment = new Comment(req.body);
    comment.post = post;

    comment.save(function(err, comment) {
      if(err) {
        return next(err);
      }
      post.comments.push(comment);

      post.save(function(err, post) {
        if(err) {
          return next(err);
        }
        post.populate('comments', function(err, post) {
          if (err) {
            return next(err);
          }

          //Return JSON data to user
          res.json(post);
        });
      });
    });
  });
});

/**************************************
*
* PUT PATHS
*
***************************************/

//PUT for upvote specific post by ID path = /posts/<postId>/upvote
router.put('/:post/upvote', auth, function(req, res, next) {
  req.post.upvote(function(err, post) {
    if (err) {
      return next(err);
    }

    res.json(post);
  });
});

//PUT specific post by ID path = /posts/<postId>
router.put('/:post', auth, function(req, res, next) {

  Post.findById(req.post._id, function (err, post) {
    if (err) {
      return handleError(err);
    }

    //req.body contains data that we putted into the request, in this case
    //object with text, author and title. We save only text currently
    post.text = req.body.text;
    post.title = req.body.title;

    post.save(function (err) {
      if (err) {
        logger.error("Post save err: ", err);
        return handleError(err);
      }
      logger.info("Post saved! ", post);
      res.json(post);
    });
  });
});

/**************************************
*
* REMOVE PATHS
*
***************************************/

//REMOVE specific post by ID path = /posts/<postId>
router.delete('/:post', auth, function(req, res, next) {
  logger.error("req.body: ", req.body);
  logger.error("req: ", req);

  Post.findById(req.post._id, function (err, post) {
    if (err) {
      logger.error("Post finding error: ", err);
      return;
    }

    post.remove(function(err) {
      if (err) {
        logger.error("Post deleting error: ", err);
        return;
      }
      logger.info("Post deleting success");

      Post.find(function(err, posts) {
        if (err) {
          logger.error("Error fetching posts: ", err);
        }
        //Success, send posts to show in blog
        res.json(posts);
      });
    });
  });
});

/**************************************
*
* PARAM for Express http://expressjs.com/en/api.html#app.param
*
***************************************/

//Express param method which binds callback to "post" parameter (post in blog)
router.param('post', function(req, res, next, id) {
  //Query for mongodb which will be executed later
  var query = Post.findById(id);

  //Mongo exec function which executes the query defined in previous line
  query.exec(function (err, post) {
    if (err) {
       return next(err);
     }

    if (!post) {
       return next(new Error('can\'t find post'));
     }

    req.post = post;
    return next();
  });
});

//Express param method which binds callback to "comment" parameter
router.param('comment', function(req, res, next, id) {
  //Query for mongodb which will be executed later
  var query = Comment.findById(id);

  //Mongo exec function which executes the query defined in previous line
  query.exec(function (err, comment) {
    if (err) {
       return next(err);
     }

    if (!comment) {
       return next(new Error('can\'t find comment'));
     }

    req.comment = comment;
    return next();
  });
});

module.exports = router;
