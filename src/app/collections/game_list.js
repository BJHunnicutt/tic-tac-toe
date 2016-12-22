import $ from 'jquery';
import Backbone from 'backbone';

import Game from 'app/models/game';

const GameList = Backbone.Collection.extend({

  model: Game,

});

export default Board;
