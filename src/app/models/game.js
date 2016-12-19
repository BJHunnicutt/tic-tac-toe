import Backbone from 'backbone';

import Square from 'app/models/square';
import Board from 'app/collections/board';

const Game = Backbone.Model.extend({
  // Default attributes if none are passed in

  initialize: function(options) {
    var squares = options.squares.map(function(attrs) {
      return new Square(attrs);
    });
    this.board = new Board(squares); // Alternatively, I think I could skip the top loop above and put options.squares instead of squares
    this.set("player_1", options.player1);
    this.set("player_2", options.player2);
    this.set("outcome", null);
    this.set("turn", "X");
  }

});

export default Game;
