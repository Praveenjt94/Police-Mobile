app.controller('FineSheetController', function FineSheetController($scope, $localStorage, $http, $rootScope) {
    $scope.driver_id = "";
    $scope.fine = {};
    $scope.fine.officer_data = $localStorage.user;
    $scope.fine.driver_data = {};
    $scope.fine_show = false;
    $scope.fine_rules = [];
    $scope.driver_not_found = false;
    $scope.result = {};

    $scope.__init__ = function () {
        $rootScope.$broadcast('logged_in', true);
        $rootScope.$broadcast('logged_user', true);
        loadRules();
        getCurrentlocation();
    };

    function getCurrentlocation() {
        var options = {
            enableHighAccuracy: true
        };
        navigator.geolocation.getCurrentPosition(function (pos) {
                $scope.position = new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude);
                console.log(JSON.stringify($scope.position));
            },
            function (error) {
                alert('Unable to get location: ' + error.message);
            }, options);
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

    $scope.search = function () {
        // getUserLocation();
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
        }, function errorCallback(response) {
            console.error(response);
        });
    };

    function getUserLocation() {
        $http({
            method: 'POST',
            url: 'https://www.googleapis.com/geolocation/v1/geolocate?key=AIzaSyCqFHJy76YoPt87Xlg_USEr7ACKVMiU99s',
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        }).then(function (res) {
            // console.log(res);
            $http({
                method: 'GET',
                url: 'https://maps.googleapis.com/maps/api/geocode/json?latlng=' + res.data.location.lat + ',' + res.data.location.lng + '&key=AIzaSyCqFHJy76YoPt87Xlg_USEr7ACKVMiU99s',
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            }).then(function (res) {
                console.log(res);
                $scope.result = res.data.results[0];
            }, function errorCallback(response) {
                console.error(response);
            });
        }, function errorCallback(response) {
            console.error(response);
        });
    }

    $scope.submit = function () {
        $http({
            method: 'POST',
            url: BASE_URL,
            headers: {'Content-Type': 'application/x-www-form-urlencoded'},
            data: {
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
            }
        }, function errorCallback(response) {
            console.error(response);
        });
    };
});