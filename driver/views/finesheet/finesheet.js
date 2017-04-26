app.controller('FineSheetController', function FineSheetController($scope, $localStorage, $http, $rootScope) {
    $scope.fines = {};

    $scope.__init__ = function () {
        $rootScope.$broadcast('logged_in', true);
        $rootScope.$broadcast('logged_user', true);
        loadFines();
    };

    function loadFines() {
        $http({
            method: 'POST',
            url: BASE_URL,
            headers: {'Content-Type': 'application/x-www-form-urlencoded'},
            data: {
                action: 'get_fines',
                type: APP_TYPE,
                driver_id: $localStorage.user.d_id
            }
        }).then(function (res) {
            console.log(res);
            if (res.data.status == "SUCCESS") {
                $scope.fines = res.data.data;
            }
        }, function errorCallback(response) {
            console.error(response);
        });
    }
});