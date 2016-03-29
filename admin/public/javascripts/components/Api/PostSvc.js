
(function() {
  'use strict';

	var PostSvc = ['PostApiSvc' ,function(PostApiSvc) {
		//POST specific post
		this.post = function(post) {
			var postPromise = PostApiSvc.submitPost(post);
			return postPromise;
		};

    //PUT specific post
    this.update = function(post, postId) {
      var postPromise = PostApiSvc.updatePost(post, postId);
      return postPromise;
    };

    this.delete = function(postId) {
      var postPromise = PostApiSvc.deletePost(postId);
      return postPromise;
    };

		this.get = function(postId) {
			var postPromise;

			if (typeof postId == 'undefined') {
				postPromise = PostApiSvc.getAllPosts();
			}	else {
				postPromise = PostApiSvc.getPostById(postId);
			}

			return postPromise;
		};

	}];

angular
	.module('Api')
	.service('PostSvc', PostSvc);

})();
