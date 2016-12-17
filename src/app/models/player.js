import Backbone from 'backbone';

const Player = Backbone.Model.extend({
  // Default attributes if none are passed in
  defaults: {
    name: "Unknown",
    wins: 0,
    losses: 0
  }
});

export default Player;
