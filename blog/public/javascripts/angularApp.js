(function() {
  'use strict';

	var configApp = ['$stateProvider', '$urlRouterProvider',
    function($stateProvider, $urlRouterProvider) {

		$stateProvider
		.state('error', {
			url: '/404',
			templateUrl: 'views/404.ejs'
		});

		$urlRouterProvider.otherwise('posts');

	}];

	var deps = ['ui.router', 'Posts', 'Post', 'Navigation', 'Footer', 'Helpers'];

angular
	.module('App', deps)
	.config(configApp)
	.controller('AppCtrl', function(){});

})();
