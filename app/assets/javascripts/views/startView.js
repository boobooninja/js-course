(function(){
  window.App = window.App || {};

  window.App.StartView = Backbone.View.extend({
    el: "#app-view",
    tagName: 'div',
    id: 'app-view',
    template: _.template(
      '<div class="medium-6 large-6 column button" id="play-quiz-button">'+
      '<h3>Play a Quiz</h3>'+
      '</div>'+
      '<div class="medium-6 large-6 column button" id="create-quiz-button">'+
      '<h3>Create a Quiz</h3>'+
      '</div>'
    ),
    render: function(){
      this.$el.html(this.template({}));
    },
    events: {
      "click #play-quiz-button": "play",
      "click #create-quiz-button": "create"
    },
    play: function(e){
      e.preventDefault();
      QuizzyApp.quizzes();
    }
  });

})();
