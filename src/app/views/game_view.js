import Backbone from 'backbone';
import BoardView from 'app/views/board_view';

const GameView = Backbone.View.extend({
  initialize: function() {
    this.render();
  },

  events: {
    'click .square': 'playSymbol',
    'click .undo': 'undoPlay',
  },

  render: function() {
    return this;
  }
});

export default GameView;
