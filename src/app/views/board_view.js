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
    // console.log("contents: " + card.model.get("contents"));
    // console.log(this.collection.models[0].get("contents"));

    if (this.checkPlacement(card)) {
      let turn = this.determineTurn();
      card.model.set("contents", turn);
      // console.log("Played an " + turn);
      var win = this.checkWin(turn);
      if (win !== false ) {
        console.log("Game Over");
        // displayModal();
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
      if (square.get("contents") === "🚀") {
        Xs += 1;
      } else if (square.get("contents") === "🐋") {
        Os += 1;
      }
    });

    if (Xs <= Os) {
      turn = "🚀"; //⭐️🌎🌙🌘💫🐋🐳🌕✨👾🚀
    } else {
      turn = "🐋";
    }
    return turn;
  },

  checkWin: function(turn) {
    let ba = [];
    // Make an array of the board collection models
    this.collection.models.forEach(function(square) {
      ba.push(square.get("contents"));
    });
    let s = turn;
    console.log("turn = "+ turn);
    let result;

    // Check horizontal and vertical wins
    for (let i of [0, 3, 6]) {
      let a = 0+parseInt(i); let b = 1+parseInt(i); let c = 2+parseInt(i);
      if (ba[a] == s && ba[b] == s && ba[c] == s) {
        return "win";
      }
    }
    for (let i of [0, 1, 2]) {
      let x = 0+parseInt(i); let y = 3+parseInt(i); let z = 6+parseInt(i);
      if (ba[x] == s && ba[y] == s && ba[z] == s) {
        return "win";
      }
    }
    // Check diaganol wins
    if (ba[0] == s && ba[4] == s && ba[8] == s) {
      return "win";
    }
    else if (ba[2] == s && ba[4] == s && ba[6] == s) {
      return "win";
    }
    // Check for a tie
    if ( !([].concat.apply([], ba)).includes(' ') ) {
      console.log("Tie!");
      return "tie";
    } else {
    // If not a win or a tie, return false.
      return false;
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
