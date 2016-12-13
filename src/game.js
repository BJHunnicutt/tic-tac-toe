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

Board.prototype.cleanUpInput = function(position) {
  var positionArray = [];
  console.log(position)
  var letter = position[1].toUpperCase();
  positionArray[0] = position[0]-1;

  switch (letter) {
    case "A":
      positionArray[1] = "0";
      break;
    case "B":
      positionArray[1] = "1";
      break;
    case "C":
      positionArray[1] = "2";
      break;
  }

  var v = parseInt(positionArray[0]);
  var h = parseInt(positionArray[1]);

  console.log('v = '+ v + " h = " + h);

  return [v, h];
};

// Place the word in the board array variable in the correct place/orientation
Board.prototype.fill = function(position, symbol) {
  // check_coverage(word, start_position, direction)
  var [v, h] = this.cleanUpInput(position);

  this.boardArray[v][h] = symbol;
};



var Game = function() {
  this.p1 = 'X';
  this.p2 = 'O';
  this.turn = 1;
  this.b1 = new Board();
  console.log("New Game");
  this.startTurn();
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

 Game.prototype.changeTurn = function() {
     if (this.turn == 1) {
       this.turn = 2;
     }
     else if (this.turn == 2) {
       this.turn = 1;
     }
     return this.turn;
  };

// startTurn(): calls prompt
Game.prototype.startTurn = function() {
  // Display the board
  console.log(this.b1.getBoard());
  // Prompt user to input :
  console.log(" ------------------------------------------------------------------------------\n" +
  "|                           Player " + this.turn + " (" + this.currentSymbol() + ")                                      |\n" +
  " ------------------------------------------------------------------------------\n" +
  "|         POSITION: Enter the location of your play (e.g 2A)                   |\n" +
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

// Check position (play the input and switch turns)
Game.prototype.checkPosition = function(position) {
  var board = this.b1.fill(position, this.currentSymbol());
  var win = this.checkWin();
  console.log('Win? ' + win);
  if (win === true) {
    console.log("Player " + this.turn + " Wins!!!");
    return;
  }
  else {
    this.changeTurn();
    this.startTurn();
  }
};

Game.prototype.checkWin = function() {
  var ba = this.b1.boardArray;
  var s = this.currentSymbol();
  console.log('ba: ' + ba + ' s: ' + s);

  for (var i in [0, 1, 2]) {
    if (ba[0][i] == s && ba[1][i] == s && ba[2][i] == s) {
      console.log('vertical');
      return true;
    }
    else if (ba[i][0] == s && ba[i][1] == s && ba[i][2] == s) {
      console.log('horizontal');
      return true;
    }
  }

  if (ba[0][0] == s && ba[1][1] == s && ba[2][2] == s) {
    console.log('diaganol');
    return true;
  }
  else if (ba[0][2] == s && ba[1][1] == s && ba[2][0] == s) {
    console.log('diaganol');
    return true;
  }

  return false;
};

export default Game;

// module.exports = Game;

var game1 = new Game();
