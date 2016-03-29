(function() {
  'use strict';

	var Post = function()
	{

		function PostBuilder(id, title, desc, article){
			this.id = id;
			this.title = title;
			this.description = desc;
			this.article = article;
		}

		return PostBuilder;
	};

angular
	.module('Api')
	.factory('Post', Post);

})();
