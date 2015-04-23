<<<<<<< HEAD
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
=======
// public/core.js
var scotchTodo = angular.module('scotchTodo', []);

function mainController($scope, $http) {
    $scope.formData = {};

    // when landing on the page, get all todos and show them
    $http.get('/api/todos')
        .success(function(data) {
            $scope.todos = data;
            console.log(data);
        })
        .error(function(data) {
            console.log('Error: ' + data);
        });

    // when submitting the add form, send the text to the node API
    $scope.createTodo = function() {
        $http.post('/api/todos', $scope.formData)
            .success(function(data) {
                $scope.formData = {}; // clear the form so our user is ready to enter another
                $scope.todos = data;
                console.log(data);
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    };

    $scope.createPlayer = function() {
        $http.post('/api/todos', $scope.formPlayer)
            .success(function(data) {
                $scope.formPlayer = {}; // clear the form so our user is ready to enter another
                $scope.todos = data;
                console.log(data);
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    };

    // delete a todo after checking it
    $scope.deleteTodo = function(id) {
        $http.delete('/api/todos/' + id)
            .success(function(data) {
                $scope.todos = data;
>>>>>>> 4b880627771188671b6dd9b8ff38d6a65bb63d3a
                console.log(data);
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    };

}