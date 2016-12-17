import Backbone from 'backbone';

const Game = Backbone.Model.extend({
  // Default attributes if none are passed in
  defaults: {
    board: new Board(),
    player_1: new Player(),
    player_2: new Player(),
    outcome: null
  }
});

export default Game;
