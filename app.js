(function() {
  var frag = can.view('templates/app.stache',{
    players: BASKETBALL.players
  });

  $("#app").append(frag);
})();
