(function() {
  var frag = can.view('/templates/app-template.stache',{
    players: BASKETBALL.players
  });

  $("#app").append(frag);
})();
