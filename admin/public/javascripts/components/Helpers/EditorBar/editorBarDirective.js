(function() {
  'use strict';

    var editorBar = function() {
        var directive = {
            restrict: 'AEC',
            replace: true,
            controller: 'editorBarCtrl',
            templateUrl: 'html/editorBar.html'
        };

        return directive;
    };



angular
  .module('Helpers')
  .directive('editorBar', editorBar);

})();
