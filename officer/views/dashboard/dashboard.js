app.controller('DashboardController', function DashboardController($scope, $http, $rootScope, $localStorage) {
    $scope.stats = {fine_count: 0, revenue: 0};
    $scope.fines = [];
    $scope.rules = [];
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
                officer_id: $localStorage.user.id
            }
        }).then(function (res) {
            console.log(res);
            if (res.data.status == "SUCCESS") {
                $scope.stats = res.data.data;
                $scope.fines = res.data.data.fines;
                $scope.rules = res.data.data.rules;
            }
        }, function errorCallback(response) {
            console.error(response);
        });
    }
});