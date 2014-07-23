(function(){
  window.App = window.App || {};

  window.App.QuizListingView = Backbone.View.extend({
    tagName: 'li',
    className: 'quiz-listing-view',
    template: _.template(
      '<a href="#" class="quiz-listing" data-id="{{=id}}">{{=title}}</a>'
    ),
    render: function(){
      this.$el.html(this.template(this.model.attributes));
      return this;
    }
  });

  window.App.QuizCollectionView = Backbone.View.extend({
    el: '#app-view',
    tagName: 'div',
    id: 'quiz-collection-view',
    className: 'quiz-list',
    template: _.template(
      '<input type="text" id="user" placeholder="Input your name">'+
      '<label>Select a quiz</label>'+
      '<ul>'+
      '</ul>'
    ),
    initialize: function(){
      this.collection.on('add', this.renderOne, this);
    },
    render: function(){
      this.$el.html(this.template());
      this.renderAll();
      return this;
    },
    renderOne: function(quizListing){
      var quizListingView = new window.App.QuizListingView({model: quizListing});
      this.$el.find('ul').append(quizListingView.render().el);
    },
    renderAll: function(){
      this.collection.forEach(this.renderOne, this);
    },
    events: {
      "click .quiz-listing": "playQuiz"
    },
    playQuiz: function(e){
      e.preventDefault();
      var quizID = e.currentTarget.dataset.id;
      console.log('quizID', quizID);
      var user = this.$el.find("#user").val();
      console.log('user', user);
      QuizzyApp.questions(quizID);
    }
  });

  // window.App.quizCollectionView = new window.App.QuizCollectionView({collection: window.App.quizzes});

  window.App.QuizModelView = Backbone.View.extend({
    el: '#app-view',
    tagName: 'div',
    id: 'quiz-model-view',
    className: 'quiz',
    template: _.template(
      '<h3>{{=title}}</h3>'+
      '<div id="quiz-question-list"><h3>Questions</h3></div>'+
      '<button id="submit-quiz">Submit</button>'
    ),
    render: function(){
      this.$el.html(this.template(this.model.attributes));
    },
    events: {
      "click #submit-quiz": "submitQuiz"
    },
    submitQuiz: function(e){
      e.preventDefault();
      // console.log("submitQuiz");
      // console.log("submitQuiz", this.model);
      this.model.validate();
      // console.log("this", this);
    }
  });

  // window.App.quizModelView = new window.App.QuizModelView({model: window.App.quizzes.at(1)});

})();
