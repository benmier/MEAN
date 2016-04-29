var myApp = angular.module('myApp',['ngRoute']);

myApp.filter('abs', function () {
  return function(val) {
    return Math.abs(val);
  }
});

myApp.config(function($routeProvider){
    $routeProvider
        .when('/',{
            templateUrl: 'partials/login.html',
            controller: "loginController"
        })
        .when('/exercise/:name',{
            templateUrl: 'partials/show.html',
            controller: "showController"
        })
        .when('/dashboard',{
            templateUrl: 'partials/dashboard.html',
            controller: "dashboardController"
        })
        .when('/track',{
            templateUrl: 'partials/track.html',
            controller: "trackController"
        })
        .when('/data/:name',{
            templateUrl: 'partials/data.html',
            controller: "dataController"
        })
        .when('/table',{
            templateUrl: 'partials/table.html',
            controller: "tableController"
        })
        .when('/workout/:id',{
            templateUrl: 'partials/showWorkout.html',
            controller: "workoutController"
        })
        .otherwise({
            redirectTo: '/'
        })
});

myApp.factory('userFactory', function($http){
    var factory = {};

    factory.showCurrentUser = function(callback){
        if(!factory.currentUser){
            $http.get('/users/Ben').success(function(data){
            // $http.get('/users/'+factory.currentUser.name).success(function(data){
                factory.currentUser = data;
                callback(factory.currentUser);
            });
        }
        else
            callback(factory.currentUser);
    };

    factory.showOne = function(callback){
        $http.get('/users/'+factory.currentUser.name).success(function(data){
            factory.currentUser = data;
            callback(factory.currentUser);
        });
    }

    factory.create = function(newUser,callback){
        console.log(newUser)
        $http.post('/users/create',newUser).success(function(data){
            console.log(data)
            factory.currentUser = data;
            callback(data);
        });
    };

    factory.logout = function(callback){
        factory.currentUser = {};
        callback(factory.currentUser);
    }

    return factory;
});

myApp.factory('liftFactory', function($http){
    var factory = {}; 
    factory.exercises = [];

    factory.show = function(callback){
        if(!factory.lifts){
            $http.get('/lifts').success(function(data){
            factory.lifts = data;
            callback(factory.lifts);
            });
        }
        else
            callback(factory.lifts);
    };

    factory.showOne = function(lift,callback){
        $http.get('/lifts/'+lift.name).success(function(data){
            factory.lift = data;
            callback(factory.lift);
        });
    };

    factory.showData = function(input,callback){
        $http.get('/data/'+input.name).success(function(data){
            factory.data = {};
            factory.data.name = input.name;
            factory.data.main_muscle = [];
            factory.data.other_muscles = [];
            factory.data.force = [];
            factory.data.level = [];
            factory.data.mechanics = [];
            factory.data.equipment = [];
            factory.data.sport = [];
            factory.data.type = [];
            for(i in data){
                if(data[i].main_muscle==input.name)
                    factory.data.main_muscle.push(data[i]);
                for(j in data[i].other_muscles){
                    if(data[i].other_muscles[j].name==input.name){
                        factory.data.other_muscles.push(data[i]);
                    };
                };
                if(data[i].force==input.name)
                    factory.data.force.push(data[i]);
                if(data[i].level==input.name)
                    factory.data.level.push(data[i]);
                if(data[i].mechanics==input.name)
                    factory.data.mechanics.push(data[i]);
                if(data[i].equipment==input.name)
                    factory.data.equipment.push(data[i]);
                if(data[i].type==input.name)
                    factory.data.type.push(data[i]);
                if(data[i].sport==input.name)
                    factory.data.sport.push(data[i]);
            }
            callback(factory.data);
        });
    };

    factory.addExercise = function(lift,callback){
        factory.exercises.push({name:lift.name,pic_left:lift.pic_left,type:lift.type});
            for(i in factory.exercises){
                if(!factory.exercises[i].sets)
                    factory.exercises[i].sets = [];
                if(factory.exercises[i].name==lift.name){
                    if(lift.type=="Cardio")
                        factory.exercises[i].sets.push({duration:null,hour:0,min:0,sec:0,pace:null});
                    else
                        factory.exercises[i].sets.push({reps:null,lbs:null});
                };
            };
        callback(factory.exercises);
    };

    factory.loadWorkout = function(workout, callback){
        factory.exercises = [];
        for(i in workout.exercises){
            factory.exercises.push(workout.exercises[i])
            for(j in factory.exercises){
                factory.exercises[j].sets = [{set:0}];
            }
        }
        callback(factory.exercises);
    };

    factory.removeExercise = function(lift,callback){
        for(i in factory.exercises){
            if(factory.exercises[i].name==lift.name)
                factory.exercises.splice(i,1);
        };
        callback(factory.exercises);
    };

    factory.addSet = function(lift,callback){
        for(i in factory.exercises){
                if(!factory.exercises[i].sets)
                    factory.exercises[i].sets = [];
                if(factory.exercises[i].name==lift.name){
                    if(lift.type=="Cardio")
                        factory.exercises[i].sets.push({duration:null,hour:0,min:0,sec:0,pace:null});
                    else
                        factory.exercises[i].sets.push({reps:null,lbs:null});
                }
            }
        callback(factory.exercises);
    };

    factory.removeSet = function(lift,callback){
        for(i in factory.exercises){
            if(factory.exercises[i].name==lift.name)
                factory.exercises[i].sets.pop();
        };
        callback(factory.exercises);
    };

    factory.clearAll = function(callback){
        factory.exercises = [];
        callback(factory.exercises);
    };

    factory.dupeSet = function(lift,$scope,callback){
        for(i in factory.exercises){
                if(!factory.exercises[i].sets)
                    factory.exercises[i].sets = [];
                if(factory.exercises[i].name==lift.name){
                    if(lift.type=="Cardio")
                        factory.exercises[i].sets.push({duration:null,hour:0,min:0,sec:0,pace:null});
                    else{
                        factory.exercises[i].sets.push({reps:null,lbs:null});
                        // factory.exercises[i].sets.push({
                            // reps:$scope.newWorkout.exercise[lift.name].set[Object.keys($scope.newWorkout.exercise[lift.name].set)[Object.keys($scope.newWorkout.exercise[lift.name].set).length-1]].reps,
                            // lbs:$scope.newWorkout.exercise[lift.name].set[Object.keys($scope.newWorkout.exercise[lift.name].set)[Object.keys($scope.newWorkout.exercise[lift.name].set).length-1]].lbs
                        // });
                    }
                }
            }
        callback(factory.exercises);
    };

    factory.submitWorkout = function(newWorkout,currentUser,callback){
        var points = 0, bmi = (currentUser.weight*703)/(currentUser.height*currentUser.height);
        var workout = {
            id: Math.floor(Math.random()*1000000000000000),
            title: newWorkout.title,
            createdAt: Date.now(),
            updatedAt: Date.now(),
            exercises: []
        };
        for(i in newWorkout.exercise){
            for(k in factory.exercises){
                if(factory.exercises[k].name==i)
                    workout.exercises.push({name:i, pic_left:factory.exercises[k].pic_left, type:factory.exercises[k].type});
            }
            for(j in newWorkout.exercise[i].set){
                for(m in workout.exercises){
                    if(workout.exercises[m].name==i){
                        if(!workout.exercises[m].sets)
                            workout.exercises[m].sets = [];
                        workout.exercises[m].sets.push(newWorkout.exercise[i].set[j]);
                    }
                }
                if(newWorkout.exercise[i].set[j].reps)
                    points += Math.floor((newWorkout.exercise[i].set[j].lbs*newWorkout.exercise[i].set[j].reps)/bmi);
                else if(newWorkout.exercise[i].set[j].distance){
                    var mins = newWorkout.exercise[i].set[j].hour*60+newWorkout.exercise[i].set[j].min+Math.floor(newWorkout.exercise[i].set[j].sec/60);
                    var steps = newWorkout.exercise[i].set[j].distance*2241;
                    points += Math.floor((steps/mins)*bmi);
                }
            }
        };
        workout.points = points;
        factory.exercises = [];
        $http.post('/users/submit',{workout:workout,name:currentUser.name}).success(function(status){
            if(status)
                callback(points);
        })
    };

    return factory;
})

myApp.controller('loginController', function($scope,$location,userFactory,liftFactory){
    $scope.login = function(){
        if(!$scope.newUser)
            alert("Name cannot be blank")
        else{
            userFactory.create($scope.newUser,function(){
                $location.url('/dashboard');
            });
        }
    };

    $scope.create = function(){
        if(!$scope.newUser.inches)
            $scope.newUser.inches = 0;
        if(!$scope.newUser.age || !$scope.newUser.feet || !$scope.newUser.body_fat || $scope.newUser.inches<0 || !$scope.newUser.weight || !$scope.newUser.target_weight || !$scope.newUser.age || !$scope.newUser.goal || !$scope.newUser.multiplier)
            alert('Fields cannot be blank: Height, Weight, Fitness Goal, Goal Weight, and Activity Level')
        else{
            $scope.newUser.height = Math.floor($scope.newUser.feet*12+$scope.newUser.inches);
            userFactory.create($scope.newUser,function(){
                $location.url('/dashboard');
            });
        }
    };
});

myApp.controller('dashboardController', function($scope,$location,userFactory,liftFactory){
    userFactory.showOne(function(data){
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

myApp.controller('showController', function($scope,$location,liftFactory,userFactory,$route){
    userFactory.showCurrentUser(function(data){
        $scope.currentUser = data;
        if(!data.name)
            $location.url('/');
    });

    liftFactory.showOne($route.current.params, function(data){
        $scope.lift = data;
        $scope.lift.guide = $scope.lift.guide.split(".,");
    })

});

myApp.controller('dataController', function($scope,$location,liftFactory,userFactory,$route){
    userFactory.showCurrentUser(function(data){
        $scope.currentUser = data;
        if(!data.name)
            $location.url('/');
    });

    liftFactory.showData($route.current.params, function(data){
        $scope.data = data;
    });
    
});

myApp.controller('tableController', function($scope,liftFactory){
    liftFactory.show(function(data){
        $scope.lifts = data;
    });
});

myApp.controller('trackController', function($scope,liftFactory,userFactory,$location){
    $scope.exercises = [];
    $scope.newWorkout = {};

    userFactory.showCurrentUser(function(data){
        $scope.currentUser = data;
        if(!data.name)
            $location.url('/');
    });

    liftFactory.show(function(data){
        $scope.lifts = data;
    });

    $scope.addExercise = function(lift){
        liftFactory.addExercise(lift,function(data){
            $scope.exercises = data;
        })
    };

    $scope.removeExercise = function(lift){
        liftFactory.removeExercise(lift,function(data){
            $scope.exercises = data;
        })
    };

    $scope.addSet = function(lift){
        liftFactory.addSet(lift,function(data){
            $scope.exercises = data;
        })
    };

    $scope.removeSet = function(lift){
        liftFactory.removeSet(lift,function(data){
            $scope.exercises = data;
        });
    };

    $scope.loadWorkout = function(workout){
        liftFactory.loadWorkout(workout,function(data){
            $scope.exercises = data;
        });
    };

    $scope.clearAll = function(){
        liftFactory.clearAll(function(data){
            $scope.exercises = data;
        });
    }

    $scope.submitWorkout = function(newWorkout){
        if(!$scope.newWorkout.title)
            alert("Please provide a workout name")
        else{
            console.log("previous level: "+$scope.currentUser.level)
            liftFactory.submitWorkout(newWorkout,$scope.currentUser,function(points){
                alert("Great job! Your workout earned you "+points+" points!");
                var new_level = Math.floor((1/50)*(-25+Math.sqrt(635+10*($scope.currentUser.total_points+points))))
                console.log("new level: "+new_level)
                if(new_level>$scope.currentUser.level){
                    alert("Congratulations! You advanced to level "+new_level+"!");
                }
                $scope.exercises = [];
                $scope.newWorkout = {};
                $location.url('/dashboard');
            });
        }
    }
});

myApp.controller('workoutController', function($scope,liftFactory,userFactory,$route){
    userFactory.showCurrentUser(function(data){
        $scope.currentUser = data;
        if(!data.name)
            $location.url('/');
        for(i in $scope.currentUser.workouts){
            if($scope.currentUser.workouts[i].id == $route.current.params.id){
                $scope.currentWorkout = $scope.currentUser.workouts[i];
            }
        };
    });
});

