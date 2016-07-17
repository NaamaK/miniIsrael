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

app.controller('exhibitCtrl', function($scope, $http, $location, $cookies, $sce, $q) {
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
            $scope.getIfLiked();
        }).error(function (data, status, headers, config) {
            console.log("ERROR!!" + status);
        });         
    };

    $scope.getUser = function () {
        $scope.userName = $cookies.get('googleUser');
        $scope.userEmail = $cookies.get('googleEmail');
        $scope.getIfLiked();
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
    
    $scope.trustSrc = function(src) {
        return $sce.trustAsResourceUrl(src);
    };

    $scope.isLiked = function(exhibit) {
        var defer = $q.defer();
        var body = {
            email: $scope.userEmail,
            exhibit: exhibit
        };

        var config = {
            headers : {
                'Content-Type': 'application/json'
            }
        };

        $http.post('http://localhost:3000/ws/isLiked', body).success(function (data, status, headers, config) {
            console.log("mail!: " + $scope.userEmail);
            console.log("SUCCESS 200!");
            defer.resolve(data.liked);
            
        }).error(function (data, status, headers, config) {
            console.log("ERROR!!" + status);
            window.data = data.liked;
        });
        return defer.promise;
    };

    $scope.getIfLiked = function() {
        $scope.isLiked($scope.requestedExhibit).then(function(data) {
            if (data) angular.element(document.getElementById('like')).css('background-image','url(images/heartEnabled.png)');
            else angular.element(document.getElementById('like')).css('background-image','url(images/heartDisabled.png)');
        });
    };


});

