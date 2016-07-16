var app = angular.module('xhibit', ['ngRoute', 'ngCookies']);

app.config(function ($routeProvider, $locationProvider) {
    $routeProvider
        .when('/xhibit.html/:num', {
            controller: 'exhibitCtrl'
        })
        .when('/login', {
            templateUrl: 'partials/login.html',
            controller: 'LoginCtrl'
        })
        .otherwise({
            redirectTo: '/xhibit.html'
        });

        $locationProvider.html5Mode({
            enabled: true,
            requireBase: false,
            rewriteLinks: false
        });
});

app.controller('exhibitCtrl', function($scope, $http, $location, $cookies) {
    $scope.requestedExhibit = $location.path().substring(13);

    $http.get('http://localhost:3000/xhibit/' + $scope.requestedExhibit).then(function(response){
        $scope.exhibit = response.data;
    });

    $scope.getImage = function(){  //change the heart icon on click
        var deafultImg = "heartDisabled.png";
        var img = angular.element(document.getElementById('like')).css('backgroundImage');
 
        if( img.indexOf(deafultImg) >= 0){
            return 'url(images/heartEnabled.png)';
        }
        else return 'url(images/heartDisabled.png)';
    };

    $scope.addLike = function (likedExhibit) {
        var body = {
            email: $scope.userEmail,
            like: likedExhibit
        };

        var config = {
            headers : {
                'Content-Type': 'application/json'
            }
        };

        $http.post('http://localhost:3000/ws/addLike', body).success(function (data, status, headers, config) {
            console.log("SUCCESS 200!");
        }).error(function (data, status, headers, config) {
            console.log("ERROR!!" + status);
        });          
    };

    $scope.getUser = function () {
        $scope.userName = $cookies.get('googleUser');
        $scope.userEmail = $cookies.get('googleEmail');
    };

    $scope.addUser = function () {
        var body = {
            name: $scope.userName,
            email: $scope.userEmail
        };

        var config = {
            headers : {
                'Content-Type': 'application/json'
            }
        };

        $http.post('http://localhost:3000/ws/saveUser', body).success(function (data, status, headers, config) {
            console.log("SUCCESS 200!");
        }).error(function (data, status, headers, config) {
            console.log("ERROR!!");
        });          
    };

});

