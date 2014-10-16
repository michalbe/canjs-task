(function() {

  var frag = can.view('templates/app.stache',{
    players: new BASKETBALL.players.List({}),
    teams: new BASKETBALL.teams.List({})
  });

  $("#app").append(frag);
})();
