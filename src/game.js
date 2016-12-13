// game.js

var Board = function() {
  this.boardArray = [[' ', ' ', ' '], [' ', ' ', ' '], [' ', ' ', ' ']];
};

Board.prototype.getBoard = function() {
  var boardArray = this.boardArray;
  var board = "\n\n\n" +
  "\t\t   a b c" + "\n" +
  "\t\t 0" + " " + boardArray[0][0]  + "|" + boardArray[0][1]  + "|" + boardArray[0][2] + "\n" +
  "\t\t  ------- " + "\n" +
  "\t\t 1" + " " + boardArray[1][0]  + "|" + boardArray[1][1]  + "|" + boardArray[1][2] + "\n" +
  "\t\t  ------- " + "\n" +
  "\t\t 2" + " " + boardArray[2][0]  + "|" + boardArray[2][1]  + "|" + boardArray[2][2] + "\n";
  return board;
};

var Game = function() {
  this.p1 = 'X';
  this.p2 = 'O';
  this.turn = 1;
  this.b1 = new Board();
};

// playGame(): Goes back and forth having 2 players play words until someone wins
// Game.prototype.playGame = function() {
//
// };

export default Game;

// module.exports = Game;
