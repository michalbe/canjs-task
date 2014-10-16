var BASKETBALL = BASKETBALL || {};

BASKETBALL.teams = (function() {
  can.Component.extend({
    tag: "teams-list",
    template: can.view("templates/teams-list.stache"),
    scope: {}
  });

  var teamsModel = can.Model.extend({
    findAll: "GET /services/teams"
  }, {});

  return teamsModel;
})();
