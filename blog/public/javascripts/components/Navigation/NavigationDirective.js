(function() {
  'use strict';

  var navbarDirective = function() {
    return {
      restrict: 'AEC',
      replace: true,
      templateUrl: 'html/navigation.html',
      controller: 'NavigationCtrl'
    };
  };

angular
  .module('Navigation')
  .directive('navbarDirective', navbarDirective);

})();
