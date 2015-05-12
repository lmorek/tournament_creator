angular.module('tournamentCreator', []).controller('mainController', ['$scope', '$http','Shuffler', function($scope, $http, Shuffler) {

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

    $scope.shuffleButtonClick = function(){
        drawGroups();
    }

    var drawGroups = function(){
        //[team1,team2]
        var teamNames = $scope.teams.map(function(team){return team.name;});
        $scope.groups = Shuffler.shuffle(teamNames, $scope.groupCount); //zbindowane po stronie UI
        //[[team1],[team2]]
        // how to display?
        // <div ng-repeat="group in groups">
        //  <span ng-repeat="team in group">{{team}}</span>
        // </div>
    }


}]).filter('nospace', function () {
    return function (value) {
        return (!value) ? '' : value.replace(/ /g, '');
    };
}).factory('Shuffler', function(){
    return {
        shuffle: function(teams, group_number) {

            function reorder(array) {
              var currentIndex = array.length, temporaryValue, randomIndex ;

              // While there remain elements to shuffle...
              while (0 !== currentIndex) {

                // Pick a remaining element...
                randomIndex = Math.floor(Math.random() * currentIndex);
                currentIndex -= 1;

                // And swap it with the current element.
                temporaryValue = array[currentIndex];
                array[currentIndex] = array[randomIndex];
                array[randomIndex] = temporaryValue;
              }
              return array;
            }
            
            var teams_in_group = Math.ceil(teams.length /group_number); ///zaokraglic do gory alboco
            var groups = [];

            reorder(teams);

            for (i=0; i<group_number; i++) {
             groups[i] = [];
            };

            for (i=0; i<group_number; i++){
                groups[i].push(teams.slice(0,teams_in_group));
                teams.splice(0,teams_in_group);
            };

            return groups;            
        }
    }
});
;

