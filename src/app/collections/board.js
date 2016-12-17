import Backbone from 'backbone';
import Square from 'app/models/square';

const Board = Backbone.Collection.extend({
  // The Board represents a collection of Squares and should include any methods or attributes
  // that are involved in working with more than one Square.
  
  model: Square
});

export default Board;
