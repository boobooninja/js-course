(function(){

  // ----- Templates
  var quizAnswerHTML = $('#templates #quizAnswer').html();
  var quizAnswerTemplate = _.template(quizAnswerHTML);

  // ---- VIEW LAYER
  var QuizAnswerView = Backbone.View.extend({
    template: quizAnswerTemplate,
    render: function() {
      var data = App.currentQuestion();
      data.score = App.getScore();
      this.$el.html( this.template( data ) );
      return this;
    },
    events: {
      "click #next": function(e) {

        if (App.quizOver()) {
          App.saveScore();
          // render scores view
          window.scoresView.render();
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

})();
