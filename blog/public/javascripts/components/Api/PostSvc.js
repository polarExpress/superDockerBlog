
(function() {
  'use strict';

	var PostSvc = ['PostApiSvc' ,function(PostApiSvc) {
		//POST specific post
		this.post = function(post) {
			var postPromise = PostApiSvc.submitPost(post);
			return postPromise;
		};

		//GET posts or specific post
		this.get = function(postId) {
			var postPromise;

			// If no id specified retrieve all posts
			if (typeof postId == 'undefined') {
				postPromise = PostApiSvc.getAllPosts();
			}
			//Otherwise get only specific post
			else {
				postPromise = PostApiSvc.getPostById(postId);
			}

			return postPromise;
		};

	}];

angular
	.module('Api')
	.service('PostSvc', PostSvc);

})();
