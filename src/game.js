// game.js

var prompt = require('prompt');
//start the prompt
prompt.start();

var Board = function() {
  this.boardArray = [[' ', ' ', ' '], [' ', ' ', ' '], [' ', ' ', ' ']];
};

Board.prototype.getBoard = function() {
  var boardArray = this.boardArray;
  // var board2 = "\n\n\n" +
  // "\t\t   a b c" + "\n" +
  // "\t\t 0" + " " + boardArray[0][0]  + "|" + boardArray[0][1]  + "|" + boardArray[0][2] + "\n" +
  // "\t\t  ------- " + "\n" +
  // "\t\t 1" + " " + boardArray[1][0]  + "|" + boardArray[1][1]  + "|" + boardArray[1][2] + "\n" +
  // "\t\t  ------- " + "\n" +
  // "\t\t 2" + " " + boardArray[2][0]  + "|" + boardArray[2][1]  + "|" + boardArray[2][2] + "\n";

  var board = "\n\n\n" +
  "\t\t     a     b     c   " + "\n" +
  "\t\t   _________________ " + "\n" +
  "\t\t  |     |     |     |" + "\n" +
  "\t\t1 |" + "  " + boardArray[0][0]  + "  |  " + boardArray[0][1]  + "  |  " + boardArray[0][2] + "  |\n" +
  "\t\t  |_____|_____|_____|" + "\n" +
  "\t\t  |     |     |     |" + "\n" +
  "\t\t2 |" + "  " + boardArray[1][0]  + "  |  " + boardArray[1][1]  + "  |  " + boardArray[1][2] + "  |\n" +
  "\t\t  |_____|_____|_____|" + "\n" +
  "\t\t  |     |     |     |" + "\n" +
  "\t\t3 |" + "  " + boardArray[2][0]  + "  |  " + boardArray[2][1]  + "  |  " + boardArray[2][2] + "  |\n" +
  "\t\t  |     |     |     |" + "\n" +
  "\t\t   ----------------- " + "\n";
  return board;
};

var Game = function() {
  this.p1 = 'X';
  this.p2 = 'O';
  this.turn = 1;
  this.b1 = new Board();
  this.play();
};

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

// play(): Goes back and forth having 2 players play words until someone wins
Game.prototype.play = function() {
  // that = this;
  // Prompt user to input :

  console.log(" ------------------------------------------------------------------------------\n" +
  "|                           Player " + this.turn + " (" + this.currentSymbol() + ")                                  |\n" +
  " ------------------------------------------------------------------------------\n" +
  "|         POSITION: Enter the location of your play (e.g 2A)                      |\n" +
  " ------------------------------------------------------------------------------");
  prompt.get(['position'], this.getPosition);
};

Game.prototype.getPosition = function(err, result) {
    // Error handling
    if (err) { return onErr(err); }
    function onErr(err) {console.log(err); return 1; }
    // set variable
    var position = result.position;

    game1.checkPosition(position); //This game1 is named at the bottom of this file

};

Game.prototype.checkPosition = function() {
  console.log("In checkPosition");

};


export default Game;

// module.exports = Game;

var game1 = new Game();
