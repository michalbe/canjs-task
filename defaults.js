var BASKETBALL = BASKETBALL || {};
BASKETBALL.defaults = (function() {
  var defaultPlayers = function() {
    var players = [];
    var playersMocks = [
      "Michal Budzynski",
      "Ironman",
      "Thor",
      "Captain America",
      "Hawkeye"
    ];

    $.each(playersMocks, function(i, name){
      players.push({
        id: i+1,
        name: name,
        team: 0
      });
    });

    players[0].team = 1;
    return players;
  };

  var defaultTeams = function() {
    var teams = [
      {
        id: 1,
        name: "Superheroes",
        color: "#F0F"
      },
      {
        id: 2,
        name: "Legia Warszawa",
        color: "#F00"
      }
    ];

    return teams;
  };

  return {
    players: defaultPlayers,
    teams: defaultTeams
  }
})();
