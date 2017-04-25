var app = angular.module('police-app', [
    'ngRoute',
    'ngStorage'
]);

// main REST end point
var APP_TYPE = 'officer';
var BASE_URL = 'http://192.168.8.100/projects/Police-Web/api/out_services.php';