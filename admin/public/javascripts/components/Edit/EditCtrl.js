(function() {
  'use strict';

	var EditCtrl = ['$scope', '$rootScope', '$state', 'PostSvc', 'postId', 'post', 'isLoggedIn', 'toaster',
		function($scope, $rootScope, $state, PostSvc, postId, post, isLoggedIn, toaster) {

      $rootScope.postPage = false;

      $scope.post = post;
      $scope.title = post.title;

      var text = angular.fromJson(post.text[0]);

      $scope.elements = {
        list: text,
        selected: null
      };

      $scope.save = function() {
        post.text = angular.toJson($scope.elements.list);
        post.title = $scope.title;

        PostSvc.update(post, postId)
          .then(function() {
            toaster.pop({
              type: 'success',
              body: 'Post edited!'
            });
            $state.go('posts');
  			});
      };

	}];

angular
	.module('Edit')
	.controller('EditCtrl', EditCtrl);

})();
