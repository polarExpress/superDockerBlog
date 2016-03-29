(function(){

var commentsBoxCtrl = ['$scope', 'PostSvc', 'CommentSvc',
function($scope, PostSvc, CommentSvc) {

  $scope.commentBody = '';
  $scope.commentAuthor = '';

  var postId = $scope.post._id;

  $scope.upvote = function() {
    PostSvc.upVotePost(postId)
    .success(function(data) {
      post.upvotes += 1;
    });
  };

  $scope.addComment = function() {
    if ($scope.commentBody === '') {
      return;
    }

    var comment = {
      body: $scope.commentBody,
      author: $scope.user
    };

    CommentSvc.addComment(postId, comment)
    .success(function(post) {
      $scope.comments = post.comments;
    });

    $scope.commentBody = '';
    $scope.commentAuthor = '';
  };

  $scope.upVoteComment = function(comment) {
    CommentSvc.upvoteComment()
    .success(function(data){
      comment.upvotes += 1;
    });
  };

	$scope.editComment = function(comment) {
		$scope.editingComment = comment._id;
	};

  $scope.deleteComment = function(comment) {
    var index = _.findIndex($scope.comments, {_id: comment._id});
    $scope.comments.splice(index, 1);
  };

	$scope.saveEdit = function() {
    $scope.editingComment = null;
	};



}];

angular
  .module('Helpers')
  .controller('commentsBoxCtrl', commentsBoxCtrl);

})();
