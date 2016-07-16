var app = angular.module('xhibit', ['ngRoute']);

app.config(function ($routeProvider, $locationProvider) {
    $routeProvider
      .when('/xhibit.html/:num', {
        //templateUrl: '../xhibit1.html',
        controller: 'exhibitCtrl'
      })
      // .when('/xhibit.html/2', {
      //   templateUrl: '../xhibit2.html',
      //   controller: 'e2'
      // })
      // .when('/login', {
      //   templateUrl: 'partials/login.html',
      //   controller: 'LoginCtrl'
      // })
      .otherwise({
        redirectTo: '/xhibit.html'
      });
      $locationProvider.html5Mode({enabled: true,
      requireBase: false,
      rewriteLinks: false});
});

app.controller('e1', function($scope, $location) {

    $scope.mes = $location.path().substring(13);
});

app.controller('e2', function($scope) {
    $scope.mes = "Hello 2";
});

var model;

// app.run(function($http) {
// 	$http.get('http://localhost:3000/xhibit/haganim').success(function(data) {
// 		model = data;
// 		//console.log(data);
// 	});
// });

app.controller('exhibitCtrl', function($scope, $http, $location) {
    $scope.requestedExhibit = $location.path().substring(13);
    console.log("> " + $scope.requestedExhibit);

    $http.get('http://localhost:3000/xhibit/' + $scope.requestedExhibit).then(function(response){
        $scope.exhibit = response.data;
        console.log(">> requested url = " + 'http://localhost:3000/xhibit/' + $scope.requestedExhibit);
        console.log(">> " + $scope.exhibit.name);
    });

    $scope.getImage = function(obj){  //change the heart icon on click
        var deafultImg = "heartDisabled.png";
        var img = angular.element(document.getElementById('like')).css('backgroundImage');
 
        if( img.indexOf(deafultImg) >= 0){
            return 'url(images/heartEnabled.png)';
        }
        else return 'url(images/heartDisabled.png)';
    };

});

