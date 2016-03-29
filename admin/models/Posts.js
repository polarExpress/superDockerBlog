var mongoose = require('../db');

// Schema for one post, with array of comments
var PostSchema = new mongoose.Schema({
  title: String,
  date: Date,
  text: Array,
  author: String, 
  upvotes: {
    type: Number,
    default: 0
  },
  comments: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Comment'
  }]
});

PostSchema.methods.upvote = function(cb) {
  this.upvotes += 1;
  this.save(cb);
};

mongoose.model('Post', PostSchema);
