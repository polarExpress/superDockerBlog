(function() {
  'use strict';

  var configApp = ['$stateProvider', '$urlRouterProvider' ,function($stateProvider, $urlRouterProvider) {

    $stateProvider
    .state('register', {
      url: '/register',
      templateUrl: 'html/register.html',
      controller: 'RegisterCtrl',
      resolve: {
        isLoggedIn: ['AuthFactory', function(AuthFactory) {
          return AuthFactory.isLoggedIn();
        }]
      }
    });

    $urlRouterProvider.otherwise('login');

  }];

  var deps = [];

angular
  .module('Register', deps)
  .config(configApp);

})();
