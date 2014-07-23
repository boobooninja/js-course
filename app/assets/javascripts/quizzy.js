(function(){

  // window.App = window.App || {};

  window.App.Router = Backbone.Router.extend({
    routes: {
      "": "index",
      "quizzes": "quizzes",
      "quizzes/:id": "quiz",
      "quizzes/:quiz_id/questions": "questions",
      "quizzes/:quiz_id/questions/:id": "question",
      "scores": "scores"
    },
    initialize: function(){
      this.startView = new window.App.StartView();
      this.quizList = new window.App.QuizCollection();
      this.quizListView = new window.App.QuizCollectionView({collection: this.quizList});

      // this.scoreList = new window.App.ScoreCollection();
      // this.scoreListView = new window.App.ScoreCollectionView({collection: this.scoreList});

      this.startView.render();
    },
    start: function(){
      Backbone.history.start({pushState: true});
    },
    index: function(){
      // this.quizList.fetch();
      // this.quizListView.render();
    },
    quizzes: function(){
      this.quizList.fetch();
      this.quizListView.render();
    },
    quiz: function(id){
      this.currentQuiz = this.quizList.get(id);
      this.quizView = new window.App.QuizModelView({model: this.currentQuiz});
      this.quizView.render();
    },
    questions: function(quiz_id){
      this.quiz(quiz_id);
      this.questionList = new window.App.QuestionCollection(undefined, {
        quizID: quiz_id
      });
      this.questionList.fetch();
      this.questionListView = new window.App.QuestionCollectionView({collection: this.questionList});
      this.questionListView.render();
    },
    question: function(quiz_id, id){
      this.quizList.fetch({data: {quiz_id: quiz_id, id: id}});
    },
    scores: function(){
      this.scoreList.fetch();
    }
  });

  window.QuizzyApp = new window.App.Router({});

  // $(function(){ QuizzyApp.start(); });

  // window.App.store = {
  //   setCurrentQuiz: function(someID) {
  //     window.App.currentQuiz = this.getQuiz(someID);
  //   },
  //   getHighScores: function(func) {
  //     // return this.get().highScores;
  //     $.ajax({
  //       url: "/scores",
  //       success: function(data){
  //         func(data);
  //       }
  //     });
  //   },
  //   getQuizzes: function(func) {
  //     $.ajax({
  //       url: "/quizzes",
  //       success: function(data){
  //         func(data);
  //       }
  //     });
  //   },
  //   getQuiz: function(someID, func) {
  //     $.ajax({
  //       url: "/quizzes/" + someID,
  //       success: function(data){
  //         func(data);
  //       }
  //     });
  //   },
  //   createQuiz: function(quiz, func){
  //     $.ajax({
  //       type: "POST",
  //       url: "/quizzes",
  //       data: quiz,
  //       success: function(data){
  //         func(data);
  //       }
  //     });
  //   },
  //   saveNewQuiz: function(data) {
  //     this.get().quizzes.push( data );
  //     this.put();
  //   },
  //   getQuestions: function(quizID, func){
  //     $.ajax({
  //       url: "/quizzes/" + quizID + "/questions",
  //       success: function(data){
  //         func(data);
  //       }
  //     });
  //   },
  //   getQuestion: function(quizID, questionID, func){
  //     $.ajax({
  //       url: "/quizzes/" + quizID + "/questions/" + questionID,
  //       success: function(data){
  //         func(data);
  //       }
  //     });
  //   },
  //   createQuestion: function(quizID, question, func){
  //     $.ajax({
  //       type: "POST",
  //       url: "/quizzes/" + quizID +"/questions",
  //       data: question,
  //       success: function(data){
  //         func(data);
  //       }
  //     });
  //   },
  //   validate: function(quizID, questionID, value, func){
  //     $.ajax({
  //       url: "/quizzes/" + quizID + "/questions/" + questionID + "?answer=" + value,
  //       success: function(data){
  //         func(data);
  //       }
  //     });
  //   },
  //   saveScore: function(score, func){
  //     $.ajax({
  //       type: "POST",
  //       url: "/scores",
  //       data: score,
  //       success: function(data){
  //         func(data);
  //       }
  //     });
  //   }
  // };

  // var counter = -1;
  // var score = 0;

  // function getQuizzes(callBack) {
  //   this.store.getQuizzes(callBack);
  // }

  // function nextQuestion(questionID, callBack) {
  //   counter += 1;
  //   var quizID = this.currentQuiz.id;
  //   var questID = questionID || counter
  //   // this.store.getQuestion(quizID, questID, callBack);
  //   console.log("nexQ currentQuiz", this.currentQuiz);
  //   callBack( this.currentQuiz.questions[counter] );
  // }

  // function currentQuestion() {
  //   return this.currentQuiz`[counter];
  // }

  // function getQuestions(quizID, callBack){
  //   var that = this;
  //   this.store.getQuestions(quizID, function(data){
  //     console.log('getQuestions', data);
  //     that.currentQuiz.questions = data;
  //     callBack(data);
  //   })
  // }

  // function startQuiz(data, callBack) {
  //   var quizID = data['quizID'];
  //   console.log('startQuiz ID', quizID);
  //   counter = -1;
  //   score = 0;

  //   this.user = data['user'];
  //   var that = this;
  //   this.store.getQuiz(quizID, function(data){
  //     console.log("getQuiz", data);
  //     that.currentQuiz = data;
  //     that.getQuestions(that.currentQuiz.id, callBack);
  //   });
  // }

  // function getScore(callBack) {
  //   callBack(score);
  // }

  // function validate(value, callBack) {
  //   var quizID = this.currentQuiz.id;
  //   var questID = this.currentQuestion().id;
  //   this.store.validate(quizID, questID, value, function(data){
  //     console.log("data", data);
  //     console.log("value", value);
  //     console.log("data.answer", data.answer);
  //     console.log(data.answer === value);
  //     if (value === data.answer) {
  //       score += 1;
  //     }
  //     callBack(data);
  //   });
  // }

  // function quizOver() {
  //   if ( counter >= this.currentQuiz.questions.length - 1 ) {
  //     return true;
  //   } else {
  //     return false;
  //   }
  // }

  // function getHighScores(callBack) {
  //   this.store.getHighScores(function(data){
  //     data.sort(
  //       function(a,b) {
  //         return (a.score > b.score) ? -1 : ((b.score > a.score) ? 1 : 0);
  //       }
  //     );

  //     callBack(data);
  //   });
  // }

  // function saveScore(callBack) {
  //   console.log("saveScore this", this);
  //   var user = this.user;
  //   console.log(this.user);
  //   console.log(user);
  //   var scoreJSON = {score: {user: user, score: score}};
  //   console.log("saveScore", scoreJSON);
  //   this.store.saveScore(scoreJSON, callBack);
  // }

  // function createQuiz(title, callBack) {
  //   var that = this;
  //   var quizJSON = {quiz: {title: title}};

  //   this.store.createQuiz(quizJSON, function(data){
  //     console.log("createQuiz", data);
  //     that.currentQuiz = data.entity;
  //     that.currentQuiz.questions = [];
  //     callBack(that.currentQuiz);
  //   });
  // }

  // function createQuestion(questionData, callBack) {
  //   var quizID = this.currentQuiz.id;
  //   var questionJSON = {
  //     question: {
  //       question: questionData.question,
  //       answer: questionData.answer,
  //       type: "boolean",
  //       quiz_id: quizID
  //     }
  //   };
  //   var that = this;
  //   this.store.createQuestion(quizID, questionJSON, function(data){
  //     console.log("createQuestion", data);
  //     that.currentQuiz.questions.push(data.entity);
  //     callBack(data.entity);
  //   });
  //   // data.id = this.currentQuiz.questions.length + 1;
  //   // this.currentQuiz.questions.push(data);
  // }

  // // function saveNewQuiz() {
  // //   this.store.saveNewQuiz( this.currentQuiz );
  // // }

  // window.App.getQuizzes      = getQuizzes;
  // window.App.getQuestions    = getQuestions;
  // window.App.nextQuestion    = nextQuestion;
  // window.App.currentQuestion = currentQuestion;
  // window.App.startQuiz       = startQuiz;
  // window.App.getScore        = getScore;
  // window.App.validate        = validate;
  // window.App.quizOver        = quizOver;
  // window.App.getHighScores   = getHighScores;
  // window.App.saveScore       = saveScore;
  // window.App.createQuiz      = createQuiz;
  // window.App.createQuestion  = createQuestion;
  // // window.App.saveNewQuiz     = saveNewQuiz;

})();
