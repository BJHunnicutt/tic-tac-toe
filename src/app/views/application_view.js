import $ from 'jquery';
import Backbone from 'backbone';
import _ from 'underscore';

// import GameView from 'app/views/game_view';
import BoardView from 'app/views/board_view';


const ApplicationView = Backbone.View.extend({
  initialize: function() {

    this.render();
    this.listenTo('play', this.playSymbol);
  },

  events: {
    'click .btn-newgame': 'newGame',
    'click .btn-cancel': 'clearForm',
    'click .btn-continue': 'anotherGame'
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

  anotherGame: function() {
    console.log('Play Again Button Pressed');
  },


  render: function() {
    // console.log(this.model.get("turn"));
    const boardView = new BoardView({
      collection: this.model.board,
      // model: this.model.get("turn"), //dont use this...
      el: this.$('#game')
    });
    boardView.render();

    return this;
  }
});

export default ApplicationView;
