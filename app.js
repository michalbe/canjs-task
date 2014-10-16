(function() {
  var frag = can.view('templates/app-template.stache',{
    players: playersList
  });

  $("#app").append(frag);
})();
