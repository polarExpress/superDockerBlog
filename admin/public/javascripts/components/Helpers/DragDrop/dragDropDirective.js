(function() {
  'use strict';

    var dragDrop = function() {
        var directive = {
            restrict: 'AEC',
            replace: true,
            scope: {
              elements: '='
            },
            controller: 'dragDropCtrl',
            templateUrl: 'html/dragDrop.html'
        };

        return directive;
    };



angular
  .module('Helpers')
  .directive('dragDrop', dragDrop);

})();
