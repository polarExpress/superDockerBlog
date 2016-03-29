(function(){

var titleEditorCtrl = ['$scope', function($scope) {

  $scope.editTitle = function() {
    $scope.editingTitle = true;
  };

  $scope.saveTitle = function() {
    $scope.editingTitle = false;
  };

}];

angular
  .module('Helpers')
  .controller('titleEditorCtrl', titleEditorCtrl);

})();
