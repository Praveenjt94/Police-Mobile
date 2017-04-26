app.controller('DashboardController', function DashboardController($scope, $http, $rootScope, $localStorage) {
    $scope.stats = {fine_count: 0, revenue: 0};
    $scope.__init__ = function () {
        $rootScope.$broadcast('logged_in', true);
        $rootScope.$broadcast('logged_user', true);
        loadStats();
    };

    function loadStats() {
        $http({
            method: 'POST',
            url: BASE_URL,
            headers: {'Content-Type': 'application/x-www-form-urlencoded'},
            data: {
                action: 'get_dashboard_stats',
                type: APP_TYPE,
                driver_id: $localStorage.user.d_id
            }
        }).then(function (res) {
            console.log(res);
            if (res.data.status == "SUCCESS") {
                $scope.stats = res.data.data;
            }
        }, function errorCallback(response) {
            console.error(response);
        });
    }
});