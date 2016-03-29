(function() {
	'use strict';

	//Factory Comment which contains function for building comments
	var Comment = function() {

		function CommentBuilder(commentId, postId, author, date, commentText){
	    this.commentId = commentId;
	    this.postId = postId;
	    this.author = author;
	    this.date = date;
	    this.commentText = commentText;
		}

		return CommentBuilder;
	};

//Creation of factory Comment
angular
	.module('Api')
	.factory('Comment', Comment);

})();
