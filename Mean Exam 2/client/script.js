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
        .when('/create',{
            templateUrl: 'partials/create.html',
            controller: "createController"
        })
        .when('/play',{
            templateUrl: 'partials/play.html',
            controller: "playController"
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

myApp.factory('quizFactory', function($http){
    var factory = {};

    factory.show = function(callback){
        $http.get('/quizzes').success(function(data){
            factory.quizzes = data;
            callback(factory.quizzes);
        });
    };

    return factory;
});

myApp.factory('questionFactory', function($http){
    var factory = {};

    factory.createQuestion = function(newQuestion,callback){
        $http.post('/questions/create',newQuestion).success(function(status){
            callback(status);
        });
    };

    factory.show = function(callback){
        $http.get('/questions/show3').success(function(data){
            factory.questions = data;
            callback(factory.quizzes);
        });
    };

    return factory;
});

myApp.controller('loginController', function($scope,$location,userFactory){
    $scope.login = function(){
        if(!$scope.newUser)
            alert("Name cannot be blank")
        else{
            userFactory.create($scope.newUser,function(){
                $location.url('/dashboard');
            });
        };
    };

});

myApp.controller('dashboardController', function($scope,$location,quizFactory,questionFactory){
    userFactory.showCurrentUser(function(data){
        $scope.currentUser = data;
        if(!data.name)
            $location.url('/');
    });

    quizFactory.show(function(data){
        $scope.quizzes = data;
    });

    questionFactory.show3(function(data){
        $scope.questions = data;
    });

});

myApp.controller('playController', function($scope,$location,userFactory,quizFactory){
    userFactory.showCurrentUser(function(data){
        $scope.currentUser = data;
        if(!data.name)
            $location.url('/');
    });

});

myApp.controller('createController', function($scope,$location,questionFactory){
   $scope.createQuestion = function(callback){
        questionFactory.createQuestion(function(status){
            if(status){
                alert("Question added successfully!");
                $location.url('/dashboard');
            }
            else
                alert("Your question could not be added, please try again!");
        });
        // $scope.newQuestion = {};
   };
});