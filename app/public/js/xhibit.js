var app = angular.module('xhibit', []);

var model;

app.run(function($http) {
	$http.get('https://mini-israel-service.herokuapp.com/xhibit/:specificExhibit').success(function(data) {
		model = data;
		console.log(data);
	});
});

app.controller('exhibitCtrl', function($scope, $http) {
    $http.get('https://mini-israel-service.herokuapp.com/xhibit/:specificExhibit').then(function(response){
        $scope.exhibit = response.data;
    });

});