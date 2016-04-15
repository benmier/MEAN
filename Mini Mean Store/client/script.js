var myApp = angular.module('myApp',['ngRoute']);

        myApp.config(function($routeProvider){
            $routeProvider
                .when('/',{
                    templateUrl: 'partials/dashboard.html',
                    controller: "customersController"
                })
                .when('/products',{
                    templateUrl: 'partials/products.html',
                    controller: "productsController"
                })
                .when('/orders',{
                    templateUrl: 'partials/orders.html',
                    controller: "ordersController"
                })
                .when('/customers',{
                    templateUrl: 'partials/customers.html',
                    controller: "customersController"
                })
                .when('/settings',{
                    templateUrl: 'partials/settings.html',
                    controller: "settingsController"
                })
                .otherwise({
                    redirectTo: '/'
                })
        });

        myApp.factory('customerFactory', function($http){
            var customers, orders, factory = {}, dupes;

            factory.show = function(callback){
                $http.get('/customers').success(function(data){
                    customers = data;
                    callback(customers)
                })
            };
            
            factory.create = function(newCustomer,callback){
                $http.get('/customers').success(function(data){
                    customers = data;
                });
                for(i in customers){
                    dupes = customers[i].name==newCustomer.name;
                }
                if(dupes)
                    alert("Cannot add duplicate name");
                else
                    $http.post('/customers/create',newCustomer).success(function(data){
                    customers = data;
                    callback(customers)
                });
            };

            factory.delete = function(customer,callback){
                $http.post('/customers/delete',customer).success(function(data){
                    $http.post('/orders/delete',customer).success(function(status){
                        if(status){
                            customers = data;
                            callback(customers);
                        };
                    });
                });
            };

            return factory;
        });

        myApp.factory('orderFactory', function($http){
            var customers, orders, factory = {}; 

            factory.show = function(callback){
                $http.get('/orders').success(function(data){
                    orders = data;
                    callback(orders)
                })
            };

            factory.create = function(newOrder,callback){
                $http.post('/orders/create',newOrder).success(function(data){
                    orders = data;
                    callback(orders)
                });
            };

            

            return factory;
        });

        myApp.factory('productFactory', function($http){
            var factory = {}, products;

            products = [{name:"Nike Shoes"},{name:"Black Belts"},{name:"Ice Creams"},{name:"Candies"}];

            factory.show = function(){
                return products;
            }

            return factory;

        })

        myApp.controller('customersController', function($scope,customerFactory){
            $scope.customers = [];
            customerFactory.show(function(data){
                $scope.customers = data;
            })
            
            $scope.create = function(){
                customerFactory.create($scope.newCustomer,function(data){
                    $scope.customers = data;
                });
                $scope.newCustomer = {};
            }

            $scope.delete = function(customer){
                customerFactory.delete(customer,function(data){
                    $scope.customers = data;
                });
            }
        });

        myApp.controller('ordersController', function($scope,customerFactory, orderFactory, productFactory){
            $scope.customers = [];
            customerFactory.show(function(data){
                $scope.customers = data;
            })

            $scope.products = productFactory.show();

            $scope.orders = [];
            orderFactory.show(function(data){
                $scope.orders = data;
            })

            $scope.create = function(){
                orderFactory.create($scope.newOrder, function(data){
                    $scope.orders = data;
                });
                $scope.newOrder = {};
            };
        });

        myApp.controller('productsController', function($scope,productFactory){
            $scope.products = [];

            $scope.create = function(){
                productFactory.create($scope.newOrder, function(data){
                    $scope.orders = data;
                });
                $scope.newOrder = {};
            };
        });