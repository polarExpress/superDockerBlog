(function(){

var editorBarCtrl = ['$scope', '$state', 'pickerSvc', function($scope, $state, pickerSvc) {

  $scope.chooseElement = function() {
    pickerSvc.showElementPicker()
      .then(function(data) {
        $scope.elements.list.push(data);
      })
      .catch(function(err) {
        console.log("Error getting element data: ", err);
      });
  };

  $scope.deleteElement = function(element) {
    var index = _.findIndex($scope.elements.list, {id: element.id});
    $scope.elements.list.splice(index, 1);
  };

  $scope.cancel = function() {
    $state.go('posts');
  };

}];

angular
  .module('Helpers')
  .controller('editorBarCtrl', editorBarCtrl);

})();
