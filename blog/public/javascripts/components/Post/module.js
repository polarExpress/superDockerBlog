(function() {
  'use strict';

	var configApp = ['$stateProvider', '$urlRouterProvider' ,function($stateProvider, $urlRouterProvider) {

		$stateProvider
		.state('post', {
			url: '/posts/{id}',
			templateUrl: 'html/post.html',
			controller: 'PostCtrl',
			resolve: {
				postId: ['$stateParams', function($stateParams) {
					return $stateParams.id;
				}],
				post: ['$stateParams', 'PostSvc', function($stateParams, PostSvc) {
					return PostSvc.get($stateParams.id);
				}],
        isLoggedIn: ['AuthFactory', function(AuthFactory) {
					return AuthFactory.isLoggedIn();
				}],
        user: ['AuthFactory', function(AuthFactory) {
					return AuthFactory.currentUser();
				}],
			}
		});

		$urlRouterProvider.otherwise('posts');

	}];

	var deps = ['Api', 'ui.router', 'ngSanitize', 'Helpers'];

angular
	.module('Post', deps)
	.config(configApp);

})();
