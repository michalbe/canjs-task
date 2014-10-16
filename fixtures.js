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
      console.log('qwe');
      for(var i = 0, l = players.length; i < l; i++){
        if(players[i].id == id) {
          players.splice(i, 1);
          break;
        }
      }
    }

    var destroyTeam = function(id) {
      for(var i = 0, l = teams.length; i < l; i++){
        if(teams[i].id == id) {
          teams.splice(i, 1);
          break;
        }
      }
    }

    var addPlayer = function(name) {
      var player = {
        id: players.length,
        name: name,
        team: 0
      };
      players.push(player);

      return player;
    };

    return {
      getAllPlayers: getAllPlayers,
      destroyPlayer: destroyPlayer,
      addPlayer: addPlayer,

      getAllTeams: getAllTeams,
      destroyTeam: destroyTeam,
    }
  })();

  can.fixture({
    "GET /services/players":  function() {
      var players = LS.getAllPlayers();
      return players;
    },
    "DELETE /services/players/{id}": function(request) {
      LS.destroyPlayer(request.data.id);
      return {};
    },
    "POST /services/players":  function(request, response) {
    	console.log("creating a player", request.data);
      var player = $.extend({},request.data);
      var id = LS.addPlayer(player);
      response({
        id: id
      });
    },

    "GET /services/teams":  function() {
      var teams = LS.getAllTeams();
      return teams;
    },
    "DELETE /services/teams/{id}": function(request) {
      LS.destroyTeam(request.data.id);
      return {};
    }
  });

})();
