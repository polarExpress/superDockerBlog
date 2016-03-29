(function() {
  'use strict';

	var configApp = ['$stateProvider', '$urlRouterProvider',
    function($stateProvider, $urlRouterProvider) {

		$stateProvider
		.state('create', {
			url: '/posts/create',
			templateUrl: 'html/create.html',
			controller: 'CreateCtrl',
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
	.module('Create', deps)
	.config(configApp);

})();
