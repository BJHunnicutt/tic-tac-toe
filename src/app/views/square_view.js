import $ from 'jquery';
import Backbone from 'backbone';
import _ from 'underscore';

const SquareView = Backbone.View.extend({
  tagName: 'li',
  className: 'symbol-card large-4 medium-4 small-4 columns',

  initialize: function() {
    this.template = _.template(Backbone.$('#tmpl-symbol-card').html());
  },

  events: {
    'click': 'playSymbol',

  },

  playSymbol: function(e) {
    // this.trigger('select', this);
    console.log("Symbol Square: "+ this.model.attributes.location + '(' +this.model.attributes.contents + ") was clicked");
    // We return false to tell jQuery not to run any more event handlers.
    // Otherwise, it would run the 'click' event handler on BoardView
    // as well.
    return false;
  },

  render: function() {
    this.$el.html(this.template(this.model.attributes));

    return this;
  }

});

export default SquareView;
