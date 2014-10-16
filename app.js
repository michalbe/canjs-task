(function() {

  var frag = can.view('templates/app.stache',{
    players: new BASKETBALL.players.List({})
  });

  $("#app").append(frag);
})();
