angular.module('tournamentCreator', []).controller('mainController', ['$scope', '$http', function($scope, $http) {
	$scope.formData={name: '',players: new Array(6)};

    $http.get('/api/teams')
        .success(function(data){
            $scope.teams = data;
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

}]);