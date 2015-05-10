angular.module('tournamentCreator', []).controller('mainController', ['$scope', '$http', function($scope, $http) {

	$scope.formData={name: '',players: new Array(6), news: new Array()};

    $http.get('/api/teams')
        .success(function(data){
            $scope.teams = data;
            console.log(data);
        })
        .error(function(data){
            console.log('Error: ' +data);
        });

    $http.get('/api/news')
        .success(function(data){
            $scope.news = data;
            console.log(data);
        })
        .error(function(data){
            console.log('Error: ' +data);
        });

    $scope.createTeam = function() {
        $http.post('/api/teams', $scope.formData)
            .success(function(data) {
                $scope.formData = {name: '', players: new Array(6)}; 
                $scope.teams = data;
                console.log(data);
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    };

    $scope.addNews = function() {
        $http.post('/api/news', $scope.formData)
            .success(function(data) {
                $scope.formData = {news: new Array()}; 
                $scope.news = data;
                console.log(data);
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    };

    $scope.deleteNews = function(id) {
            $http.delete('/api/news/' + id)
                .success(function(data) {
                    $scope.news = data;
                    console.log(data);
                })
                .error(function(data) {
                    console.log('Error: ' + data);
                });
        };

    $scope.deleteTeam = function(id) {
        $http.delete('/api/teams/' + id)
            .success(function(data) {
                $scope.teams = data;
                console.log(data);
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    };


}]).filter('nospace', function () {
    return function (value) {
        return (!value) ? '' : value.replace(/ /g, '');
    };
});
;

