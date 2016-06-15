var app = angular.module('attractionPage', []);

var model;

app.run(function($http) {
    $http.get('http://localhost:3000/ws/getAttractions').success(function(data) {
        model = data;
        //console.log(model);
    });
});

app.controller('attractionCtrl', function($scope, $http) {
    $http.get('http://localhost:3000/ws/getAttractions').then(function(response){
    
        $scope.attractions = response.data;

        //$scope.name = model[1].name;

        //$scope.arr= [{i:1}, {i:2},{i:3},{i:4}];
    });

});