(function() {
  'use strict';

    var titleDirective = function() {
        var directive = {
            restrict: 'AEC',
            replace: true,
            scope: {
              title: '='
            },
            controller: 'titleEditorCtrl',
            templateUrl: 'html/titleDirective.html'
        };

        return directive;
    };



angular
  .module('Helpers')
  .directive('titleDirective', titleDirective);

})();
