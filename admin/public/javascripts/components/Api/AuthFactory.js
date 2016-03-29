(function() {
  'use strict';

  var AuthFactory = ['$http', '$window', '$q', function($http, $window, $q) {

    var auth = {};

    //Saving token to local storage when login is successful
    auth.saveToken = function (token){
      $window.localStorage.blogAuthToken = token;
    };

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

    //Register user (should make POST to register with credentials)
    auth.register = function(user){
      return $http.post('/admin/register', user)
      .success(function(data) {
        //If successful save session token to local storage
        auth.saveToken(data.token);
      });
    };

    //Log in user (should make POST to login with credentials)
    auth.logIn = function(user) {
      return $http.post('/admin/login', user).then(function(response) {
        auth.saveToken(response.data.token);
        return response.data;
      });
    };

    //Log out user (logout should only remove token)
    auth.logOut = function() {
      return $q.when($window.localStorage.removeItem('blogAuthToken'));
    };

    return auth;
  }];


angular
  .module('Api')
  .service('AuthFactory', AuthFactory);

})();
