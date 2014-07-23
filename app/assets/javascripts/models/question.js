(function(){
  window.App = window.App || {};

  window.App.QuestionModel = Backbone.Model.extend({
    urlRoot: '/quizzes/'+this.quiz_id+'/questions',
    showAnswer: function(){}
  });

  window.App.QuestionCollection = Backbone.Collection.extend({
    model: window.App.QuestionModel,
    initialize: function(attributes, options) {
      this.url = '/quizzes/' + options.quizID + '/questions';
    }
  });

})();
