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


var teams = ['team1', 'team2', 'team3', 'team4', 'team5', 'team6', 'team7', 'team8'];
var teams_in_group = 4;
var group_number = 2;
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
