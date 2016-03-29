(function() {
  'use strict';

  var LoginCtrl = ['$scope', '$rootScope', '$state', 'AuthFactory', 'toaster',
    function($scope, $rootScope, $state, AuthFactory, toaster) {

    $rootScope.postPage = false;
    $scope.user = {};

    $scope.logIn = function() {

      if (!$scope.user.username || !$scope.user.password) {
        toaster.pop({
          type: 'error',
          body: 'Fill all the fields!'
        });
        return;
      }

      AuthFactory.logIn($scope.user)
      .then(function() {
        $state.go('posts');
      })
      .catch(function(err) {
        console.log("Login error!");
        toaster.pop({
          type: 'error',
          body: 'Wrong username or password!'
        });
      });
    };
  }];

angular
  .module('Login')
  .controller('LoginCtrl', LoginCtrl);

})();
