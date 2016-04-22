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
        .when('/quizzes/:id',{
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

    factory.createQuiz = function(newQuiz,callback){
        $http.post('/quizzes/create',newQuiz).success(function(data){
            factory.currentQuiz = data;
            callback(factory.currentQuiz);
        });
    };

    factory.showCurrentQuiz = function(callback){
        callback(factory.currentQuiz);
    };

    factory.scoreQuiz = function(callback){
        $http.post('/quizzes/score/'+factory.currentQuiz._id);
    }

    return factory;
});

myApp.factory('questionFactory', function($http){
    var factory = {};

    factory.createQuestion = function(newQuestion,callback){
        $http.post('/questions/create',newQuestion).success(function(status){
            callback(status);
        });
    };

    factory.show3 = function(callback){
        $http.get('/questions/show3').success(function(data){
            factory.questions = data;
            callback(factory.questions);
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

myApp.controller('dashboardController', function($scope,$location,quizFactory,questionFactory,userFactory){
    userFactory.showCurrentUser(function(data){
        $scope.currentUser = data;
        if(!data.name)
            $location.url('/');
    });

    quizFactory.show(function(data){
        $scope.quizzes = data;
    });

    $scope.newQuiz = function(){
        questionFactory.show3(function(data){
            $scope.questions = data;
            $scope.newQuiz = {
                question1: $scope.questions[0],
                question2: $scope.questions[1],
                question3: $scope.questions[2],
                name: $scope.currentUser.name
            };
            quizFactory.createQuiz($scope.newQuiz, function(quiz){
                $location.url('/quizzes/'+quiz._id);
            });
        });
    };

});

myApp.controller('playController', function($scope,$location,userFactory,quizFactory){
    userFactory.showCurrentUser(function(data){
        $scope.currentUser = data;
        if(!data.name)
            $location.url('/');
    });

    quizFactory.showCurrentQuiz(function(data){
        $scope.currentQuiz = data;
    })

    $scope.submitQuiz = function(){
        var score = 0;
        if($scope.newQuiz.one)
            score++;
        if($scope.newQuiz.two)
            score++;
        if($scope.newQuiz.three)
            score++;
        var percentage = +((score/3).toFixed(2));
        console.log(score)
        console.log(percentage)
        quizFactory.scoreQuiz({score:score,percentage:percentage}, function(){
            if(score<=1)
                alert("You did terribly! Your score was "+score+"/3 or "+percentage+"%");
            if(score==2)
                alert("You did good! Your score was "+score+"/3 or "+percentage+"%");
            if(score==3)
                alert("You did amazing! Your score was "+score+"/3 or "+percentage+"%");
            $location.url('/dashboard');
        });
    };

});

myApp.controller('createController', function($scope,$location,questionFactory){
   $scope.createQuestion = function(callback){
        questionFactory.createQuestion($scope.newQuestion,function(status){
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