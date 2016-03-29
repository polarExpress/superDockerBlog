(function() {
  'use strict';

	var PostsCtrl = ['$scope', '$rootScope', 'PostSvc', 'isLoggedIn',
    function($scope, $rootScope, PostSvc, isLoggedIn) {

    $rootScope.isLoggedIn = isLoggedIn;

		PostSvc.get()
		.success(function(data) {
			$scope.posts = data;
		});

	}];

angular
	.module('Posts')
	.controller('PostsCtrl', PostsCtrl);

})();
