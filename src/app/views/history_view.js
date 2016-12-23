import $ from 'jquery';
import Backbone from 'backbone';
import _ from 'underscore';

const HistoryView = Backbone.View.extend({
  // To get each square wrapped in: <li class="symbol-card large-4 medium-4 small-4 columns">
  // tagName: 'h3',
  className: 'player-hist-card button large-2 medium-2 small-4 columns',

  initialize: function() {
    this.template = _.template(Backbone.$('#tmpl-player-hist-card').html()); // Backbone does not seem to matter
  },

  events: {
    'click': 'selectPlayer',
  },

  selectPlayer: function(e) {
    // this.trigger('play', this);
    console.log("player selected");
    // console.log("Symbol Square: "+ this.model.attributes.location + '(' +this.model.attributes.contents + ") was clicked");

    // We return false to tell jQuery not to run any more event handlers. Otherwise, it would run the 'click' event handler on BoardView as well.
    return false;
  },

  render: function() {
    this.$el.html(this.template(this.model.attributes));

    return this;
  }

});

export default HistoryView;
