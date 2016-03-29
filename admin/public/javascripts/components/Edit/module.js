(function() {
  'use strict';

	var configApp = ['$stateProvider', '$urlRouterProvider',
    function($stateProvider, $urlRouterProvider) {

		$stateProvider
		.state('edit', {
			url: '/posts/edit/{id}',
			templateUrl: 'html/edit.html',
			controller: 'EditCtrl',
      onEnter: ['$state', 'AuthFactory', function($state, AuthFactory) {
        if(!AuthFactory.isLoggedIn()) {
          $state.go('login');
        }
      }],
			resolve: {
				postId: ['$stateParams', function($stateParams) {
					return $stateParams.id;
				}],
				post: ['$stateParams', 'PostSvc', function($stateParams, PostSvc) {
					return PostSvc.get($stateParams.id);
				}],
        isLoggedIn: ['AuthFactory', function(AuthFactory) {
					return AuthFactory.isLoggedIn();
				}]
			}
		});

		$urlRouterProvider.otherwise('login');

	}];

	var deps = ['dndLists', 'ngSanitize', 'textAngular'];

angular
	.module('Edit', deps)
	.config(configApp);

})();
