var myApp = angular.module('myApp',['ngRoute']);

myApp.config(function($routeProvider){
    $routeProvider
        .when('/',{
            templateUrl: '',
            controller: ""
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

myApp.controller('createController', function($scope,$location,pollFactory,userFactory){
   
})