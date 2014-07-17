(function(){

  // ----- Templates
  var quizAnswerHTML = $('#templates #quizAnswer').html();
  var quizAnswerTemplate = _.template(quizAnswerHTML);

  // ---- VIEW LAYER
  var QuizAnswerView = Backbone.View.extend({
    template: quizAnswerTemplate,
    render: function() {
      var data = quiz.currentQuestion();
      data.score = quiz.getScore();
      this.$el.html( this.template( data ) );
      return this;
    },
    events: {
      "click #next": function(e) {

        if (quiz.quizOver()) {
          quiz.saveScore();
          // render scores view
          scoresView.render();
        } else {
          // render next question view
          quizQuestionView.render();
        }
      }
    }
  });

  window.quizAnswerView = new QuizAnswerView({
    el: "#main"
  });

})();
