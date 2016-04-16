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
        .when('/thread',{
            templateUrl: 'partials/thread.html',
            controller: "threadController"
        })
        .when('/user',{
            templateUrl: 'partials/user.html',
            controller: "userController"
        })
        .otherwise({
            redirectTo: '/dashboard'
        })
});

myApp.factory('userFactory', function($http){
    var factory = {}, users;

    factory.show = function(callback){
        $http.get('/users').success(function(data){
            users = data;
            callback(users);
        });
    };

    return factory;
});

App.factory('threadFactory', function($http){
    var factory = {}, threads;

    factory.show = function(callback){
        $http.get('/threads').success(function(data){
            threads = data;
            callback(threads);
        });
    };

    return factory;
});

myApp.controller('loginController', function($scope,userFactory){

});

myApp.controller('dashboardController', function($scope,threadFactory){
    
});

myApp.controller('threadController', function($scope,threadFactory){
    
});

myApp.controller('userController', function($scope,userFactory, threadFactory){
    
});
