import Backbone from 'backbone';
import SquareView from 'app/views/square_view';

const BoardView = Backbone.View.extend({
  initialize: function() {
    this.render();
  },

  events: {

  },

  render: function() {
    return this;
  }
});

export default BoardView;
