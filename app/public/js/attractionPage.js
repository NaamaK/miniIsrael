var app = angular.module('attractionPage', []);

var model;
var exhibits;

app.run(function($http) {
    $http.get('http://localhost:3000/ws/getAttractions').success(function(data) {
        model = data;
        //console.log(model);
    });
});

app.controller('attractionCtrl', function($scope, $http) {
    $http.get('http://localhost:3000/ws/getExhibits').then(function(response){
        exhibits = response.data;
    });

    $http.get('http://localhost:3000/ws/getAttractions').then(function(response){
    
        $scope.attractions = response.data;

        // $scope.getExhibit = function(name) {
        //     angular.forEach(exhibits, function(exhibit) {
        //         if (exhibit.name === name) {
        //             return exhibit.name;
        //         }
        //     });
        // };
    });

});