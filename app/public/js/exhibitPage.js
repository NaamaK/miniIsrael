var app = angular.module('exhibitPage', []);

var model;

app.run(function($http) {
	$http.get('https://mini-israel-service.herokuapp.com/ws/getExhibits').success(function(data) {
		model = data;
	});
});

app.controller('exhibitCtrl', function($scope, $http) {
    $http.get('https://mini-israel-service.herokuapp.com/ws/getExhibits').then(function(response){
    
        $scope.exhibits = response.data;
    });

});