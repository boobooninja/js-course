(function(){

  window.App = {
    store: {
      setCurrentQuiz: function(someID) {
        window.App.currentQuiz = this.getQuiz(someID);
      },
      get: function() {
        if ( this.data ) { return this.data; }
        if ( window.localStorage.getItem('quizzy') ) {
          this.data = JSON.parse( window.localStorage.getItem('quizzy') );
        } else {
          this.data = { highScores: [], quizzes: [] };
          this.put();
        }
        return this.data;
      },
      put: function() {
        if ( !this.data ) { this.get(); }
        window.localStorage.setItem('quizzy', JSON.stringify( this.data ) );
      },
      getHighScores: function() {
        return this.get().highScores;
      },
      getQuizzes: function() {
        return this.get().quizzes;
      },
      getQuiz: function(someID) {
        console.log(someID);
        return _.findWhere(this.getQuizzes(), {id: someID});
      },
      saveNewQuiz: function(data) {
        this.get().quizzes.push( data );
        this.put();
      }
    }
  };

  var counter = -1;
  var score = 0;

  function quizList() {
    return this.store.getQuizzes();
  }

  function nextQuestion() {
    counter += 1;
    return this.currentQuiz.questions[counter];
  }

  function currentQuestion() {
    return this.currentQuiz.questions[counter];
  }

  function startQuiz(data) {
    var userName = data['user'];
    var quizID = data['quizID'];
    console.log('startQuiz ID', quizID);
    counter = -1;
    score = 0;
    this.user = userName;
    this.currentQuiz = this.store.getQuiz(quizID);
  }

  function getScore() {
    return score;
  }

  function validate(value) {
    var answer = this.currentQuiz.questions[counter].answer;
    if (value === answer) {
      score += 1;
    }
  }

  function quizOver() {
    if ( counter >= this.currentQuiz.questions.length - 1 ) {
      return true;
    } else {
      return false;
    }
  }

  function getHighScores() {
    return this.store.getHighScores();
  }

  function saveScore() {
    var currentHighScores = this.currentQuiz.highScores;
    currentHighScores.push( {name: this.user, score: this.getScore()} );

    currentHighScores.sort(
      function(a,b) {
        return (a.score > b.score) ? -1 : ((b.score > a.score) ? 1 : 0);
      }
    );

    this.store.put();
    return currentHighScores;

    // var store = JSON.parse( localStorage.getItem( 'quizzy') );
    // store.highScores.push( {name: quiz.user, score: quiz.getScore()} );
    // store.highScores.sort(
    //   function(a,b) {
    //     return (a.score > b.score) ? -1 : ((b.score > a.score) ? 1 : 0);
    //   }
    // );
    // localStorage.setItem( 'quizzy', JSON.stringify(store) );
    // return store.highScores;
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

startView.render();
