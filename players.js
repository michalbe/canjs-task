var BASKETBALL = BASKETBALL || {};

BASKETBALL.Player = (function() {
  can.Component.extend({
    tag: "players-list",
    template: can.view("templates/players-list.stache"),
    scope: {
      resetTeam: function() {
        if (BASKETBALL.currentPlayer) {
          BASKETBALL.currentPlayer.attr('team', 0);
          BASKETBALL.currentPlayer = undefined;
        }
      },
      setCurrentPlayer: function(e) {
        BASKETBALL.currentPlayer = e;
      },
    }
  });

	can.Component.extend({
    tag: "player-create",
    template: can.view('templates/player-create.stache'),
    scope: {
      createPlayer: function(ctx, el, ev) {
        new Player({
          name: el.val()
        }).save().then(function(addedPlayer) {
          el.val("");
          BASKETBALL.lists.players.push(addedPlayer);
        });
      },

      submitCreatePlayerWithButton: function(ctx, el, ev) {
        this.createPlayer(null, $('#new-name'));
      }
    }
  });

  var Player = can.Model.extend({
    findAll: "GET /services/players",
    destroy: "DELETE /services/players/{id}",
    create: "POST /services/players"
  }, {});

  return Player;
})();
