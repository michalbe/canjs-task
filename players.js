var BASKETBALL = BASKETBALL || {};

BASKETBALL.players = (function() {
  can.Component.extend({
    tag: "players-list",
    template: can.view("templates/players-list.stache"),
    scope: {}
  });

  var playersModel = can.Model.extend({
    findAll: "GET /services/players"
  }, {});

  return playersModel;
})();
