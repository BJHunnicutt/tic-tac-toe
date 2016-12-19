import $ from 'jquery';
import Backbone from 'backbone';
import _ from 'underscore';

import Game from 'app/models/game';
import ApplicationView from 'app/views/application_view';

let game = new Game({
  squares: [
    {contents: " ", location: 0},
    {contents: " ", location: 1},
    {contents: "X", location: 2},
    {contents: " ", location: 3},
    {contents: " ", location: 4},
    {contents: " ", location: 5},
    {contents: "O", location: 6},
    {contents: " ", location: 7},
    {contents: " ", location: 8}
  ],
  player1: 'Player 1',
  player2: 'Player 2',
});

$(document).ready(function() {

var appView = new ApplicationView({
  el: $('body'),
  model: game
});

}); // closing $(document).ready
