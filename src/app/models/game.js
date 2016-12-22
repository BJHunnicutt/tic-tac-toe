import Backbone from 'backbone';

import Square from 'app/models/square';
import Board from 'app/collections/board';

const Game = Backbone.Model.extend({
  // Setting defaults using an initialize constructor
  url: 'https://tictactoe-api-bjh.herokuapp.com/api/v1/games',

  initialize: function(options = {}) { //Set default to {} if no options are given.

    var base_board;
    var blank_board = {board: ["O", "X", " ", " ", " ", "O", "X", " ", " "]};

    // If no board is given, use a blank board
    // if (options.squares === undefined || options.squares === "" || options.squares === null) {
    //   base_board = blank_board.squares;
    // } else {
    //   base_board = options.squares;
    // }
    if (options.board === undefined || options.board === [] || options.board === null) {
      base_board = blank_board.board;
    } else {
      base_board = options.board;
    }

    // Turn the board array into a Collection of Square models
    var squares = base_board.map(function(contents) {
      return new Square({"contents": contents});
    });
    this.board = new Board(squares); // Alternatively, you can use loop above and put squares instead of base_board.squares, but that loop happens automatically in the Board collection setup


    // If no outcome is given, use a blank board
    if (options.outcome === undefined || options.outcome === [] || options.outcome === null) {
      this.outcome = "";
    } else {
      this.outcome = options.outcome;
    }
    // Reset and then track current matchup stats
    this.set("outcomes", [0, 0, 0]);


    // Set player names
    if (options.players === undefined || options.players[0] === null || options.players[0] === "") {
        this.set("player1", "Player 1");
    } else {
      this.set("player1", options.players[0]);
    }
    if (options.players === undefined || options.players[1] === null || options.players[1] === "") {
        this.set("player2", "Player 2");
    } else {
      this.set("player2", options.players[1]);
    }

  },

  reset_board: function() {
    var blank_board = [" ", " ", " ", " ", " ", " ", " ", " ", " "];

    // Turn the board array into a Collection of Square models
    var squares = blank_board.map(function(contents) {
      return new Square({"contents": contents});
    });
    this.board = new Board(squares);
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
