(function(){

  window.App = window.App || {};

  // window.App.store = {
  //   setCurrentQuiz: function(someID) {
  //     window.App.currentQuiz = this.getQuiz(someID);
  //   },
  //   get: function() {
  //     if ( this.data ) { return this.data; }
  //     if ( window.localStorage.getItem('quizzy') ) {
  //       this.data = JSON.parse( window.localStorage.getItem('quizzy') );
  //     } else {
  //       this.data = { highScores: [], quizzes: [] };
  //       this.put();
  //     }
  //     return this.data;
  //   },
  //   put: function() {
  //     if ( !this.data ) { this.get(); }
  //     window.localStorage.setItem('quizzy', JSON.stringify( this.data ) );
  //   },
  //   getHighScores: function() {
  //     return this.get().highScores;
  //   },
  //   getQuizzes: function() {
  //     return this.get().quizzes;
  //   },
  //   getQuiz: function(someID) {
  //     console.log(someID);
  //     return _.findWhere(this.getQuizzes(), {id: someID});
  //   },
  //   saveNewQuiz: function(data) {
  //     this.get().quizzes.push( data );
  //     this.put();
  //   }
  // };

  window.App.store = {
    setCurrentQuiz: function(someID) {
      window.App.currentQuiz = this.getQuiz(someID);
    },
    getHighScores: function(func) {
      // return this.get().highScores;
      $.ajax({
        url: "/scores",
        success: function(data){
          func(data);
        }
      });
    },
    getQuizzes: function(func) {
      $.ajax({
        url: "/quizzes",
        success: function(data){
          func(data);
        }
      });
    },
    getQuiz: function(someID, func) {
      $.ajax({
        url: "/quizzes/" + someID,
        success: function(data){
          func(data);
        }
      });
    },
    saveNewQuiz: function(data) {
      this.get().quizzes.push( data );
      this.put();
    },
    getQuestions: function(quizID, func){
      $.ajax({
        url: "/quizzes/" + quizID + "/questions",
        success: function(data){
          func(data);
        }
      });
    },
    getQuestion: function(quizID, questionID, func){
      $.ajax({
        url: "/quizzes/" + quizID + "/questions/" + questionID,
        success: function(data){
          func(data);
        }
      });
    },
    validate: function(quizID, questionID, value, func){
      $.ajax({
        url: "/quizzes/" + quizID + "/questions/" + questionID + "?answer=" + value,
        success: function(data){
          func(data);
        }
      });
    },
    saveScore: function(score, func){
      $.ajax({
        type: "POST",
        url: "/scores",
        data: score,
        success: function(data){
          func(data);
        }
      });
    }
  };

  var counter = -1;
  var score = 0;

  function quizList(func) {
    this.store.getQuizzes(func);
  }

  function nextQuestion(questionID, callBack) {
    counter += 1;
    var quizID = this.currentQuiz.id;
    var questID = questionID || counter
    // this.store.getQuestion(quizID, questID, callBack);
    console.log("nexQ currentQuiz", this.currentQuiz);
    callBack( this.currentQuiz.questions[counter] );
  }

  function currentQuestion() {
    return this.currentQuiz.questions[counter];
  }

  function getQuestions(quizID, callBack){
    this.store.getQuestions(quizID, function(data){
      console.log('getQuestions', data);
      window.App.currentQuiz.questions = data;
      callBack(data);
    })
  }

  function startQuiz(data, callBack) {
    var quizID = data['quizID'];
    console.log('startQuiz ID', quizID);
    counter = -1;
    score = 0;

    this.user = data['user'];

    this.store.getQuiz(quizID, function(data){
      console.log(data);
      window.App.currentQuiz = data;
      window.App.getQuestions(window.App.currentQuiz.id, function(questions){
        window.App.currentQuiz.questions = questions;
        callBack(window.App.currentQuiz);
      });
    });
  }

  function getScore(callBack) {
    callBack(score);
  }

  function validate(value, callBack) {
    var quizID = this.currentQuiz.id;
    var questID = this.currentQuestion().id;
    this.store.validate(quizID, questID, value, function(data){
      console.log("data", data);
      console.log("value", value);
      console.log("data.answer", data.answer);
      console.log(data.answer === value);
      if (value === data.answer) {
        score += 1;
      }
      callBack(data);
    });

    // var answer = this.currentQuiz.questions[counter].answer;
    // var response;
    // if (value === answer) {
    //   score += 1;
    //   response = {"correct": "true"};
    // } else {
    //   response = {"correct": "false"};
    // }
    // callBack(response);
  }

  function quizOver() {
    if ( counter >= this.currentQuiz.questions.length - 1 ) {
      return true;
    } else {
      return false;
    }
  }

  function getHighScores(callBack) {
    this.store.getHighScores(callBack);
  }

  function saveScore(callBack) {
    console.log("saveScore this", this);
    var user = this.user;
    console.log(this.user);
    console.log(user);
    var scoreJSON = {score: {user: user, score: score}};
    console.log("saveScore", scoreJSON);
    this.store.saveScore(scoreJSON, callBack);

    // var currentHighScores = this.currentQuiz.highScores;
    // currentHighScores.push( {name: this.user, score: this.getScore()} );

    // currentHighScores.sort(
    //   function(a,b) {
    //     return (a.score > b.score) ? -1 : ((b.score > a.score) ? 1 : 0);
    //   }
    // );

    // this.store.put();
    // return currentHighScores;
  }

  function createQuiz(data) {
    data.id = this.quizList().length + 1;
    this.currentQuiz = data;
    console.log(this.currentQuiz);
  }

  function addQuestion(data) {
    data.id = this.currentQuiz.questions.length + 1;
    this.currentQuiz.questions.push(data);
  }

  function saveNewQuiz() {
    this.store.saveNewQuiz( this.currentQuiz );
  }

  window.App.quizList        = quizList;
  window.App.getQuestions    = getQuestions;
  window.App.nextQuestion    = nextQuestion;
  window.App.currentQuestion = currentQuestion;
  window.App.startQuiz       = startQuiz;
  window.App.getScore        = getScore;
  window.App.validate        = validate;
  window.App.quizOver        = quizOver;
  window.App.getHighScores   = getHighScores;
  window.App.saveScore       = saveScore;
  window.App.createQuiz      = createQuiz;
  window.App.addQuestion     = addQuestion;
  window.App.saveNewQuiz     = saveNewQuiz;

})();
