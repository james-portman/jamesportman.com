// create the module and name it scotchApp
        // also include ngRoute for all our routing needs
    var scotchApp = angular.module('scotchApp', ['ngRoute']);

    // configure our routes
    scotchApp.config(function($locationProvider,$routeProvider) {
        $locationProvider.html5Mode(true);
        $routeProvider

            .when('/', {
                templateUrl : 'pages/home.html',
                controller  : 'mainController'
            })
        
            .when('/:category', {
                templateUrl : 'pages/category.html',
                controller  : 'mainController'
            })

            // route for the about page
            .when('/:category/:post', {
                templateUrl : 'pages/post.html',
                controller  : 'mainController'
            });
    });


    scotchApp.controller('mainController', function($scope, $http, $routeParams) {
        $http.get("data/dat.json")
        .success(function(response) {

            $scope.categories = response.categories;
            
            if ($routeParams.category != undefined) {
                $scope.category = $scope.categories[$routeParams.category];
                $scope.route_category = $routeParams.category;
                
                if ($routeParams.post != undefined) {
                    $scope.post = $scope.category.posts[$routeParams.post];
                    $scope.route_post = $routeParams.post;
                }
                
            }

        })
        .error(function(data, status, headers, config) {
            alert("error getting json");
        });
        $scope.message = 'Everyone come and see how good I look!';
    });
