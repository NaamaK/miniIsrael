var app = angular.module('exhibitPage', []);

var model;

app.run(function($http) {
	$http.get('http://localhost:3000/ws/getExhibits').success(function(data) {
		model = data;
		//console.log(model);
	});
});

app.controller('exhibitCtrl', function($scope, $http) {
    $http.get('http://localhost:3000/ws/getExhibits').then(function(response){
    
        $scope.exhibits = response.data;

        //$scope.name = model[1].name;

        //$scope.arr= [{i:1}, {i:2},{i:3},{i:4}];
    });
	


});