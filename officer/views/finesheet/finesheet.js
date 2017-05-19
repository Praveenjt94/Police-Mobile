app.controller('FineSheetController', function FineSheetController($scope, $localStorage, $http, $rootScope, Upload) {
    $scope.driver_id = "";
    $scope.fine = {};
    $scope.fine.officer_data = $localStorage.user;
    $scope.fine.driver_data = {};
    $scope.fine_show = false;
    $scope.fine_rules = [];
    $scope.driver_not_found = false;
    $scope.photo = "";
    $scope.result = "";
    $scope.disabled = false;
    $scope.invalid_lic_no = false;
    $scope.acc_types = [{
        id: 'accident',
        name: 'Accident'
    }, {
        id: 'traffic',
        name: 'Traffic'
    }];
    $scope.fine.acc_type = $scope.acc_types[0];
    $scope.fine.province = "Western Province";
    var DRIVER_LIC_REGX = /^([A-Z]{1})(\d{7})$/;

    $scope.__init__ = function () {
        $rootScope.$broadcast('logged_in', true);
        $rootScope.$broadcast('logged_user', true);
        loadRules();
    };

    function getUserLocation() {
        // send android webview js interface call to get mobile`s geo location
        $scope.result = Android.getLocation();
    }

    function loadRules() {
        $http({
            method: 'POST',
            url: BASE_URL,
            headers: {'Content-Type': 'application/x-www-form-urlencoded'},
            data: {
                action: 'get_fine_rules',
                type: APP_TYPE
            }
        }).then(function (res) {
            console.log(res);
            if (res.data.status == "SUCCESS") {
                $scope.fine_rules = res.data.data;
                $scope.fine.category = $scope.fine_rules[0];
            }
        }, function errorCallback(response) {
            console.error(response);
        });
    }

    $scope.changeText = function () {
        $scope.invalid_lic_no = false;
    };

    $scope.search = function () {
        // validate license no
        if (!DRIVER_LIC_REGX.test($scope.driver_id)) {
            $scope.invalid_lic_no = true;
            console.log("invalid lic");
        } else {
            $scope.invalid_lic_no = false;
            getUserLocation();
            $scope.fine = {};
            $scope.fine.officer_data = $localStorage.user;
            $scope.fine.driver_data = {};

            $http({
                method: 'POST',
                url: BASE_URL,
                headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                data: {
                    action: 'search_driver',
                    type: APP_TYPE,
                    driver_id: $scope.driver_id
                }
            }).then(function (res) {
                console.log(res);
                if (res.data.status == "SUCCESS") {
                    $scope.fine.driver_data = res.data.data;
                    $scope.fine_show = true;
                    $scope.driver_not_found = false;
                } else {
                    $scope.fine_show = false;
                    $scope.driver_not_found = true;
                }
                $scope.fine.location = $scope.result;
            }, function errorCallback(response) {
                console.error(response);
            });
        }
    };

    $scope.submit = function () {
        if (!$scope.disabled) {
            $scope.disabled = true;
            // new
            Upload.upload({
                url: BASE_URL,
                data: {
                    file: $scope.photo,
                    action: 'save_fine',
                    type: APP_TYPE,
                    fine: $scope.fine
                }
            }).then(function (res) {
                console.log(res);
                if (res.data.status == "SUCCESS") {
                    $scope.fine = {};
                    $scope.fine.officer_data = $localStorage.user;
                    $scope.fine.driver_data = {};
                    $scope.driver_id = "";
                    $scope.fine_show = false;
                    $scope.photo = "";
                }
                $scope.disabled = false;
                // $location.path("/finesheet");
            }, function (resp) {
                console.log('Error status: ' + resp.status);
                $scope.disabled = false;
            });
        }
    };
});