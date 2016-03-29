describe('Post module routes', function () {

	// Loading the module
	beforeEach(function(){
		module('Post');
	});

    it('should have a defined set of routes with templates and properties.', inject(function(_$route_){

    	// Routes are multiple of 2
    	//   For those that end with and without '/'.
    	expect(Object.getOwnPropertyNames(_$route_.routes).length).toBe(2);


    	var ROUTES = {
    		POST_ID: '/posts/:postId',
    		POST_ID_REDIRECT: '/posts/:postId/'
    	};

    	// 1) For routes not ending in '/' check templateUrl and controller existance
    	expect(_$route_.routes[ROUTES.POST_ID].templateUrl).toBe('./components/Post/post.html');
    	expect(_$route_.routes[ROUTES.POST_ID].controller).toBe('PostCtrl');

    	// 2) For routes ending in '/' check there is a redirect
    	expect(_$route_.routes[ROUTES.POST_ID_REDIRECT].redirectTo).toBe(ROUTES.POST_ID);
    }));
});


describe('Post controller', function () {

	var $controller;

	// Loading the module
	beforeEach(module('Post'));
	beforeEach(inject(function(_$controller_){
		$controller = _$controller_;
	}));

    it('should trigger api call to get specific post.', inject(function($rootScope, _PostSvc_){

    	var scope = $rootScope.$new(),
    		PostSvc = _PostSvc_,
    		postId = 1;

    	spyOn(PostSvc, 'get').and.callThrough();

    	var PostCtrl = $controller('PostCtrl', {'$scope': scope, 'PostSvc': PostSvc, 'postId': postId});

    	// Trigger digest cycle to resolve promise
    	scope.$apply();

    	expect(PostSvc.get).toHaveBeenCalled();
    	expect(PostSvc.get).toHaveBeenCalledWith(postId);
    	expect(scope.post).toBeDefined();
    	expect(scope.post.constructor.name).toBe('PostBuilder');

    }));


    it('should not trigger api call when postId is not defined.', inject(function($rootScope, _PostSvc_){

    	var scope = $rootScope.$new(),
    		PostSvc = _PostSvc_,
    		postId;

    	spyOn(PostSvc, 'get').and.callThrough();

    	var PostCtrl = $controller('PostCtrl', {'$scope': scope, 'PostSvc': PostSvc, 'postId': postId});

    	// Trigger digest cycle to resolve promise
    	scope.$apply();

    	expect(PostSvc.get).not.toHaveBeenCalled();
    	expect(scope.post).toBeDefined();
    	expect(scope.post.constructor.name).toBe('Object');

    }));
});
