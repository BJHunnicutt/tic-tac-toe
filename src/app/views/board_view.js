import $ from 'jquery';
import Backbone from 'backbone';
import _ from 'underscore';

import SquareView from 'app/views/square_view';


const BoardView = Backbone.View.extend({
  initialize: function() {


    // this.listenTo(this.model, 'update', this.render);
  },

  events: {
    'click .undo': 'undoPlay',
  },

  render: function() {
    const cardList = this.$('#symbol-cards');
    cardList.empty();

    // const self = this;
    this.model.forEach(function(contact) {
      const card = new SquareView({
        model: contact
      });

      // self.listenTo(card, 'select', self.showCard);

      cardList.append(card.render().$el);
    }, this);
    return this;
  }
});

export default BoardView;
