(function(){

  if ( window.localStorage.getItem('quizzy') ) {
    var store = JSON.parse( window.localStorage.getItem('quizzy') );
  } else {
    var store = { highScores: [] };
    window.localStorage.setItem('quizzy', JSON.stringify( store ) );
  }

  var counter = -1;
  var score = 0;
  // var questionList = [
  //   { id: 1,
  //     question: "An acute angle is less than 90 degrees",
  //     answer: true,
  //     reason: "An obtuse angle is greater than 90 degrees."
  //   },
  //   { id: 2,
  //     question: "The bear has caused more human deaths than any other mammal in history.",
  //     answer: false,
  //     reason: "The rat, a frequent carrier of disease, has been the deadliest mammal."
  //   },
  //   { id: 3,
  //     question: "The highest-grossing film series in history is Star Wars.",
  //     answer: false,
  //     reason: "The Harry Potter series is first; the James Bond series, second; and Star Wars, third."
  //   },
  //   { id: 4,
  //     question: "In her novel The Fountainhead, Ayn Rand promoted the virtues of communal efforts over individualism.",
  //     answer: false,
  //     reason: "In her 1943 novel, which reflects Rand's anticommunist philosophy of 'objectivism,' a genius architect battles conformist mediocrity."
  //   },
  //   { id: 5,
  //     question: "Napoleon Bonaparte was killed at the Battle of Waterloo.",
  //     answer: false,
  //     reason: "Napoleon surrendered to the British after his defeat at Waterloo and died in exile on the island of St. Helena."
  //   },
  //   { id: 6,
  //     question: "Apartheid was the political system dismantled in South Africa at the end of the 20th century.",
  //     answer: true,
  //     reason: "Apartheid - the system of legal, racial segregation - governed South Africa from 1948-1994."
  //   },
  //   { id: 7,
  //     question: "Dubai is home to the tallest man-made structure ever built.",
  //     answer: true,
  //     reason: "The 162-floor skyscraper named Burj Khalifa opened in 2010 in Dubai, United Arab Emirates."
  //   },
  //   { id: 8,
  //     question: "'E Pluribus Unum,' on the seal of the United States, means 'one, out of many.'",
  //     answer: true,
  //     reason: "It's a motto that emphasizes national unity."
  //   },
  //   { id: 9,
  //     question: "The sport saved from extinction by President Theodore Roosevelt was football.",
  //     answer: true,
  //     reason: "Until his 1905 call for regulation of the sport, football was dwindling in support due to its violence - 18 football players died that year."
  //   },
  //   { id: 10,
  //     question: "Oxygen makes up two-thirds of Earth and also two-thirds of the human body.",
  //     answer: false,
  //     reason: "Water is the most common substance at roughly these amounts."
  //   }
  // ];

  function nextQuestion() {
    counter += 1;
    return questionList[counter];
  }

  function currentQuestion() {
    return questionList[counter];
  }

  function startQuiz(user) {
    counter = -1;
    score = 0;
    this.user = user;
  }

  function getScore() {
    return score;
  }

  function validate(value) {
    var answer = questionList[counter].answer;
    if (value === answer) {
      score += 1;
    }
  }

  function quizOver() {
    if ( counter >= questionList.length - 1 ) {
      return true;
    } else {
      return false;
    }
  }

  function getHighScores() {
    var store = JSON.parse( localStorage.getItem( 'quizzy') );
    return store.highScores;
  }

  function saveScore() {
    var store = JSON.parse( localStorage.getItem( 'quizzy') );
    store.highScores.push( {name: quiz.user, score: quiz.getScore()} );
    store.highScores.sort(
      function(a,b) {
        return (a.score > b.score) ? -1 : ((b.score > a.score) ? 1 : 0);
      }
    );
    localStorage.setItem( 'quizzy', JSON.stringify(store) );
    return store.highScores;
  }

  window.quiz = {
    nextQuestion: nextQuestion,
    currentQuestion: currentQuestion,
    startQuiz: startQuiz,
    getScore: getScore,
    validate: validate,
    quizOver: quizOver,
    getHighScores: getHighScores,
    saveScore: saveScore
  };

})();

startView.render();
