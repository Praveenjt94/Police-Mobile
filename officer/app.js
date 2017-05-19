var app = angular.module('police-app', [
    'ngRoute',
    'ngStorage',
    'ngFileUpload'
]);

// main REST end point
var APP_TYPE = 'officer';
var BASE_URL = 'http://localhost/Projects/Police-Web/api/out_services.php';