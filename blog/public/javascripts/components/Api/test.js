describe('Base urls', function () {

	// Loading the module
	beforeEach(angular.mock.module('Api'));

    it('should provide base urls', inject(function(_URL_){
    	expect(_URL_.BASE_URL).toBeDefined();
    	expect(_URL_.POST_RSC).toBeDefined();

    	expect(_URL_.BASE_URL).toBe('');
    	expect(_URL_.POST_RSC).toBe('');
    }));
});

describe('Public PostApiSvc', function(){

	// Loading the module
	beforeEach(angular.mock.module('Api'));

	it('should provide a public api of known methods', inject(function(_PostApiSvc_){
		// Service is defined
		expect(_PostApiSvc_).toBeDefined();

		// Check public API
		expect(_PostApiSvc_.get).toBeDefined();
		expect(_PostApiSvc_.getAll).toBeDefined();

		// Check that there is only X methods defined
		// TODO: Update number if adding new method
		expect(Object.getOwnPropertyNames(_PostApiSvc_).length).toBe(2);
	}));
});

describe('Post Class', function(){

	// Loading the module
	beforeEach(angular.mock.module('Api'));


	it('should provide a set of well defined properties', inject(function(_Post_){
		// Service is defined
		expect(_Post_).toBeDefined();

		// Check public API
		var post = new _Post_(1, "", "", "");

		// Check defined public properties
		expect(post.id).toBeDefined();
		expect(post.title).toBeDefined();
		expect(post.description).toBeDefined();
		expect(post.article).toBeDefined();
	}));


	it('should return undefined values when construction parameters are not defined', inject(function(_Post_){
		// Check public API
		var post = new _Post_();

		// Check types for every property
		expect(post.id).toBeUndefined();
		expect(post.title).toBeUndefined();
		expect(post.description).toBeUndefined();
		expect(post.article).toBeUndefined();

		// Check public API
		post.id = 1;

		// Check types for every property
		expect(post.id).toBeDefined();
		expect(post.title).toBeUndefined();
		expect(post.description).toBeUndefined();
		expect(post.article).toBeUndefined();
	}));
});

describe('Comment Class', function(){

	// Loading the module
	beforeEach(angular.mock.module('Api'));


	it('should provide a set of well defined properties', inject(function(_Comment_){
		// Service is defined
		expect(_Comment_).toBeDefined();

		// Check public API
		var comment = new _Comment_(1, 0, "", 10000001, "");

		// Check defined public properties
		expect(comment.commentId).toBeDefined();
		expect(comment.postId).toBeDefined();
		expect(comment.author).toBeDefined();
		expect(comment.date).toBeDefined();
		expect(comment.commentText).toBeDefined();
	}));

	it('should be able to set all properties', inject(function(_Comment_){
		// Service is defined
		expect(_Comment_).toBeDefined();

		// Check public API
		var comment = new _Comment_(1, 0, "Mike", 10000001, "Hello");

		// Check defined public properties
		expect(comment.commentId).toBe(1);
		expect(comment.postId).toBe(0);
		expect(comment.author).toBe("Mike");
		expect(comment.date).toBe(10000001);
		expect(comment.commentText).toBe("Hello");
	}));


	it('should return undefined values when construction parameters are not defined', inject(function(_Comment_){
		// Check public API
		var comment = new _Comment_();

		// Check types for every property
		expect(comment.commentId).toBeUndefined();
		expect(comment.postId).toBeUndefined();
		expect(comment.author).toBeUndefined();
		expect(comment.date).toBeUndefined();
		expect(comment.commentText).toBeUndefined();

		// Check public API
		comment.commentId = 1;

		// Check types for every property
		expect(comment.commentId).toBeDefined();
		expect(comment.postId).toBeUndefined();
		expect(comment.author).toBeUndefined();
		expect(comment.date).toBeUndefined();
		expect(comment.commentText).toBeUndefined();
	}));
});
