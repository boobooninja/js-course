window.App = window.App || {};

window.App.quizAnswerView = function(){

  // ----- Templates
  var quizAnswerHTML = $('#templates #quizAnswer').html();
  var quizAnswerTemplate = _.template(quizAnswerHTML);

  // ---- VIEW LAYER
  var QuizAnswerView = Backbone.View.extend({
    template: quizAnswerTemplate,
    render: function() {
      var that = this;
      var data = App.currentQuestion();
      data.reason = data.reason || '';

      App.getScore(function(score){
        data.score = score;
        that.$el.html( that.template( data ) );
        return that;
      });
    },
    events: {
      "click #next": function(e) {

        if (App.quizOver()) {
          App.saveScore(function(data){
            window.scoresView.render();
          });
        } else {
          // render next question view
          window.quizQuestionView.render();
        }
      }
    }
  });

  window.quizAnswerView = new QuizAnswerView({
    el: "#main"
  });

};
