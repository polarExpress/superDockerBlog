(function() {
  'use strict';

	var configApp = ['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {

		$stateProvider
		.state('posts', {
			url: '/posts',
			templateUrl: 'html/posts.html',
			controller: 'PostsCtrl',
      resolve: {
        isLoggedIn: ['AuthFactory', function(AuthFactory) {
          return AuthFactory.isLoggedIn();
        }]
      }
		});

		$urlRouterProvider.otherwise('posts');

	}];

	var deps = ['Api', 'ui.router'];

angular
	.module('Posts', deps)
	.config(configApp);

})();
