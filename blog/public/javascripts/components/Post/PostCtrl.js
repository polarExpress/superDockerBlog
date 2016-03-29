(function() {
  'use strict';

	var PostCtrl =
  ['$scope', 'postId', 'post', 'isLoggedIn', '$sanitize', '$sce', 'user',
		function($scope, postId, post, isLoggedIn, $sanitize, $sce, user) {

    $scope.isLoggedIn = isLoggedIn;

		$scope.post = post;

    $scope.user = user;
    $scope.comments = post.comments;

    var text = angular.fromJson(post.text[0]);
    var concatenated = '';

    _.forEach(text, function(item) {
      concatenated += item.html;
    });

    $scope.postHtml = concatenated;

    $scope.trustAsHtml = function(string) {
      return $sce.trustAsHtml(string);
    };

	}];

angular
	.module('Post')
	.controller('PostCtrl', PostCtrl);

})();
