var BASKETBALL = BASKETBALL || {};

BASKETBALL.teams = (function() {
  can.Component.extend({
    tag: "teams-list",
    template: can.view("templates/teams-list.stache"),
    scope: {}
  });

  can.Component.extend({
    tag: "team-create",
    template: can.view('templates/team-create.stache'),
    scope: {
      createTeam: function(context, el, ev) {
        new Team({
          name: el.val(),
          color: $('#colorpicker')[0].value
        }).save().then(function(addedTeam) {
          el.val("");
          BASKETBALL.lists.teams.push(addedTeam);
        });
      },

      submitCreateTeamWithButton: function(ctx, el, ev) {
        this.createTeam(null, $('#new-team-name'));
      }
    }
  });

  var Team = can.Model.extend({
    findAll: "GET /services/teams",
    destroy: "DELETE /services/teams/{id}",
    create: "POST /services/teams"
  }, {});

  return Team;
})();
