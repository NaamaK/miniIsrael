var app = angular.module('exhibitPage', []);

var model;

app.run(function($http) {
	$http.get('http://localhost:3000/ws/getExhibits').success(function(data) {
		model = data;
		console.log(model);
	});
});

app.controller('exhibitCtrl', function($scope) {
	$scope.exs = model;
	$scope.name = model[0].name;

	$scope.arr= [{i:1}, {i:2},{i:3},{i:4}];


});