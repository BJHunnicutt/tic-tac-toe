// import Backbone from 'backbone';
// import GameView from 'app/views/game_view';
import BoardView from 'app/views/board_view';


const ApplicationView = Backbone.View.extend({
  initialize: function() {

    this.render();
  },

  events: {
    'click .btn-newgame': 'newGame',
    'click .btn-cancel': 'clearForm'
  },

  newGame: function(e) {
    var gameAttrs = {
      name: this.$('.new-game-form input[name="player1"]').val(),
      email: this.$('.new-game-form input[name="player2"]').val()
    };
    // this.model.rolodex.add(gameAttrs);
    // this.clearForm();
    console.log('Save Button Pressed');

  },

  clearForm: function() {
    this.$('.new-game-form input').val('');
    console.log('Cancel Button Pressed');
  },


  render: function() {
    const boardView = new BoardView({
      model: this.model.board,
      el: this.$('#game')
    });
    boardView.render();

    return this;
  }
});

export default ApplicationView;
