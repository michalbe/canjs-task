var BASKETBALL = BASKETBALL || {};

BASKETBALL.Team = (function() {
  can.Component.extend({
    tag: "teams-list",
    template: can.view("templates/teams-list.stache"),
    scope: {
      teamPlayers: function(team) {
        var tPlayers = [];
        var id = team.id;
        $.each(this.attr('players'), function(i, e){
          if (e.team === id) {
            e.attr('position', 'A');
            tPlayers.push(e);
          }
        });
        return tPlayers;
      }
    }
  });

  can.Component.extend({
    tag: "team-create",
    template: can.view('templates/team-create.stache'),
    scope: {
      createTeam: function(context, el, ev) {
        new Team({
          name: el.val(),
          color: $('#colorpicker').val()
        }).save().then(function(addedTeam) {
          el.val("");
          $('#colorpicker').val('');
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
