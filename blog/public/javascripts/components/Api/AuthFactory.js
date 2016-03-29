(function() {
  'use strict';

  var AuthFactory = ['$http', '$window', '$q', function($http, $window, $q) {

    var auth = {};

    //Getting token
    auth.getToken = function (){
      return $window.localStorage.blogAuthToken;
    };

    //Check for authentication through token (returns true or false)
    auth.isLoggedIn = function(){
      var token = auth.getToken();

      if(token){
        //Retreive base64 payload to string JSON with atob and then to javascript object with parse
        var payload = JSON.parse($window.atob(token.split('.')[1]));

        //Check if expired
        return payload.exp > Date.now() / 1000;
      } else {
        return false;
      }
    };

    //Get the name of current user
    auth.currentUser = function(){
      if(auth.isLoggedIn()){
        var token = auth.getToken();
        var payload = JSON.parse($window.atob(token.split('.')[1]));

        return payload.username;
      }
    };

    return auth;
  }];


angular
  .module('Api')
  .service('AuthFactory', AuthFactory);

})();
