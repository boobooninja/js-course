window.App = window.App || {};

window.App.startView = function(){

  // ----- Templates
  var startHTML = $('#templates #start').html();
  var startTemplate = _.template(startHTML);

  var quizListLineHTML = $('#templates #quizListLine').html();
  var quizListLineTemplate = _.template(quizListLineHTML);

  // ---- VIEW LAYER
  var StartView = Backbone.View.extend({
    template: startTemplate,
    quizListLineTemplate: quizListLineTemplate,
    render: function() {
      var that = this;
      App.getQuizzes(function(quizList){
        console.log(quizList);
        var str ="";
        for (var i = 0; i < quizList.length; i++) {
          str += that.quizListLineTemplate( quizList[i] );
        }

        that.$el.html( that.template( {quizList: str} ) );
        return that;
      });
    }
  });

  window.startView = new StartView({
    el: "#main"
  });

  $(document).on('click', '.quizListLine', function(e){
    e.preventDefault();
    var quizID = parseInt( this.dataset.id );
    console.log('quizID', quizID);
    var user = $("#user").val();
    console.log('user', user);

    App.startQuiz({user: user, quizID: quizID}, function(data){
      window.quizQuestionView.render();
    });
  });

  $(document).on('click', '#addQuiz', function(e){
    e.preventDefault();
    console.log('addQuiz');
    var user = $("#user").val();
    var title = $("#title").val();

    if (!user || !title) {
      App.error = "Your username and quiz title is required";
      window.startView.render();
    } else {
      // var newQuiz = {id: undefined, author: userName, title: quizTitle, highScores: [], questions: []};
      App.createQuiz(title, function(data){
        window.createQuizView.render();
      });
    }
  });

};
