(function(){

  // ----- Templates
  var quizQuestionHTML = $('#templates #quizQuestion').html();
  var quizQuestionTemplate = _.template(quizQuestionHTML);

  // ---- VIEW LAYER
  var QuizQuestionView = Backbone.View.extend({
    template: quizQuestionTemplate,
    render: function() {
      this.$el.html( this.template( quiz.nextQuestion() ) );
      return this;
    },
    events: {
      "click .answerButton": function(e) {
        var value = $(e.currentTarget).data('value');
        console.log(value);
        quiz.validate(value);
        // render answer view
        quizAnswerView.render();
      }
    }
  });

  window.quizQuestionView = new QuizQuestionView({
    el: "#main"
  });

})();
