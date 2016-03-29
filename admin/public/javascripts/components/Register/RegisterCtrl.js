(function() {
  'use strict';

  var RegisterCtrl = ['$scope', '$rootScope', '$state', 'AuthFactory', 'isLoggedIn', 'toaster',
    function($scope, $rootScope, $state, AuthFactory, isLoggedIn, toaster) {

    $rootScope.isLoggedIn = isLoggedIn;
    $scope.user = {};

    $rootScope.postPage = false;

    $scope.register = function() {

      if (!$scope.user.username || !$scope.user.password) {
        toaster.pop({
          type: 'error',
          body: 'Fill all the fields!'
        });
        return;
      }

      AuthFactory.register($scope.user)
      .error(function(err) {
        toaster.pop({
          type: 'error',
          body: 'User already exists!'
        });
      })
      .then(function() {
        $state.go('posts');
      });
    };
  }];

angular
  .module('Register')
  .controller('RegisterCtrl', RegisterCtrl);

})();
