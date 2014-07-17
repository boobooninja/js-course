(function(){

  // ----- Templates
  var quizQuestionHTML = $('#templates #quizQuestion').html();
  var quizQuestionTemplate = _.template(quizQuestionHTML);

  // ---- VIEW LAYER
  var QuizQuestionView = Backbone.View.extend({
    template: quizQuestionTemplate,
    render: function() {
      this.$el.html( this.template( App.nextQuestion() ) );
      return this;
    },
    events: {
      "click .answerButton": function(e) {
        var value = $(e.currentTarget).data('value');
        console.log(value);
        App.validate(value);
        // render answer view
        window.quizAnswerView.render();
      }
    }
  });

  window.quizQuestionView = new QuizQuestionView({
    el: "#main"
  });

})();
