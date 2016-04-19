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
            controller: "createController"
        })
        .otherwise({
            redirectTo: '/'
        })
});

myApp.factory('userFactory', function($http){
    var factory = {};

    factory.create = function(newUser,callback){
        $http.post('/users/create',newUser).success(function(data){
            factory.currentUser = data;
            callback();
        });
    };

    factory.showCurrentUser = function(callback){
        callback(factory.currentUser);
    };

    factory.logout = function(callback){
        factory.currentUser = {};
        callback(factory.currentUser);
    }

    return factory;
});

myApp.factory('pollFactory', function($http){
    var factory = {};

    factory.show = function(callback){
        $http.get('/polls').success(function(data){
            factory.polls = data;
            callback(factory.polls);
        });
    };

    factory.showOne = function(poll,callback){
        $http.get('/polls/'+poll._id).success(function(data){
            factory.currentPoll = data;
            callback();
        });
    };

    factory.create = function(newPoll,callback){
        $http.post('/polls/create',newPoll).success(function(data){
            factory.polls = data;
            callback();
        })
    }

    factory.showCurrentPoll = function(callback){
        callback(factory.currentPoll);
    };

    factory.delete = function(poll,callback){
        $http.post('/polls/delete/'+poll._id).success(function(data){
            factory.polls = data;
            callback(factory.polls);
        });
    };

    factory.vote = function(optionNumber,callback){
        $http.post('/polls/vote/'+factory.currentPoll._id,optionNumber).success(function(data){
            factory.poll = data;
            callback(factory.poll);
        });
    };

    return factory;
})

myApp.controller('loginController', function($scope,$location,userFactory){
    $scope.login = function(){
        userFactory.create($scope.newUser,function(){
            $location.url('/dashboard');
        });
    };
});

myApp.controller('dashboardController', function($scope,$location,userFactory,pollFactory){
    userFactory.showCurrentUser(function(data){
        $scope.currentUser = data;
        console.log(data)
        if(data=={})
            $location.url('/');
    });

    pollFactory.show(function(data){
        $scope.polls = data;
    });

    $scope.showOne = function(poll){
        pollFactory.showOne(poll,function(){
            $location.url('/polls/'+poll._id);
        });
    };

    $scope.create = function(){
        pollFactory.create($scope.newPoll,function(data){
            $scope.polls = data;
        });
    };

    $scope.delete = function(poll){
        pollFactory.delete(poll,function(data){
            $scope.polls = data;
        });
    };

    $scope.logout = function(){
        userFactory.logout(function(data){
            $scope.currentUser = data;
            $location.url('/');
        })
    }
});

myApp.controller('pollController', function($scope,$location,pollFactory){
    pollFactory.showCurrentPoll(function(data){
        $scope.poll = data;
    });

    $scope.vote = function(optionNumber){
        pollFactory.vote(optionNumber,function(data){
            $scope.poll = data;
        });
    };

});

myApp.controller('createController', function($scope,$location,pollFactory,userFactory){
    userFactory.showCurrentUser(function(data){
        $scope.currentUser = data;
        if(data=={})
            $location.url('/');
    });

    $scope.create = function(){
        $scope.newPoll.name = $scope.currentUser.name;
        pollFactory.create($scope.newPoll,function(){
            $location.url('/dashboard')
        });
    };
})