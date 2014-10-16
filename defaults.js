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

    return players;
  };

  var defaultTeams = function() {
    var teams = [
      {
        name: "SuperHeroes",
        color: "#F0F"
      },
      {
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
