(function() {
  var LS = (function() {
    var saveAll = function() {
      window.localStorage.setItem('players', JSON.stringify(players));
      window.localStorage.setItem('teams', JSON.stringify(teams));
    }

    var players = JSON.parse(window.localStorage.getItem('players'));
    var teams = JSON.parse(window.localStorage.getItem('teams'));

    // if it is the first run, we add some players & teams
    if (players === null) {
      players = BASKETBALL.defaults.players();
      saveAll();
    }
    if (teams === null) {
      teams = BASKETBALL.defaults.teams();
      saveAll();
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
      saveAll();
    }

    var destroyTeam = function(id) {
      for(var i = 0, l = teams.length; i < l; i++) {
        if(teams[i].id == id) {
          teams.splice(i, 1);
          break;
        }
      }
      saveAll();
    }

    var addPlayer = function(name) {
      var player = {
        id: players.length,
        name: name.name,
        team: 0
      };
      players.push(player);

      saveAll();
      return player;
    };

    var addTeam = function(team) {
      var team = {
        id: teams.length + 1,
        name: team.name,
        color: team.color
      };
      teams.push(team);

      saveAll();
      return team;
    };

    return {
      getAllPlayers: getAllPlayers,
      destroyPlayer: destroyPlayer,
      addPlayer: addPlayer,

      getAllTeams: getAllTeams,
      destroyTeam: destroyTeam,
      addTeam: addTeam
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
      var player = $.extend({},request.data);
      response(LS.addPlayer(player));
    },

    "GET /services/teams":  function() {
      var teams = LS.getAllTeams();
      return teams;
    },
    "DELETE /services/teams/{id}": function(request) {
      LS.destroyTeam(request.data.id);
      return {};
    },
    "POST /services/teams":  function(request, response) {
      var team = $.extend({},request.data);
      response(LS.addTeam(team));
    },
  });

})();
