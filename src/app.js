import $ from 'jquery';
import Backbone from 'backbone';
import _ from 'underscore';

import Game from 'app/models/game';
import ApplicationView from 'app/views/application_view';

let game = new Game(
  {board: [" ", " ", " ", " ", " ", " ", " ", " ", " "],
  players: ['Player 1', 'Player 2']}
);

$(document).ready(function() {

var appView = new ApplicationView({
  el: $('body'),
  model: game
});

}); // closing $(document).ready
