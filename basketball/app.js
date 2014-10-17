var BASKETBALL = BASKETBALL || {};

(function() {
  // activate colorpicker
  setTimeout(function(){
    $('#colorpicker').colorpicker();
  }, 500);

  BASKETBALL.lists = {
    players: new BASKETBALL.Player.List({}),
    teams: new BASKETBALL.Team.List({})
  }

  var frag = can.view('templates/app.stache',{
    players: BASKETBALL.lists.players,
    teams: BASKETBALL.lists.teams
  });

  $("#app").append(frag);
})();
