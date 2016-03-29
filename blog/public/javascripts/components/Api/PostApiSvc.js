(function() {
  'use strict';

	var PostApiSvc = ['$http', 'AuthFactory' ,function($http) {

		this.getAllPosts = function() {
			return $http.get('/admin/posts');
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
