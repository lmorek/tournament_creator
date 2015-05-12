function shuffle(array) {
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
$scope.shuffleButtonClick = function(){
	drawGroups();
}

var drawGroups = function(){
	//[team1,team2]
	var teamNames = $scope.teams.map(function(team){return team.name;})
	$scope.groups = shuffler.shuffle(teamNames, $scope.groupCount);
	//[[team1],[team2]]

}

var teams_in_group = parseInt(document.getElementById("mygroup").value);
var group_number = parseInt(document.getElementById("mygroup2").value);
var groups = [];

shuffle(teams);

for (i=0; i<group_number; i++) {
 groups[i] = [];
};

for (i=0; i<group_number; i++){
	groups[i].push(teams.slice(0,teams_in_group));
	teams.splice(0,teams_in_group);
};

for (i=0; i<group_number; i++){
	alert(groups[i]);
};
