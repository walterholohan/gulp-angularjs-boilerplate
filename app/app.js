(function() {
    //'use strict';

    /**
     * @ngdoc overview
     * @name myApp
     * @description
     * # myApp
     *
     * Main module of the application.
     */
    angular
        .module('myApp', [
            'ngAnimate',
            'ngRoute'
        ])
        .config(function($routeProvider) {
            $routeProvider
                .when('/', {
                    templateUrl: './components/component/component.html',
                    controller: 'ComponentController',
                    controllerAs: 'vm'
                })
                .otherwise({
                    redirectTo: '/'
                });
        });
})();
