var myApp = angular.module('myApp',['ngRoute']);

        myApp.config(function($routeProvider){
            $routeProvider
                .when('/',{
                    templateUrl: 'partials/login.html',
                    controller: "loginController"
                })

                .otherwise({
                    redirectTo: '/'
                })
        });

