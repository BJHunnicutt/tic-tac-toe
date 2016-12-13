// game.spec.js
import Game from "game"; // It automatically knows to look in the src directory


// --------------------------  BOARD Tests  -------------------------- //
describe('board', function() {

  describe('initialize', function() {
    var testGame;
    beforeAll(function() {
      testGame = new Game();
    });

    it('should make a board with an array of 3 arrays', function() {
        expect(testGame.b1.boardArray).toEqual([[' ', ' ', ' '], [' ', ' ', ' '], [' ', ' ', ' ']]);
    });

    it('get board should return a string of the board ', function() {
        expect(testGame.b1.getBoard()).toEqual(jasmine.any(String));
    });
  });

  describe('cleanUpInput', function() {
    var testGame;
    beforeAll(function() {
      testGame = new Game();
    });

    it('turn a string position into array coordinates', function() {
        expect(testGame.b1.cleanUpInput('1a')).toEqual([0,0]);
                expect(testGame.b1.cleanUpInput('1b')).toEqual([0,1]);
    });
  });

  describe('fill', function() {
    var testGame;
    beforeAll(function() {
      testGame = new Game();
    });

    it('checks if an empty position is detected as empty', function() {
      expect(testGame.b1.boardArray[0][0]).toEqual(' ');
    });

    it('checks if the fill function fills a position properly', function() {
      testGame.b1.fill('1a', 'X');
      expect(testGame.b1.boardArray[0][0]).toEqual('X');
    });
  });
});



// --------------------------  GAME Tests  -------------------------- //
describe('Game', function() {

  describe('initialize', function() {
    var testGame;
    beforeEach(function() {
      testGame = new Game();
    });

    it('should initialize 2 players', function() {
        expect(testGame.p1).toEqual('X');
        expect(testGame.p2).toEqual('O');
    });

    it('should set turn equal to 1', function() {
        expect(testGame.turn).toEqual(1);
    });

  });

// skipped testing startTurn & getPosition because we didn't know how to have tests interact with the prompt

  describe('play', function() {
    var testGame;
    beforeAll(function() {
      testGame = new Game();
    });

    it('checks if the turn advances if the desired position is available', function() {
      expect(testGame.turn).toEqual(1);
      testGame.play('1a');
      expect(testGame.turn).toEqual(2);
      testGame.play('1a'); //spot unavailable so turn should not advance:
      expect(testGame.turn).toEqual(2);
    });
  });

  describe('checkPlacement', function() {
    var testGame;
    beforeAll(function() {
      testGame = new Game();
    });

    it('checks if the desired position is available', function() {
      expect(testGame.checkPlacement('1a')).toEqual(true);
      testGame.play('1a');
      expect(testGame.checkPlacement('1a')).toEqual(false);
    });
  });


  describe('changeTurn and currentSymbol', function() {
    var testGame;
    beforeAll(function() {
      testGame = new Game();
    });

    it('checks if the turn and the symbol is set to the defualts', function() {
      expect(testGame.currentSymbol()).toEqual('X');
      expect(testGame.turn).toEqual(1);
    });

    it('checks if the turn advances and the symbol changes accordingly', function() {
      testGame.changeTurn();
      expect(testGame.currentSymbol()).toEqual('O');
      expect(testGame.turn).toEqual(2);
    });
  });

  describe('checkWin', function() {
    var testGame;
    beforeAll(function() {
      testGame = new Game();
      testGame.play('1a'); //curent player = X
      testGame.play('1b');
      testGame.play('2a');
      testGame.play('2b');
    });

    it('checks if the game is still on when no one has yet won', function() {
      expect(testGame.checkWin()).toEqual(false);
    });

    it('checks if the game ends when someone wins', function() {
      expect(testGame.play('3a')).toEqual(true);
    });
  });

  describe('checkInput', function() {
    var testGame;
    beforeAll(function() {
      testGame = new Game();
    });

    it('checks if the input is a letter and a number', function() {
      expect(testGame.checkInput('1a')).toEqual(true);
      expect(testGame.checkInput('aa')).toEqual(false);
      expect(testGame.checkInput('jfdk4387584#$!@$#@!$31')).toEqual(false);
    });

  });

});
