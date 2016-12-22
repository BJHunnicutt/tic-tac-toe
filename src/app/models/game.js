import Backbone from 'backbone';

import Square from 'app/models/square';
import Board from 'app/collections/board';

const Game = Backbone.Model.extend({
  // Setting defaults using an initialize constructor
  url: 'https://tictactoe-api-bjh.herokuapp.com/api/v1/games',

  initialize: function(options = {}) { //Set default to {} if no options are given.

    var base_board;
    var blank_board = {squares: [
      {contents: " ", location: 0},
      {contents: " ", location: 1},
      {contents: " ", location: 2},
      {contents: " ", location: 3},
      {contents: " ", location: 4},
      {contents: " ", location: 5},
      {contents: " ", location: 6},
      {contents: " ", location: 7},
      {contents: " ", location: 8}
    ]};
    // If no board is given, use a blank board
    if (options.squares === undefined || options.squares === "" || options.squares === null) {
      base_board = blank_board.squares;
    } else {
      base_board = options.squares;
    }

    // var squares = blank_board.squares.map(function(attrs) {
    //   return new Square(attrs);
    // });
    this.board = new Board(base_board); // Alternatively, you can use loop above and put squares instead of base_board.squares, but that loop happens automatically in the Board collection setup
    this.set("outcomes", [0, 0, 0]);

    if (options.player1 === undefined || options.player1 === null || options.player1 === "") {
        this.set("player1", "Player 1");
    } else {
      this.set("player1", options.player1);
    }
    if (options.player2 === undefined || options.player2 === null || options.player2 === "") {
        this.set("player2", "Player 2");
    } else {
      this.set("player2", options.player2);
    }

  },

  reset_board: function() {
    var blank_board = {squares: [
      {contents: " ", location: 0},
      {contents: " ", location: 1},
      {contents: " ", location: 2},
      {contents: " ", location: 3},
      {contents: " ", location: 4},
      {contents: " ", location: 5},
      {contents: " ", location: 6},
      {contents: " ", location: 7},
      {contents: " ", location: 8}
    ]};

    this.board = new Board(blank_board.squares);
  },

  updateOutcomes: function(outcome) {
    if (outcome === "tie") {
      let o = this.get("outcomes");
      o[1] = o[1] + 1;
      this.set("outcomes", o);
    } else if (outcome === "X" ) {
      let o = this.get("outcomes");
      o[0] = o[0] + 1;
      this.set("outcomes", o);
    }  else if (outcome === "O" ) {
      let o = this.get("outcomes");
      o[2] = o[2] + 1;
      this.set("outcomes", o);
    }
  },

  formatGameForAPI: function(outcome) {
    // Initialize the JSON data needed for the API
    let formatted = {"board": [], "players": [], "outcome": ""};

    // Make an array of the board collection models
    let board = [];
    this.board.models.forEach(function(square) {
      board.push(square.get("contents"));
    });

    // Set the JSON data for the current game
    formatted.board = board;
    formatted.players = [this.get("player1"), this.get("player2")];
    formatted.outcome = outcome;

    this.save(formatted);
  },
});

export default Game;
