(function() {
  'use strict';

	var CommentApiSvc = ['$http', 'AuthFactory' ,function($http) {

		this.addComment = function(id, comment) {
			return $http.post('/admin/posts/' + id + '/comments', comment);
		};

	}];

angular
	.module('Api')
	.service('CommentApiSvc', CommentApiSvc);

})();
