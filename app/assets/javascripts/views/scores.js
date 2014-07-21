window.App = window.App || {};

window.App.scoresView = function(){

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
      var that = this;
      App.getHighScores(function(scores){
        var str ="";
        for (var i = 0; i < scores.length; i++) {
          str += that.scoreLineTemplate( scores[i] );
        }

        that.$el.html( that.template( {scores: str} ) );
        return that;
      });
    },
    events: {
      "click #newGameButton": function() {
        // render start view
        window.startView.render();
      }
    }
  });

  window.scoresView = new ScoresView({
    el: "#main"
  });

};
