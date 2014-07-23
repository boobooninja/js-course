(function(){
  window.App = window.App || {};

  window.App.QuestionModelView = Backbone.View.extend({
    tagName: 'div',
    className: 'question-view',
    template: _.template(
      '<h3 id="question-question">{{=question}}</h3>'+
      '<select>'+
      '<option value="true">true</option>'+
      '<option value="false">false</option>'+
      '</select>'+
      '<h3 id="question-answer"></h3>'
    ),
    initialize: function(){
      this.on('showAnswer', this.showAnswer, this);
    },
    render: function(){
      this.$el.html(this.template(this.model.attributes));
      return this;
    },
    events: {
      "click option": "validate"
    },
    validate: function(){
      // this.$el.find('#question-answer').html(this.model.get('answer'));
      console.log("validate");
    }
  });

  window.App.QuestionCollectionView = Backbone.View.extend({
    el: '#quiz-question-list',
    tagName: 'div',
    id: 'question-collection-view',
    className: 'question-list',
    initialize: function(){
      this.collection.on('add', this.renderOne, this);
      this.on('validate', this.showAnswer);
    },
    render: function(){
      this.renderAll();
      return this;
    },
    renderOne: function(question){
      var questionView = new window.App.QuestionModelView({model: question});
      this.$el.append(questionView.render().el);
    },
    renderAll: function(){
      this.collection.forEach(this.renderOne, this);
    },
    showAnswer: function(){
      model.trigger('showAnswer');
    }
  });

  // var questions = new window.App.QuestionCollection();

  // window.App.questionCollectionView = new window.App.QuestionCollectionView({collection: questions});

})();
