var app = angular.module('police-app', [
    'ngRoute',
    'ngStorage'
]);

// main REST end point
var APP_TYPE = 'driver';
var BASE_URL = 'http://192.168.43.165/Projects/Police-Web/api/out_services.php';