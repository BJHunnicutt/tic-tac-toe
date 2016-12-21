import Backbone from 'backbone';
import Square from 'app/models/square';

const Board = Backbone.Collection.extend({
  // The Board represents a collection of Squares and should include any methods or attributes
  // that are involved in working with more than one Square.

  model: Square,

  currentTurn: function() {
    let Xs = 0;
    let Os = 0;
    let turn;
    this.forEach(function(square) {
      if (square.get("contents") === "X") {
        Xs += 1;
      } else if (square.get("contents") === "O") {
        Os += 1;
      }
    });

    if (Xs <= Os) {
      turn = "X"; //⭐️🌎🌙🌘💫🐋🐳🌕✨👾🚀
    } else {
      turn = "O";
    }
    return turn;
  },

  checkWin: function() {
    let ba = [];
    // Make an array of the board collection models
    this.models.forEach(function(square) {
      ba.push(square.get("contents"));
    });
    let symbols = ["X", "O"];
    // console.log("turn = "+ turn);
    let result;

    // Check Each symbol
    for (let s of symbols) {
      // Check horizontal and vertical wins
      for (let i of [0, 3, 6]) {
        let a = 0+parseInt(i); let b = 1+parseInt(i); let c = 2+parseInt(i);
        if (ba[a] == s && ba[b] == s && ba[c] == s) {
          return s;
        }
      }
      for (let i of [0, 1, 2]) {
        let x = 0+parseInt(i); let y = 3+parseInt(i); let z = 6+parseInt(i);
        if (ba[x] == s && ba[y] == s && ba[z] == s) {
          return s;
        }
      }
      // Check diaganol wins
      if (ba[0] == s && ba[4] == s && ba[8] == s) {
        return s;
      }
      else if (ba[2] == s && ba[4] == s && ba[6] == s) {
        return s;
      }
    } //Closing symbol loop

    // Check for a tie
    if ( !([].concat.apply([], ba)).includes(' ') ) { //That is essentially array.flatten.include?
      return "tie";
    } else {
    // If not a win or a tie, return false.
      return false;
    }

  } //Closing checkWin
});

export default Board;
