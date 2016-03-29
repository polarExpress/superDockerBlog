(function(){

var pickerModalCtrl = ['$scope', '$uibModalInstance', 'pickerDatabaseSvc',
  function($scope, $uibModalInstance, pickerDatabaseSvc) {

  $scope.elements = [
    {
      name: 'Text box',
      functionName: 'getJumbotron'
    }
  ];

  $scope.pickElement = function(functionName) {
    var element = pickerDatabaseSvc[functionName]();
    $uibModalInstance.close(element);
  };

  $scope.cancel = function(){
    $uibModalInstance.dismiss('cancelled');
  };

}];

angular
  .module('Helpers')
  .controller('pickerModalCtrl', pickerModalCtrl);

})();
