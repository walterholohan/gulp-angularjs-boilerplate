(function() {
    /* recommended */

    // dataservice factory
    angular
        .module('myApp')
        .factory('dataService', dataService);

    dataService.$inject = ['$http', '$log'];

    function dataService($http, $log) {
        return {
            getData: getData
        };

        function getData() {
            return $http.get('https://api.github.com/users/walterholohan')
                .then(getDataComplete)
                .catch(getDataFailed);

            function getDataComplete(response) {
                return response.data;
            }

            function getDataFailed(error) {
                $log.info('XHR Failed for getData.' + error.data);
            }
        }
    }
})();
