var mongoose = require('../db');

// Schema for one comment with reference to one post 
var CommentSchema = new mongoose.Schema({
  author: String,
  body: String,
  upvotes: {type: Number, default: 0},
  post: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Post'
  }
});

mongoose.model('Comment', CommentSchema);
