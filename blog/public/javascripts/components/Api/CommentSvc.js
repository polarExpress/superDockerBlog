(function() {
  'use strict';

	var CommentSvc = ['CommentApiSvc' ,function(CommentApiSvc) {

		this.addComment = function(postId, comment) {
			var postPromise = CommentApiSvc.addComment(postId, comment);

			return postPromise;
		};

		this.upvoteComment = function(post, comment) {
			var postPromise = CommentApiSvc.upvoteComment();

			return postPromise;
		};

	}];

angular
	.module('Api')
	.service('CommentSvc', CommentSvc);

})();
