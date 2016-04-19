var myApp = angular.module('myApp',['ngRoute']);

myApp.config(function($routeProvider){
    $routeProvider
        .when('/',{
            templateUrl: 'partials/login.html',
            controller: "loginController"
        })
        .when('/dashboard',{
            templateUrl: 'partials/dashboard.html',
            controller: "dashboardController"
        })
        .when('/polls/:id',{
            templateUrl: 'partials/poll.html',
            controller: "pollController"
        })
        .when('/create',{
            templateUrl: 'partials/create.html',
            controller: "pollController"
        })
        .otherwise({
            redirectTo: '/'
        })
});

myApp.factory('userFactory', function($http){
    var factory = {};

    return factory;
});

myApp.factory('pollFactory', function($http){
    var factory = {};

    return factory;
})

myApp.controller('loginController', function($scope,$location,userFactory){

});

myApp.controller('dashboardController', function($scope,$location,userFactory,pollFactory){

});

myApp.controller('pollController', function($scope,$location,pollFactory){

});