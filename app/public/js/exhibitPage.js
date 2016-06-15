var app = angular.module('exhibitPage', []);

var model;

app.run(function($http) {
	$http.get('http://localhost:3000/ws/getExhibits').success(function(data) {
		model = data;
	});
});

app.controller('exhibitCtrl', function($scope, $http) {
    $http.get('http://localhost:3000/ws/getExhibits').then(function(response){
    
        $scope.exhibits = response.data;
    });

});