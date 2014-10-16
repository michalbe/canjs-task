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
      console.log('gap!', players);
      return players;
    }

    var getAllTeams = function() {
      return teams;
    }

    return {
      getAllPlayers: getAllPlayers,
      getAllTeams: getAllTeams
    }
  })();

  can.fixture({
    "GET /services/players":  function() {
      console.log('elo?');
      return LS.getAllPlayers();
    }
  });
})();
