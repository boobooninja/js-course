window.App = window.App || {};

window.App.createQuizView = function(){

  // ----- Templates
  var createQuizHTML = $('#templates #createQuiz').html();
  var createQuizTemplate = _.template(createQuizHTML);

  var addQuestionHTML = $('#templates #addQuestion').html();
  var addQuestionTemplate = _.template(addQuestionHTML);

  var showQuestionHTML = $('#templates #showQuestion').html();
  var showQuestionTemplate = _.template(showQuestionHTML);

  // ---- VIEW LAYER
  var CreateQuizView = Backbone.View.extend({
    showQuestionTemplate: showQuestionTemplate,
    addQuestionTemplate: addQuestionTemplate,
    template: createQuizTemplate,
    render: function() {
      var questions = App.currentQuiz.questions;
      var str ="";
      for (var i = 0; i < questions.length; i++) {
        str += this.showQuestionTemplate( questions[i] );
      }

      var currentQuizObj = App.currentQuiz;
      currentQuizObj.questionList = str;

      this.$el.html( this.template( currentQuizObj ) );
      this.$el.find('#questionListForm').html( this.addQuestionTemplate() );
      return this;
    },
    events: {
      "click #submitQuestion": function(e) {
        e.preventDefault();
        // save new question
        var question = this.$el.find('#questionListForm #question').val();
        var answer = this.$el.find('#questionListForm #answer').val();
        var reason = this.$el.find('#questionListForm #reason').val();
        console.log(question);
        var newQuestion = {question: question, answer: answer, reason: reason};
        App.addQuestion( newQuestion );
        this.render();
      },
      "click #submitQuiz": function(e) {
        e.preventDefault();
        App.saveNewQuiz();
        this.$el.html('');
        startView.render();
      }
    }
  });

  window.createQuizView = new CreateQuizView({
    el: "#form-box"
  });

};
