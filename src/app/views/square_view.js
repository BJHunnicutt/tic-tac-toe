import Backbone from 'backbone';

const SquareView = Backbone.View.extend({
  initialize: function() {
    this.render();
  },

  events: {
    'click .square': 'playSymbol',

  },

  render: function() {
    return this;
  }
});

export default SquareView;
