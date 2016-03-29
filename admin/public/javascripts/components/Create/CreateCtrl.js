(function() {
  'use strict';

	var CreateCtrl =
  ['$scope', '$rootScope', '$state', 'PostSvc', 'isLoggedIn', 'user', 'toaster',
	function($scope, $rootScope, $state, PostSvc, isLoggedIn, user, toaster) {

      $rootScope.postPage = false;

      $scope.elements = {
        list: [],
        selected: null
      };

      $scope.title = 'Insert title here...';

      $scope.save = function() {

        var post = {
          text: angular.toJson($scope.elements.list),
          date: new Date(),
          author: user,
          title: $scope.title
        };

  			//Send post to database
  			PostSvc.post(post)
        .success(function() {
          toaster.pop({
            type: 'success',
            body: 'Post created!'
          });
          $state.go('posts');
  			});
  		};

	}];

angular
	.module('Create')
	.controller('CreateCtrl', CreateCtrl);

})();
