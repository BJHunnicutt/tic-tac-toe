import Backbone from 'backbone';

const Square = Backbone.Model.extend({
  // Default attributes if none are passed in
  defaults: {
    contents: " "
  }
});

export default Square;
