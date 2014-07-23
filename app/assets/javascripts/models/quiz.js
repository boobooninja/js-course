(function(){
  window.App = window.App || {};

  window.App.QuizModel = Backbone.Model.extend({
    urlRoot: '/quizzes',
    validate: function(){
      console.log("QuizModel validate");
    }
  });

  window.App.QuizCollection = Backbone.Collection.extend({
    url: '/quizzes',
    model: window.App.QuizModel
  });

  window.App.quizzes = new window.App.QuizCollection();
  window.App.quizzes.fetch();
})();
