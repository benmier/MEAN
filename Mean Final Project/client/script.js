var myApp = angular.module('myApp',['ngRoute']);

myApp.config(function($routeProvider){
    $routeProvider
        .when('/',{
            templateUrl: 'partials/table.html',
            controller: "loginController"
        })
        .when('/exercise/:name',{
            templateUrl: 'partials/show.html',
            controller: "showController"
        })
        .when('/data/:name',{
            templateUrl: 'partials/data.html',
            controller: "dataController"
        })
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

myApp.factory('liftFactory', function($http){
    var factory = {};

    factory.show = function(callback){
        $http.get('/lifts').success(function(data){
            factory.lifts = data;
            callback(factory.lifts);
        });
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
            console.log(data)
            for(i in data){
                if(data[i].main_muscle==input.name)
                    factory.data.main_muscle.push(data[i]);
                for(j in data[i].other_muscles){
                    if(data[i].other_muscles[j].name==input.name){
                        factory.data.other_muscles.push(data[i]);
                    }
                }
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

    return factory;
})

myApp.controller('loginController', function($scope,$location,userFactory,liftFactory){
    liftFactory.show(function(data){
        $scope.lifts = data;
    })


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

// myApp.controller('dashboardController', function($scope,$location,userFactory,liftFactory){
//     userFactory.showCurrentUser(function(data){
//         $scope.currentUser = data;
//         if(!data.name)
//             $location.url('/');
//     });

    

//     $scope.logout = function(){
//         userFactory.logout(function(data){
//             $scope.currentUser = data;
//             $location.url('/');
//         })
//     }
// });

myApp.controller('showController', function($scope,$location,liftFactory,userFactory,$route){
    // userFactory.showCurrentUser(function(data){
    //     $scope.currentUser = data;
    //     if(!data.name)
    //         $location.url('/');
    // });

    liftFactory.showOne($route.current.params, function(data){
        $scope.lift = data;
        $scope.lift.guide = $scope.lift.guide.split(".,");
    })

});

myApp.controller('dataController', function($scope,$location,liftFactory,userFactory,$route){
    // userFactory.showCurrentUser(function(data){
    //     $scope.currentUser = data;
    //     if(!data.name)
    //         $location.url('/');
    // });

    liftFactory.showData($route.current.params, function(data){
        $scope.data = data;
    });
    
});