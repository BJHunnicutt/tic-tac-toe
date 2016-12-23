import $ from 'jquery';
import Backbone from 'backbone';
import _ from 'underscore';

import SquareView from 'app/views/square_view';


const BoardView = Backbone.View.extend({
  initialize: function() {
    this.listenTo(this.collection, 'change', this.render);
    this.render();
  },

  events: {
    'click .undo': 'undoPlay',
  },

  playSymbol: function(card) {
    // console.log("contents: " + card.model.get("contents"));
    // console.log(this.collection.models[0].get("contents"));

    if (this.checkPlacement(card)) {
      let turn = this.collection.currentTurn();
      // Set the contents of the clicked card to the current turn symbol
      card.model.set("contents", turn);

      // Highlight the name of the player whose turn it is
      let currentPlayer; let nextPlayer;
      if (turn === "X") {
        currentPlayer = '#player1-details';
        nextPlayer = '#player2-details';
      } else if (turn === "O") {
        currentPlayer = '#player2-details';
        nextPlayer = '#player1-details';
      }
      $(currentPlayer).css( "background-color", "rgba(255,255,255,0)" );
      $(nextPlayer).css( "background-color", "rgba(255, 215, 0, 0.85)" );



      // If someone wins or ties, trigger the modal in ApplicationView
      if (this.collection.checkWin() !== false ) {
        this.trigger('gameOver', this);
      }
    }
  },

  checkPlacement: function(card) {
    if (card.model.get("contents") != ' ') {
      return false;
    } else {
      return true;
    }
  },

  render: function() {
    // console.log(this.collection);

    const cardList = this.$('#symbol-cards');
    cardList.empty();

    this.collection.forEach(function(square) {
      const card = new SquareView({
        model: square
      });

      this.listenTo(card, 'play', this.playSymbol);

      cardList.append(card.render().$el);
    }, this);
    return this;
  }
});

export default BoardView;
