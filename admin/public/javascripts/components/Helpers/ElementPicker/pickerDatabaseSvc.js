(function() {

  var pickerDatabaseSvc = function() {

    this.getJumbotron = function() {
      var jumbotron = {
        el: 'jumbotron',
        html: '<div class="jumbotron blogText"><h3 class="text-center">Test</h3></div>',
        id: Math.floor(Math.random() * 100000)
      };
      return jumbotron;
    };
  };

angular
  .module('Helpers')
  .service('pickerDatabaseSvc', pickerDatabaseSvc);

})();
