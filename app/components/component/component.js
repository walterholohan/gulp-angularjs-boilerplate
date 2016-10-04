(function() {
    'use strict';

    /**
     * @ngdoc function
     * @name myApp.controller:ComponentController
     * @description
     * # ComponentController
     * Controller of the myApp
     */
    angular.module('myApp')
        .controller('ComponentController', ComponentController);

    ComponentController.$inject = ['dataService', '$log'];

    function ComponentController(dataService, $log) {

        var vm = this;

        vm.title = "Welcome to a AngularJS with Gulp boilerplate";
        vm.avatar = "";
        vm.name = ""

        activate();

        function activate() {
            return getData().then(function() {
                $log.info('Got Data');
            });
        }

        function getData() {
            return dataService.getData()
                .then(function(data) {
                    vm.avatar = data.avatar_url;
                    vm.name = data.name;
                });
        }
    }
})();
