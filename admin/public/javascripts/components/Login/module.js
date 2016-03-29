(function() {
  'use strict';

  var configApp = ['$stateProvider', '$urlRouterProvider' ,function($stateProvider, $urlRouterProvider) {

    $stateProvider
    .state('login', {
      url: '/login',
      templateUrl: 'html/login.html',
      controller: 'LoginCtrl',
      onEnter: ['$state', 'AuthFactory', function($state, AuthFactory) {
        if(AuthFactory.isLoggedIn()){
          //TODO: to be replaced with home later
          $state.go('posts');
        }
      }],
    });

    $urlRouterProvider.otherwise('login');

  }];

  var deps = [];

angular
  .module('Login', deps)
  .config(configApp);

})();
