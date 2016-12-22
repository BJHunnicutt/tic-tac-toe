import $ from 'jquery';
import Backbone from 'backbone';
import _ from 'underscore';

import Game from 'app/models/game';
import BoardView from 'app/views/board_view';


const ApplicationView = Backbone.View.extend({
  initialize: function() {
    // Assign the Modal template that will be displayed when someone wins
    this.gameOverTemplate = _.template(Backbone.$('#tmpl-end-game').html());
    // Assign the DOM element where the template above will be inserted
    this.gameOverModal = this.$('#game-over-modal');

    this.render();
  },

  events: {
    'click': 'hideModal',
    'click .btn-newgame': 'newGame',
    'click .btn-cancel': 'clearForm',
    'click .btn-continue': 'anotherGame'
  },

  newGame: function(e) {
    var gameAttrs = {
      player1: this.$('.new-game-form input[name="player1"]').val(),
      player2: this.$('.new-game-form input[name="player2"]').val()
    };

    // Create a new game model with the input player names
    let game = new Game({player1: gameAttrs.player1, player2: gameAttrs.player2});
    this.model.clear();
    this.model = game;
      // console.log("Player 1: " + this.model.get("player1"));


    // this.model.rolodex.add(gameAttrs);
    this.clearForm();
    this.render();
    console.log('Save Button Pressed');

  },

  clearForm: function() {
    this.$('.new-game-form input').val('');
    console.log('Cancel Button Pressed');
  },

  anotherGame: function() {
    // Tried to clear the board 2 ways:

    // 1. I made a Game model method that resets just the board:
      this.model.reset_board();
        // I went with this one because it could maintain tournament scores

    // 2. I made a new game model with the current players and set the this.model to be that.
      // let game = new Game({player1: this.model.get("player1"), player2: this.model.get("player2")});
      // this.model.clear();
      // this.model = game;
        // console.log("Player 1: " + this.model.get("player1"));

    this.render();
  },

  displayEndGame: function(event) {

    let outcome = this.model.board.checkWin();
    // Update the score tracker in the game model
    this.model.updateOutcomes(outcome);
    // Add this game to the API
    this.model.formatGameForAPI(outcome);

    // Create a Game over message for the modal
    let modal_message;
    if (outcome === "tie") {
      modal_message = "Cat's Game!";
    } else if (outcome === "X" ) {
      modal_message = this.model.get("player1") + " Wins!";
    }  else if (outcome === "O" ) {
      modal_message = this.model.get("player2") + " Wins!";
    }
    // console.log(modal_message);


    // assign the proper values to the proper location in the template
    var gameOverDetails = this.gameOverTemplate({
      message: modal_message,
    });

    // could also use .toJSON() instead of .attributes: b/c .attributes gives you direct access to the attributes, which can be bad because you bypass validations and can accidentally change them without triggering events.

    this.gameOverModal.html(gameOverDetails);
    this.gameOverModal.fadeIn();
    this.$('#background-cover').show(); //This is a workaround so that if they click anywhere off the modal (even on the boardView), the modal will colse
  },

  hideModal: function(e) {
    // // The actual DOM element for the modal
    const modalElement = this.gameOverModal[0];
    const clickedOnModal = (modalElement == e.target); // OR (modalElement == e.target || Backbone.$.contains(modalElement, e.target)); //If you also want to include clicking on elements inside the modal, but I want it to close if a button is clicked.

    if (this.gameOverModal.is(':visible') && !clickedOnModal) {
      this.gameOverModal.fadeOut();
      // Also close the transparent div I covered everything else in.
      this.$('#background-cover').hide();
      this.anotherGame();
    }

  },

  render_scores: function() {
    console.log("Rendering Scores");
    this.scoreTemplate = _.template(Backbone.$('#tmpl-player-details').html());

    var score_details = [
      this.scoreTemplate({
        name: this.model.get("player1"),
        symbol: "(X)",
        wins: this.model.get("outcomes")[0]
      }),
      this.scoreTemplate({
        name: "Tie",
        symbol: "",
        wins: this.model.get("outcomes")[1]
      }),
      this.scoreTemplate({
        name: this.model.get("player2"),
        symbol: "(O)",
        wins: this.model.get("outcomes")[2]
      })
    ];

    $('#player1-details').html(score_details[0]);
    $('#tie-details').html(score_details[1]);
    $('#player2-details').html(score_details[2]);

  },

  render: function() {
    // console.log(this.model.get("turn"));
    const boardView = new BoardView({
      collection: this.model.board,
      // model: this.model.get("turn"), //dont use this...
      el: this.$('#game')
    });

    this.listenTo(boardView, 'gameOver', this.displayEndGame);

    this.render_scores();
    boardView.render();
    return this;
  }
});

export default ApplicationView;
