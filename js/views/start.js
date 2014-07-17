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
    // events: {
    //   "click .quizListLine": function(e) {
    //     e.preventDefault();

    //     var user = this.$el.find("#user").val();
    //     console.log(user);
    //     console.log(e);
    //     console.log(this);
    //     window.someObj = e;
    //     // quiz.startQuiz(user);
    //     // render quiz question view
    //     // quizQuestionView.render();
    //   }
    // }
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

})();
