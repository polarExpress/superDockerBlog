(function() {
  'use strict';

	var PostsCtrl =
  ['$scope', '$state', '$rootScope', 'PostSvc', 'isLoggedIn', '$sce', 'user', 'AuthFactory', 'toaster', 
  function($scope, $state, $rootScope, PostSvc, isLoggedIn, $sce, user, AuthFactory, toaster) {

    $rootScope.isLoggedIn = isLoggedIn;
    $scope.user = user;

    $rootScope.postPage = true;

    $scope.deletePost = function(id) {
      PostSvc.delete(id).then(function(data) {
        $scope.posts = data.data;
        toaster.pop({
          type: 'success',
          body: 'Post deleted!'
        });
      });
    };

    $scope.logout = function(){
      AuthFactory.logOut()
      .then(function() {
        $state.go('login');
      });
    };

		PostSvc.get()
		.success(function(data) {
			$scope.posts = data;
		});

	}];

angular
	.module('Posts')
	.controller('PostsCtrl', PostsCtrl);

})();
