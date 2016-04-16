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
    var factory = {}, users, currentUser;

    factory.show = function(callback){
        $http.get('/users').success(function(data){
            users = data;
            callback(users);
        });
    };

    factory.create = function(newUser){
        $http.post('/create/users',newUser).success(function(data){
            currentUser = data;
        });
    };

    factory.destroy = function(){
        currentUser = {};
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

    factory.showOne = function(callback){
        $http.get('/threads/:id').success(function(data){
            threads = data;
            callback(threads);
        });
    };

    factory.create = function(newThread,callback){
        $http.post('/create/threads',newThread).success(function(data){
            threads = data;
            callback(threads);
        });
    };

    factory.update = function(answer,comment,callback){
        $http.post('/update/threads',{answer:answer,comment:comment}).success(function(data){
            threads = data;
            callback(threads);
        });
    };

    return factory;
});

myApp.controller('loginController', function($scope,userFactory){
    $scope.create = function(){
        userFactory.create($scope.newUser);
    }
});

myApp.controller('dashboardController', function($scope,threadFactory){
    $scope.show = function(){
        threadFactory.show(function(data){
            $scope.threads = data
        });
    };

    $scope.create = function(){
        threadFactory.create(function(data){
            $scope.threads = data
        });
    };
});

myApp.controller('threadController', function($scope,threadFactory){
    $scope.showOne = function(){
        threadFactory.showOne(function(data){
            $scope.thread = data
        });
    };

    $scope.update = function(){
        threadFactory.update(function(data){
            $scope.thread = data
        });
    };
});

myApp.controller('userController', function($scope,userFactory, threadFactory){
    
});
