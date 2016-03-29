(function() {
  'use strict';

    var commentsBox = function() {
        var directive = {
            restrict: 'AEC',
            replace: true,
            scope: {
              comments: '=',
              user: '=',
              post: '='
            },
            controller: 'commentsBoxCtrl',
            templateUrl: 'html/commentsBox.html'
        };

        return directive;
    };



angular
  .module('Helpers')
  .directive('commentsBox', commentsBox);

})();
