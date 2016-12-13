// game.spec.js
import Game from "game"; // It automatically knows to look in the src directory

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

    it('should make a board with an array of 3 arrays', function() {
        expect(testGame.b1.boardArray).toEqual([[' ', ' ', ' '], [' ', ' ', ' '], [' ', ' ', ' ']]);
    });
  });

  describe('play', function() {
    var testGame;
    beforeAll(function() {
      testGame = new Game();
    });

    it('get board should return a string of the board ', function() {
        expect(testGame.b1.getBoard()).toEqual(jasmine.any(String));
    });

  });

});
