var app = angular.module('exhibitPage', ['ngCookies']);

var model;

app.run(function($http) {
	$http.get('https://mini-israel-service.herokuapp.com/ws/getExhibits').success(function(data) {
		model = data;
	});
});

app.controller('exhibitCtrl', function($scope, $http,  $cookies, $q) {

    $http.get('https://mini-israel-service.herokuapp.com/ws/getExhibits').then(function(response){
        $scope.exhibits = response.data;
        $scope.getUser();
    });

	$scope.getUser = function () {
        $scope.userName = $cookies.get('googleUser');
        $scope.userEmail = $cookies.get('googleEmail');
    };

    $scope.click = function() {
    	console.log($scope.currentExhibit);
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
            console.log("SUCCESS 200!");
            defer.resolve(data.liked);
            
        }).error(function (data, status, headers, config) {
            console.log("ERROR!!" + status);
            window.data = data.liked;
        });
        return defer.promise;
    };

    $scope.getIfLiked = function(exhibit) {
        $scope.isLiked(exhibit).then(function(data) {
        	console.log("^^ " + data + " for " + exhibit);
            if (data) angular.element(document.getElementById('heart')).css('background-image','url(images/heartEnabled.png)');
            else angular.element(document.getElementById('heart')).css('background-image','url(images/heartDisabled.png)');
        });
    };
}).directive('myDirective', function(){
  return {
    restrict: "A",
    scope: {
      myDirective: '=',
      ctrlFunc: '&callbackFn'
    },
    link: function(scope, element, attrs) {
    	console.log('Do action with data', scope.myDirective);
      	scope.ctrlFunc({exhibit: scope.myDirective});
    }
  };
});