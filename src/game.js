// game.js
// test

import Board from "board"; // It automatically knows to look in the src directory

var prompt = require('prompt');
//start the prompt
prompt.start();


var Game = function() {
  this.p1 = 'X';
  this.p2 = 'O';
  this.turn = 1;
  this.b1 = new Board();
  console.log("New Game");
  this.startTurn();
};

// startTurn(): calls prompt for placement location
Game.prototype.startTurn = function() {
  // Display the board
  console.log(this.b1.getBoard());
  // Prompt user to input :
  console.log(" ------------------------------------------ \n" +
  "|             Player " + this.turn + " (" + this.currentSymbol() + ")                 |\n" +
  " ------------------------------------------ \n" +
  "|  Where would you like to play? (e.g 2A)  | \n" +
  " ------------------------------------------ ");
  prompt.get(['position'], this.getPosition);
};

// getPosition(): handles the prompt input and calls play
Game.prototype.getPosition = function(err, result) {
    // Error handling
    if (err) { return onErr(err); }
    function onErr(err) {console.log(err); return 1; }
    // set variable
    var position = result.position;

    game1.play(position); //This game1 is named at the bottom of this file
};

// play() : fill the board at the input position and switch turns
Game.prototype.play = function(position) {

  if (this.checkPlacement(position) === true) {
    var board = this.b1.fill(position, this.currentSymbol());
    var win = this.checkWin();

    if (win !== true) {
      this.changeTurn();
      this.startTurn();
      return false;
    } else {
      return true;
    }
  }
};

/// Auxillary Game methods

Game.prototype.currentSymbol = function() {
    var symbol;
    if (this.turn == 1) {
      symbol = this.p1;
    }
    else if (this.turn == 2) {
      symbol = this.p2;
    }
    return symbol;
 };

Game.prototype.changeTurn = function() {
   if (this.turn == 1) {
     this.turn = 2;
   }
   else if (this.turn == 2) {
     this.turn = 1;
   }
   return this.turn;
};

Game.prototype.checkWin = function() {
  var ba = this.b1.boardArray;
  var s = this.currentSymbol();
  var win;
  var tie;

  // Check horizontal and vertical wins
  for (var i in [0, 1, 2]) {
    if (ba[0][i] == s && ba[1][i] == s && ba[2][i] == s) {
      win = true;
    }
    else if (ba[i][0] == s && ba[i][1] == s && ba[i][2] == s) {
      win = true;
    }
  }
  // Check diaganol wins
  if (ba[0][0] == s && ba[1][1] == s && ba[2][2] == s) {
    win = true;
  }
  else if (ba[0][2] == s && ba[1][1] == s && ba[2][0] == s) {
    win = true;
  }
  // Check for a tie
  if ( !([].concat.apply([], ba)).includes(' ') ) {
    tie = true;
  }
  // Declare win, tie, or false if neither.
  if (win === true) {
    // Display the board
    console.log(this.b1.getBoard());
    console.log("\n\n\n\t   Player " + this.turn + " Wins!!! \n\n\n");
    return true;
  }
  else if (tie === true) {
    console.log(this.b1.getBoard());
    console.log("\n\n\n\t Cat's Game! Try Again... \n\n\n");
    return true;
  }
  else { return false; }
};

// checkPlacement() : determines if a play is valid
Game.prototype.checkPlacement = function(position) {
  // Check if the input position is formatted properly
  if (this.checkInput(position) === true) {
    var [v, h] = this.b1.cleanUpInput(position);
    // Check if a position has already been used
    if (this.b1.boardArray[v][h] != ' ') {
      console.log('\n\n\n\t That space is not available! Try Again \n\n\n');
      this.startTurn();
      return false;
    }
    else {
      return true;
    }
  }
  else {
    console.log('\n\n\n\t That is not a valid position. The input should be formatted as a number and a letter (e.g. 1A). Try Again! \n\n\n');
    this.startTurn();
    return false;
  }
};

// checkInput() : determines if the position was given as 1 number(1-3) & 1 letter(a-c)
Game.prototype.checkInput = function(position) {
  if (position.length != 2) {
    return false;
  }
  else if (position[0].match(/[1-3]/) !== null && position[1].match(/[a-c]/i) !== null  ) { //the /i makes it case insensitive
    return true;
  }
  else {
    return false;
  }
};

export default Game;

// module.exports = Game; // Depreciated way to do this

var game1 = new Game();
