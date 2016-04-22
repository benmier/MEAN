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
        .when('/threads/show/:id',{
            templateUrl: 'partials/thread.html',
            controller: "threadController"
        })
        .when('/users/show/:id',{
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

    factory.showCurrentUser = function(callback){
        callback(currentUser);
    }

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

    return factory;
});

myApp.factory('threadFactory', function($http){
    var factory = {}, threads; 

    factory.show = function(callback){
        $http.get('/threads').success(function(data){
            threads = data;
            callback(threads);
        });
    };

    factory.showOne = function(thread,callback){
        $http.get('/threads/'+thread._id).success(function(data){
            factory.thread = data;
            callback();
        });
    };

    factory.showCurrentThread = function(callback){
        callback(factory.thread);
    }

    factory.create = function(newThread,callback){
        $http.post('/threads/create',newThread).success(function(data){
            threads = data;
            callback(threads);
        });
    };

    factory.createAnswer = function(answer,currentUser,callback){
        $http.post('/threads/createAnswer/'+factory.thread._id,{answer:answer,currentUser:currentUser}).success(function(data){
            factory.thread = data;
            callback(factory.thread);
        });
        $scope.newAnswer = {};
    };

    factory.createComment = function(answer,currentUser,comment,callback){
        $http.post('/threads/createComment/'+factory.thread._id,{answerId:answer,currentUser:currentUser,comment:comment}).success(function(data){
            factory.thread = data;
            callback(factory.thread);
        });
    };

    factory.vote = function(vote,answer,callback){
        $http.post('/threads/vote/'+factory.thread._id,{answerId:answer,vote:vote}).success(function(data){
            factory.thread = data;
            callback(factory.thread);
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

myApp.controller('dashboardController', function($scope,$location,threadFactory,userFactory){
    userFactory.showCurrentUser(function(data){
        $scope.currentUser = data;
    });

    threadFactory.show(function(data){
        $scope.threads = data;
    });

    $scope.showOne = function(thread){
        threadFactory.showOne(thread,function(){
            $location.url('/threads/show/'+thread._id);
        });
    };

    $scope.create = function(){
        $scope.newThread.name = $scope.currentUser.name;
        $scope.newThread.posts = 0;
        $scope.newThread.nameId = $scope.currentUser._id;        
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

    threadFactory.showCurrentThread(function(data){
        $scope.thread = data;
    });

    $scope.createAnswer = function(){
        threadFactory.createAnswer($scope.newAnswer,$scope.currentUser,function(data){
            $scope.thread = data
        });
        $scope.newAnswer = {};
    };

    $scope.createComment = function(answerId,newComment){
        threadFactory.createComment(answerId,$scope.currentUser,newComment,function(data){
            $scope.thread = data
        });
        $scope.newComment = {};
    };

    $scope.vote = function(vote,answerId){
        threadFactory.vote(vote,answerId,function(data){
            $scope.thread = data;
        });
    };

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
