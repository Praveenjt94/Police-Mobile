app.controller('HeaderController', function HeaderController($scope, $location, $localStorage, $rootScope) {
    $scope.layout = {
        left: -260,
        z_index: 0
    };


    $rootScope.$on('side_nav', function (event, args) {
        if (args) {
            $scope.layout = {
                left: 0,
                z_index: 999
            };
        } else {
            $scope.layout = {
                left: -260,
                z_index: 0
            };
        }
    });

    $rootScope.$on('logged_user', function (event, args) {
        $scope.logged_user = $localStorage.user;
    });

    $scope.locationRedirect = function (path) {
        if (path == '/logout') {
            // reset login session data
            $localStorage.$reset();
        }
        if ($location.path() != path) {
            $location.path(path);
        }

        $scope.layout = {
            left: -260,
            z_index: 0
        };
    };
});