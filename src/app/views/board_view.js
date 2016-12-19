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
    // console.log(this.model);

    const cardList = this.$('#symbol-cards');
    cardList.empty();

    this.model.forEach(function(square) {
      const card = new SquareView({
        model: square,
      });

      // self.listenTo(card, 'select', self.showCard);

      cardList.append(card.render().$el);
    }, this);
    return this;
  }
});

export default BoardView;
