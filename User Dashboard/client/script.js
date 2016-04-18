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
        .when('/threads/:id',{
            templateUrl: 'partials/thread.html',
            controller: "threadController"
        })
        .when('/users/:id',{
            templateUrl: 'partials/user.html',
            controller: "userController"
        })
        .otherwise({
            redirectTo: '/'
        })
});

myApp.factory('userFactory', function($http){
    var factory = {}, users, currentUser, user;

    factory.show = function(callback){
        $http.get('/users').success(function(data){
            users = data;
            callback(users);
        });
    };

    factory.showOne = function(user,callback){
        $http.get('/users/'+user._id).success(function(data){
            user = data;
            callback(user);
        });
    };

    factory.create = function(newUser,callback){
        $http.post('/users/create',newUser).success(function(data){
            currentUser = data;
        });
    };

    // factory.destroy = function(){
    //     currentUser = {};
    // };

    return factory;
});

myApp.factory('threadFactory', function($http){
    var factory = {}, threads, thread;

    factory.show = function(callback){
        $http.get('/threads').success(function(data){
            threads = data;
            callback(threads);
        });
    };

    factory.showOne = function(thread,callback){
        $http.get('/threads/'+thread._id).success(function(data){
            thread = data;
            callback(thread);
        });
    };

    factory.showCurrentUser = function(callback){
        callback(currentUser);
    }

    factory.create = function(newThread,callback){
        $http.post('/threads/create',newThread).success(function(data){
            threads = data;
            callback(threads);
        });
    };

    factory.createAnswer = function(thread,answer,callback){
        $http.post('/threads/createAnswer/'+thread._id,{}).success(function(data){
            threads = data;
            callback(threads);
        });
    };

    factory.createComment = function(thread,answer,comment,callback){
        $http.post('/threads/createComment/'+thread._id,{}).success(function(data){
            threads = data;
            callback(threads);
        });
    };

    return factory;
});

myApp.controller('loginController', function($scope,$location,userFactory){
    $scope.create = function(){
        userFactory.create($scope.newUser);
        $location.url('/dashboard');
    }
});

myApp.controller('dashboardController', function($scope,threadFactory,userFactory){
    userFactory.showCurrentUser(function(data){
        console.log(data)
        $scope.currentUser.name = data.name;
    });

    threadFactory.show(function(data){
        $scope.threads = data;
    });

    $scope.showOne = function(thread){
        threadFactory.showOne(thread);
    };

    $scope.create = function(){
        $scope.newThread.name = $scope.currentUser.name;
        $scope.newThread.posts = 0;
        //$scope.newThread.name._id = $scope.currentUser.name._id;        
        threadFactory.create($scope.newThread,function(data){
            $scope.threads = data
        });
    };

    $scope.destroy = function(){
        userFactory.destroy();
    }
});

myApp.controller('threadController', function($scope,threadFactory,userFactory){
    userFactory.showCurrentUser(function(data){
        $scope.currentUser = data;
    });

    $scope.shoeOne = function(){
        threadFactory.showOne(function(data){
        $scope.thread = data
        });
    }

    $scope.createAnswer = function(){
        threadFactory.createAnswer(function(data){
            $scope.thread = data
        });
    };

    $scope.createComment = function(){
        threadFactory.createComment(function(data){
            $scope.thread = data
        });
    };

    // $scope.destroy = function(){
    //     userFactory.destroy();
    // }
});

myApp.controller('userController', function($scope,userFactory, threadFactory){
    $scope.showOne = function(user){
        userFactory.showOne(user,function(data){
            $scope.thread = data;
        });
    };

    $scope.destroy = function(){
        userFactory.destroy();
    }
});
