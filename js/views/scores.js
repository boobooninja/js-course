(function(){

  // ----- Templates
  var scoresHTML = $('#templates #scores').html();
  var scoresTemplate = _.template(scoresHTML);

  var scoreLineHTML = $('#templates #scoreLine').html();
  var scoreLineTemplate = _.template(scoreLineHTML);

  // ---- VIEW LAYER
  var ScoresView = Backbone.View.extend({
    template: scoresTemplate,
    scoreLineTemplate: scoreLineTemplate,
    render: function() {
      var scores = quiz.getHighScores();
      var str ="";
      for (var i = 0; i < scores.length; i++) {
        str += this.scoreLineTemplate( scores[i] );
      }

      this.$el.html( this.template( {scores: str} ) );
      return this;
    },
    events: {
      "click #newGameButton": function() {
        // render start view
        startView.render();
      }
    }
  });

  window.scoresView = new ScoresView({
    el: "#main"
  });

})();
