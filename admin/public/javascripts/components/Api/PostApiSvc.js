(function() {
  'use strict';

	var PostApiSvc = ['$http', 'AuthFactory' ,function($http, AuthFactory) {

		this.getAllPosts = function() {
			return $http.get('/admin/posts');
		};

		this.submitPost = function(post) {
			return $http.post('/admin/posts', post, {
				headers: {
					Authorization: 'Bearer '+ AuthFactory.getToken()
				}
			});
		};

    this.deletePost = function(postId) {
			return $http.delete('/admin/posts/' + postId, {
				headers: {
					Authorization: 'Bearer '+ AuthFactory.getToken()
				}
			});
		};

    this.updatePost = function(post, postId) {
      return $http.put('/admin/posts/' + postId, post, {
        headers: {
          Authorization: 'Bearer '+ AuthFactory.getToken()
        }
      });
    };

		this.getPostById = function(postId) {
			return $http.get('/admin/posts/' + postId)
			.then(function(res) {
				return res.data;
			});
		};

	}];

angular
	.module('Api')
	.service('PostApiSvc', PostApiSvc);

})();
