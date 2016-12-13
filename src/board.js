var Board = function() {
  this.boardArray = [
    [' ', ' ', ' '],
    [' ', ' ', ' '],
    [' ', ' ', ' ']
  ];
};


Board.prototype.getBoard = function() {
  var boardArray = this.boardArray;
  var board = "\n\n\n" +
    "\t     a     b     c   " + "\n" +
    "\t   _________________ " + "\n" +
    "\t  |     |     |     |" + "\n" +
    "\t1 |" + "  " + boardArray[0][0] + "  |  " + boardArray[0][1] + "  |  " + boardArray[0][2] + "  |\n" +
    "\t  |_____|_____|_____|" + "\n" +
    "\t  |     |     |     |" + "\n" +
    "\t2 |" + "  " + boardArray[1][0] + "  |  " + boardArray[1][1] + "  |  " + boardArray[1][2] + "  |\n" +
    "\t  |_____|_____|_____|" + "\n" +
    "\t  |     |     |     |" + "\n" +
    "\t3 |" + "  " + boardArray[2][0] + "  |  " + boardArray[2][1] + "  |  " + boardArray[2][2] + "  |\n" +
    "\t  |     |     |     |" + "\n" +
    "\t   ----------------- " + "\n";
  return board;
};

Board.prototype.cleanUpInput = function(position) {
  var positionArray = [];
  var letter = position[1].toUpperCase();
  positionArray[0] = position[0] - 1;

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

  return [v, h];
};

// Place the word in the board array variable in the correct place/orientation
Board.prototype.fill = function(position, symbol) {
  // check_coverage(word, start_position, direction)
  var [v, h] = this.cleanUpInput(position);

  this.boardArray[v][h] = symbol;
  return this.boardArray;
};

export default Board;
