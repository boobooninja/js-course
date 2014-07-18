(function(){

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
      var quizList = App.quizList();
      var str ="";
      for (var i = 0; i < quizList.length; i++) {
        str += this.quizListLineTemplate( quizList[i] );
      }

      this.$el.html( this.template( {quizList: str} ) );
      return this;
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

    App.startQuiz({user: user, quizID: quizID});
    window.quizQuestionView.render();
  });

  $(document).on('click', '#addQuiz', function(e){
    e.preventDefault();
    console.log('addQuiz');
    var userName = $("#user").val();
    var quizName = $("#name").val();

    if (!userName || !quizName) {
      App.error = "Your username and quiz name is required";
      window.startView.render();
    } else {
      var newQuiz = {id: undefined, author: userName, name: quizName, highScores: [], questions: []};
      App.createQuiz( newQuiz );
      window.createQuizView.render();
    }
  });

})();
