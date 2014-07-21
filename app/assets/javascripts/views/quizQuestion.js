window.App = window.App || {};

window.App.quizQuestionView = function(){

  // ----- Templates
  var quizQuestionHTML = $('#templates #quizQuestion').html();
  var quizQuestionTemplate = _.template(quizQuestionHTML);

  // ---- VIEW LAYER
  var QuizQuestionView = Backbone.View.extend({
    template: quizQuestionTemplate,
    render: function() {
      var that = this;
      App.nextQuestion(undefined, function(data){
        console.log("QQV nextQ", data);
        var renderedTemplate = that.template(data);
        that.$el.html(renderedTemplate);
        return that;
      });
    },
    events: {
      "click .answerButton": function(e) {
        var value = $(e.currentTarget).data('value').toString();
        console.log(value);
        App.validate(value, function(data){
          console.log("validate", data);
          // render answer view
          window.quizAnswerView.render();
        });
      }
    }
  });

  window.quizQuestionView = new QuizQuestionView({
    el: "#main"
  });

};
