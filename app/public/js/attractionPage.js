var app = angular.module('attractionPage', []);

var model;
var exhibits;

app.run(function($http) {
    $http.get('https://mini-israel-service.herokuapp.com/ws/getAttractions').success(function(data) {
        model = data;
    });
});

app.controller('attractionCtrl', function($scope, $http) {
    $http.get('https://mini-israel-service.herokuapp.com/ws/getExhibits').then(function(response){
        exhibits = response.data;
    });

    $http.get('https://mini-israel-service.herokuapp.com/ws/getAttractions').then(function(response){
    
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