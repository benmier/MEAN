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

    factory.vote = function(option,callback){
        $http.post('/polls/vote/'+factory.currentPoll._id,{option:option}).success(function(data){
            factory.poll = data;
            callback(factory.poll);
        });
    };

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
        if(!data.name)
            $location.url('/');
    });

    $scope.create = function(){
        var error = false;
        pollFactory.show(function(data){
            $scope.polls = data;
        });
        if(!$scope.newPoll || !$scope.newPoll.question || !$scope.newPoll.option1 || !$scope.newPoll.option2 || !$scope.newPoll.option3 || !$scope.newPoll.option4){
            alert("No fields can be empty");
            error = true;
        }
        for(i in $scope.polls){
            if($scope.polls[i].question==$scope.newPoll.question){
                alert("No duplicate questions");
                error = true;
            }
        }
        if($scope.newPoll.question.length<8){
            alert("Question must be at least 8 characters");
            error = true;
        }
        if($scope.newPoll.option1.length<3 || $scope.newPoll.option2.length<3 || $scope.newPoll.option3.length<3 || $scope.newPoll.option4.length<3){
            alert("All options must be at least 3 characters");
            error = true;
        }
        if(!error){
            $scope.newPoll.name = $scope.currentUser.name;
            pollFactory.create($scope.newPoll,function(){
                $location.url('/dashboard')
            });
        }
    };
})