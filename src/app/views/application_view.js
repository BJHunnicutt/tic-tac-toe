import Backbone from 'backbone';
import GameView from 'app/views/game_view';

const ApplicationView = Backbone.View.extend({
  initialize: function() {
    this.render();
  },

  events: {

  },

  render: function() {
    return this;
  }
});

export default ApplicationView;
