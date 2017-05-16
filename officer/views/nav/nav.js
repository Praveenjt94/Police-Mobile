app.controller('NavController', function NavController($scope, $http, $localStorage, $sessionStorage, $interval, $rootScope) {
    $scope.logged_status = false;
    $scope.show = false;
    $scope.notifications = [];
    $rootScope.$on('logged_in', function (event, args) {
        $scope.logged_status = args;
    });

    $scope.__init = function(){
        loadNotifications();
    };

    $scope.toggle_click = function () {
        $rootScope.$broadcast('side_nav', true);
    };

    $scope.showNotification = function () {
        $scope.show = true;
    };

    $scope.hideNotification = function () {
        $scope.show = false;
    };

    $interval(function () {
        loadNotifications();
    }, 30000);

    function loadNotifications() {
        $http({
            method: 'POST',
            url: BASE_URL,
            headers: {'Content-Type': 'application/x-www-form-urlencoded'},
            data: {
                action: 'get_notifications',
                type: APP_TYPE
            }
        }).then(function (res) {
            console.log(res);
            if (res.data.status == "SUCCESS") {
                $scope.notifications = res.data.data;
            }
        }, function errorCallback(response) {
            console.error(response);
        });
    }
});