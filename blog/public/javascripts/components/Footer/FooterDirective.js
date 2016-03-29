(function() {
  'use strict';

  var footerDirective = function() {
    return {
      restrict: 'AEC',
      replace: true,
      templateUrl: 'html/footer.html',
      controller: 'FooterCtrl'
    };
  };

angular
  .module('Footer')
  .directive('footerDirective', footerDirective);

})();
