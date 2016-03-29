(function() {

  var pickerSvc = ['$uibModal', '$q', function($uibModal, $q) {

      this.showElementPicker = function() {

        var modalInstance = $uibModal.open({
          templateUrl: 'html/pickerModal.html',
          controller: 'pickerModalCtrl',
          size: 'md'
        });

        var modalPromise = $q.defer();

        modalInstance.result
          .then(function(data) {
            modalPromise.resolve(data);
        }, function() {
          modalPromise.reject();
          console.log("Modal closed with cancel!");
        })
        .catch(function(err) {
          console.log("Modal error: ", err);
          modalPromise.reject();
        });

        return modalPromise.promise;

      };

    }];

angular
  .module('Helpers')
  .service('pickerSvc', pickerSvc);

})();
