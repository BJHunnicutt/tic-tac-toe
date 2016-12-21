import $ from 'jquery';
import Backbone from 'backbone';
import _ from 'underscore';

import Game from 'app/models/game';
import ApplicationView from 'app/views/application_view';

let game = new Game(
  // {squares: [
  //   {contents: " ", location: 0},
  //   {contents: "X", location: 1},
  //   {contents: " ", location: 2},
  //   {contents: " ", location: 3},
  //   {contents: " ", location: 4},
  //   {contents: "O", location: 5},
  //   {contents: " ", location: 6},
  //   {contents: " ", location: 7},
  //   {contents: " ", location: 8}
  // ],
  // player1: 'Jeannie',
  // player2: 'Lauren'}
);

$(document).ready(function() {

var appView = new ApplicationView({
  el: $('body'),
  model: game
});

}); // closing $(document).ready
