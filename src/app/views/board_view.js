import $ from 'jquery';
import Backbone from 'backbone';
import _ from 'underscore';

import SquareView from 'app/views/square_view';


const BoardView = Backbone.View.extend({
  initialize: function() {
    this.listenTo(this.collection, 'change', this.render);

  },

  events: {
    'click .undo': 'undoPlay',
  },

  playSymbol: function(card) {
    console.log("contents: " + card.model.get("contents"));
    // console.log(this.collection.models[2].get("contents"));

    if (this.checkPlacement(card)) {
      let turn = this.determineTurn();
      card.model.set("contents", turn);
      console.log("Played an " + turn);
      var win = this.checkWin();
      if (win !== true) {
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

  determineTurn: function() {
    let Xs = 0;
    let Os = 0;
    let turn;
    this.collection.forEach(function(square) {
      if (square.get("contents") === "X") {
        Xs += 1;
      } else if (square.get("contents") === "O") {
        Os += 1;
      }
    });

    if (Xs <= Os) {
      turn = "X";
    } else {
      turn = "O";
    }
    return turn;
  },

  checkWin: function() {
    return false;
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
