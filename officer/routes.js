app.config(['$locationProvider', '$routeProvider', function config($locationProvider, $routeProvider) {
    $locationProvider.hashPrefix('!');

    $routeProvider.when('/', {
        templateUrl: 'views/login/login.html',
        controller: 'LoginController'
    }).when('/dashboard', {
        templateUrl: 'views/dashboard/dashboard.html',
        controller: 'DashboardController'
    }).when('/finesheet', {
        templateUrl: 'views/finesheet/finesheet.html',
        controller: 'FineSheetController'
    }).otherwise('/');
}]);