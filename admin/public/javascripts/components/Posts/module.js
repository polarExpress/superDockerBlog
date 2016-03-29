(function() {
  'use strict';

	var configApp = ['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {

		$stateProvider
		.state('posts', {
			url: '/posts',
			templateUrl: 'html/posts.html',
			controller: 'PostsCtrl',
      onEnter: ['$state', 'AuthFactory', function($state, AuthFactory) {
        if(!AuthFactory.isLoggedIn()) {
          $state.go('login');
        }
      }],
      resolve: {
        isLoggedIn: ['AuthFactory', function(AuthFactory) {
          return AuthFactory.isLoggedIn();
        }],
        user: ['AuthFactory', function(AuthFactory) {
          return AuthFactory.currentUser();
        }]
      }
		});

		$urlRouterProvider.otherwise('login');

	}];

	var deps = [];

angular
	.module('Posts', deps)
	.config(configApp);

})();
