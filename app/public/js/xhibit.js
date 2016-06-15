var app = angular.module('xhibit', []);

var model;

app.run(function($http) {
	$http.get('http://localhost:3000/xhibit/:specificExhibit').success(function(data) {
		model = data;
		console.log(data);
	});
});

app.controller('exhibitCtrl', function($scope, $http) {
	console.log("hihih");
    $http.get('http://localhost:3000/xhibit/:specificExhibit').then(function(response){
        $scope.exhibit = response.data;
    });

});