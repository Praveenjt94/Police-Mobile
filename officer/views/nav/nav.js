app.controller('NavController', function NavController($scope, $http, $localStorage, $sessionStorage, $window, $rootScope) {
    $scope.logged_status = false;
    $rootScope.$on('logged_in', function (event, args) {
        $scope.logged_status = args;
    });

    $scope.toggle_click = function () {
        $rootScope.$broadcast('side_nav', true);
    };
});