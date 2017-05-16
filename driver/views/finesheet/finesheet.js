app.controller('FineSheetController', function FineSheetController($scope, $localStorage, $http, $rootScope) {
    $scope.fines = {};
    $scope.show = false;
    $scope.selected_fine = {};

    $scope.__init__ = function () {
        $rootScope.$broadcast('logged_in', true);
        $rootScope.$broadcast('logged_user', true);
        loadFines();
    };

    $scope.showPay = function (fine) {
        $scope.show = true;
        $scope.selected_fine = fine;
    };

    $scope.closePay = function () {
        $scope.show = false;
        $scope.selected_fine = {};
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

    $scope.pay = function () {
        $http({
            method: 'POST',
            url: BASE_URL,
            headers: {'Content-Type': 'application/x-www-form-urlencoded'},
            data: {
                action: 'pay_fine',
                type: APP_TYPE,
                fine_id: $scope.selected_fine.id
            }
        }).then(function (res) {
            console.log(res);
            if (res.data.status == "SUCCESS") {
                loadFines();
                $scope.show = false;
            }
        }, function errorCallback(response) {
            console.error(response);
            $scope.show = false;
        });
    };
});