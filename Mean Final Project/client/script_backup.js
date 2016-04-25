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

    factory.lifts = lifts;
    var liftsList = {};
    for(var i=0; i<lifts.length; i++){
        for(var key in lifts[i]){
            $http.post('/newLift',{
                factory.lifts[i].name=key;
            })
        }
    }

    factory.showLifts = function(callback){
        callback(factory.lifts);
    }

    return factory;
})

myApp.controller('loginController', function($scope,$location,userFactory,liftFactory){
    liftFactory.showLifts(function(data){
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

myApp.controller('dashboardController', function($scope,$location,userFactory,liftFactory){
    userFactory.showCurrentUser(function(data){
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
    // userFactory.showCurrentUser(function(data){
    //     $scope.currentUser = data;
    //     if(!data.name)
    //         $location.url('/');
    // });

    liftFactory.showLifts(function(data){
        $scope.lifts = data;
    })
    for(var i=0; i<lifts.length; i++){
        for(var key in $scope.lifts[i]){
            if(key==$route.current.params.name){
                $scope.lift = $scope.lifts[i];
                $scope.others = $scope.lifts[i][key]["Other Muscles"].split(", ")
            }
        }
    }
});

myApp.controller('dataController', function($scope,$location,liftFactory,userFactory,$route){
    // userFactory.showCurrentUser(function(data){
    //     $scope.currentUser = data;
    //     if(!data.name)
    //         $location.url('/');
    // });

    liftFactory.showLifts(function(data){
        $scope.lifts = data;
    })
    for(var i=0; i<lifts.length; i++){
        for(var key in $scope.lifts[i]){
            if(key==$route.current.params.name){
                $scope.lift = $scope.lifts[i];
                $scope.others = $scope.lifts[i][key]["Other Muscles"].split(", ")
            }
        }
    }
});