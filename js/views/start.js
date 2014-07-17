(function(){

  // ----- Templates
  var startHTML = $('#templates #start').html();
  var startTemplate = _.template(startHTML);

  // ---- VIEW LAYER
  var StartView = Backbone.View.extend({
    template: startTemplate,
    render: function() {
      this.$el.html( this.template( {} ) );
      return this;
    },
    events: {
      "click #start": function() {
        var user = this.$el.find("#user").val();
        console.log(user);
        quiz.startQuiz(user);
        // render quiz question view
        quizQuestionView.render();
      }
    }
  });

  window.startView = new StartView({
    el: "#main"
  });

})();
