var myApp = angular.module('myApp',['ngRoute']);

myApp.config(function($routeProvider){
    $routeProvider
        .when('/',{
            templateUrl: 'partials/table.html',
            controller: "loginController"
        })
        // .when('/dashboard',{
        //     templateUrl: 'partials/dashboard.html',
        //     controller: "dashboardController"
        // })
        // .when('/polls/:id',{
        //     templateUrl: 'partials/poll.html',
        //     controller: "pollController"
        // })
        // .when('/create',{
        //     templateUrl: 'partials/create.html',
        //     controller: "createController"
        // })
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
    $scope.login = function(){
        if(!$scope.newUser)
            alert("Name cannot be blank")
        else{
            userFactory.create($scope.newUser,function(){
                $location.url('/dashboard');
            });
        }
    };
});

myApp.controller('dashboardController', function($scope,$location,userFactory,pollFactory){
    userFactory.showCurrentUser(function(data){
        $scope.currentUser = data;
        if(!data.name)
            $location.url('/');
    });

    

    $scope.logout = function(){
        userFactory.logout(function(data){
            $scope.currentUser = data;
            $location.url('/');
        })
    }
});

myApp.controller('pollController', function($scope,$location,pollFactory){
    

});

myApp.controller('createController', function($scope,$location,pollFactory,userFactory){
    userFactory.showCurrentUser(function(data){
        $scope.currentUser = data;
        if(!data.name)
            $location.url('/');
    });

    
})