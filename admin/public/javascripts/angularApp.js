(function() {
  'use strict';

	var configApp = ['$stateProvider', '$urlRouterProvider' ,function($stateProvider, $urlRouterProvider) {

		$stateProvider
		.state('error', {
			url: '/404',
			templateUrl: 'views/404.ejs'
		});

		$urlRouterProvider.otherwise('login');

	}];

	var deps = [
    'ui.router',
    'Api',
    'Edit',
    'Create',
    'Login',
    'Helpers',
    'Posts',
    'Register',
    'toaster',
    'ngAnimate'
  ];

angular
	.module('App', deps)
	.config(configApp)
	.controller('AppCtrl', function(){});

})();
