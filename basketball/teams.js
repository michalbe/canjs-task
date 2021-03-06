var BASKETBALL = BASKETBALL || {};

BASKETBALL.Team = (function() {
  can.Component.extend({
    tag: "teams-list",
    template: can.view("templates/teams-list.stache"),
    scope: {
      positions: ['A', 'B', 'C', 'D'],

      destroyTeam: function(team) {
        this.attr('players').each(function(e, i) {
          if (e.attr('team') === team.id) {
            e.attr('team', 0);
          }
        });

        team.destroy();
      },

      teamPlayers: function(team) { //XXX
        var tPlayers = [];
        var id = team.id;
        var posInd = 0;
        this.attr('players').each(function(e, i) {
          if (e.attr('team') === id) {
            e.attr('position', this.positions[posInd++]);
            tPlayers.push(e);
          }
        }.bind(this));
        return tPlayers;
      },

      setCurrentPlayer: function(e) {
        BASKETBALL.currentPlayer = e;
      },

      moveToTeam: function(e) {
        if (BASKETBALL.currentPlayer && e.id && this.teamPlayers(e).length < 4) {
          BASKETBALL.currentPlayer.attr('team', e.id);
          BASKETBALL.currentPlayer = undefined;
        }
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
