var app = angular.module('index', ['ngCookies']);

var model;

// app.run(function($http) {
// 	$http.get('https://mini-israel-service.herokuapp.com/xhibit/:specificExhibit').success(function(data) {
// 		model = data;
// 		console.log(data);
// 	});
// });

app.controller('indexCtrl', function($scope, $http, $cookies) {

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
                //'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
                'Content-Type': 'application/json'
            }
        };

    	$http.post('http://localhost:3000/ws/saveUser', body).success(function (data, status, headers, config) {
	        console.log("SUCCESS 200!");

	    }).error(function (data, status, headers, config) {
	    	//
	    	console.log("ERROR!!");
	    });          
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

    $scope.addWatched = function (watchedExhibit) {
    	var body = {
    		email: $scope.userEmail,
    		watched: watchedExhibit
    	};

    	var config = {
            headers : {
                'Content-Type': 'application/json'
            }
        };

    	$http.post('http://localhost:3000/ws/addWatched', body).success(function (data, status, headers, config) {
	        console.log("SUCCESS 200!");
	    }).error(function (data, status, headers, config) {
	    	console.log("ERROR!!" + status);
	    });          
    };
});