var BASKETBALL = BASKETBALL || {};

BASKETBALL.players = (function() {
  can.Component.extend({
    tag: "players-list",
    template: can.view("templates/players-list.stache"),
    scope: {}
  });

  var PlayersModel = can.Model.extend({
    findAll: "GET /services/players",
    destroy: "DELETE /services/players/{id}"
  }, {});

  return PlayersModel;
})();
