(function() {
  var LS = (function() {
    var players = JSON.parse(window.localStorage.getItem('players'));
    var teams = JSON.parse(window.localStorage.getItem('teams'));

    // if it is the first run, we add some players & teams
    if (players === null) {
      players = BASKETBALL.defaults.players();
    }
    if (teams === null) {
      teams = BASKETBALL.defaults.teams();
    }

    var getAllPlayers = function() {
      return players;
    }

    var getAllTeams = function() {
      return teams;
    }

    var destroyPlayer = function(id) {
      for(var i = 0, l = players.length; i < l; i++){
        if(players[i].id == id) {
          players.splice(i, 1);
          break;
        }
      }
    }

    return {
      getAllPlayers: getAllPlayers,
      getAllTeams: getAllTeams,
      destroyPlayer: destroyPlayer
    }
  })();

  can.fixture({
    "GET /services/players":  function() {
      var players = LS.getAllPlayers();
      return players;
    },
    "GET /services/teams":  function() {
      var teams = LS.getAllTeams();
      return teams;
    },

  	"DELETE /services/players/{id}": function(request) {
      LS.destroyPlayer(request.data.id);
      return {};
    }
  });

})();
