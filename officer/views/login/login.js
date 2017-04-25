app.controller('LoginController', function LoginController($scope, $http, $localStorage, $rootScope, $location) {
    $scope.dataset = [];
    $scope.username = "";
    $scope.password = "";

    $scope.__init__ = function () {
        $rootScope.$broadcast('logged_in', false);
        $rootScope.$broadcast('side_nav', false);
    };

    $scope.login = function () {
        $http({
            method: 'POST',
            url: BASE_URL,
            headers: {'Content-Type': 'application/x-www-form-urlencoded'},
            data: {
                action: 'login',
                type: APP_TYPE,
                username: $scope.username,
                password: $scope.password
            }
        }).then(function (res) {
            // console.log(res);
            if (res.data.status == "SUCCESS") {
                $localStorage.logged_status = true;
                $localStorage.user = res.data.data;
                $location.path("/dashboard");
            }
        }, function errorCallback(response) {
            console.error(response);
        });
    }
});