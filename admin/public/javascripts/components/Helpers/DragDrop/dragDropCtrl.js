(function(){

var dragDropCtrl = ['$scope', '$sce', '$location', '$rootScope', function($scope, $sce, $location, $rootScope) {

  $scope.activeEdit = null;

  $scope.trustAsHtml = function(string) {
    return $sce.trustAsHtml(string);
  };

  $scope.editElement = function(elm) {
    $scope.activeEdit = elm.id;
    $location.hash(elm.id);
  };

  $scope.saveEdit = function(item) {
    $location.url($location.path());
    $scope.activeEdit = null;
  };

  $scope.deleteElement = function(element) {
    var index = _.findIndex($scope.elements.list, {id: element.id});
    $scope.elements.list.splice(index, 1);
  };

}];

var toolbarConfig = function($provide) {
  // this demonstrates how to register a new tool and add it to the default toolbar
  $provide.decorator('taOptions', ['taRegisterTool', '$delegate',
    function(taRegisterTool, taOptions) { // $delegate is the taOptions we are decorating

      //Second new button
      taRegisterTool('colourRed', {
        iconclass: "fa fa-square red",
        action: function() {
          this.$editor().wrapSelection('forecolor', 'red');
        }
      });

      //Specifiy which buttons we need in editor
      taOptions.toolbar = [
        ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p',
        'bold', 'italics', 'underline', 'strikeThrough', 'ul',
         'ol', 'redo', 'undo', 'clear', 'html',
         'justifyLeft', 'justifyCenter', 'justifyRight']
      ];

      //Add the buttons
      taOptions.toolbar[0].push('colourRed');

      return taOptions;
  }]);
};

angular
  .module('Helpers')
  .config(toolbarConfig)
  .controller('dragDropCtrl', dragDropCtrl);

})();
