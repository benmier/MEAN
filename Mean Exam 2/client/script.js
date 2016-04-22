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

    factory.scoreQuiz = function(newQuiz,callback){
        $http.post('/quizzes/score/'+factory.currentQuiz._id,newQuiz).success(function(data){
            callback();
        });
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

    questionFactory.createQuestion({question:"What is the largest planet in the solar system?",correct:"Jupiter",fake1:"Earth",fake2:"Pluto"},function(){});
    questionFactory.createQuestion({question:'What did Einstein call the "most difficult thing to understand"?',correct:"Income Taxes",fake1:"Human Brain",fake2:"E=mc2"},function(){});
    questionFactory.createQuestion({question:"What is the world's biggest island?",correct:"Greenland",fake1:"Iceland",fake2:"Antartica"},function(){});
    questionFactory.createQuestion({question:"What principle explains why cold food warms up and hot food cools off when stored at room temperature?",correct:"Entropy",fake1:"Chemical Equilibrium",fake2:"Relativity"},function(){});
    questionFactory.createQuestion({question:"What causes the disease toxoplasmosis?",correct:"A Protozoan",fake1:"A Bacterium",fake2:"A Virus"},function(){});
    questionFactory.createQuestion({question:"What is the slowest wind speed a hurricane can have according to the Saffir-Simpson scale?",correct:"74 m.p.h.",fake1:"50 m.p.h.",fake2:"96 m.p.h."},function(){});
    questionFactory.createQuestion({question:"Which of the following heavenly bodies have never had a spacecraft landed on it?",correct:"Jupiter",fake1:"Mars",fake2:"Venus"},function(){});

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

    $scope.logout = function(){
        userFactory.logout(function(data){
            $scope.currentUser = data;
            $location.url('/');
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
        if(!$scope.newQuiz || !$scope.newQuiz.one || !$scope.newQuiz.two || !$scope.newQuiz.three)
            alert("Please choose an answer for all 3 questions!")
        else{
            var score = 0;
            if($scope.newQuiz.one == "option2")
                score++;
            if($scope.newQuiz.two == "option3")
                score++;
            if($scope.newQuiz.three == "option1")
                score++;
            var percentage = +(((score/3)*100).toFixed(2));
            quizFactory.scoreQuiz({score:String(score)+"/3",percentage:percentage}, function(data){
                if(score<=1)
                    alert("You did terribly! Your score was "+score+"/3 or "+percentage+"%");
                if(score==2)
                    alert("You did good! Your score was "+score+"/3 or "+percentage+"%");
                if(score==3)
                    alert("You did amazing! Your score was "+score+"/3 or "+percentage+"%");
                $location.url('/dashboard');
            });
        };
    };

});

myApp.controller('createController', function($scope,$location,questionFactory,userFactory){
   $scope.createQuestion = function(callback){
        if(!$scope.newQuestion || !$scope.newQuestion.question || !$scope.newQuestion.correct || !$scope.newQuestion.fake1 || !$scope.newQuestion.fake2)
            alert("No fields can be empty!");
        else if($scope.newQuestion.length<15)
            alert("The question must be at least 15 characters long!");
        questionFactory.createQuestion($scope.newQuestion,function(status){
            if(status){
                alert("Question added successfully!");
                $location.url('/dashboard');
            }
            else
                alert("Your question could not be added, please try again!");
        });
   };

   $scope.logout = function(){
        userFactory.logout(function(data){
            $scope.currentUser = data;
            $location.url('/');
        });
    };

});