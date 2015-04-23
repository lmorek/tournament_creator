var tournamentCreator = angular.module('tournamentCreator', []);

function mainController($scope, $http) {
	$scope.formData={};

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
                $scope.formData = {}; 
                $scope.teams = data;
                console.log(data);
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    };

}