var BASKETBALL = BASKETBALL || {};

(function() {
  BASKETBALL.lists = {
    players: new BASKETBALL.players.List({}),
    teams: new BASKETBALL.teams.List({})
  }

  var frag = can.view('templates/app.stache',{
    players: BASKETBALL.lists.players,
    teams: BASKETBALL.lists.teams
  });

  $("#app").append(frag);
})();
