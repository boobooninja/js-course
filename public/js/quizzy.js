(function(){
  var counter = 0;
  var questionList = [
    {"question":"q1", "options":["opt1", "opt2", "opt3"], "answer":"a1"},
    {"question":"q2", "options":["opt1", "opt2", "opt3"], "answer":"a2"},
    {"question":"q3", "options":["opt1", "opt2", "opt3"], "answer":"a3"}
  ];

  function getQuestion() {
    return questionList[counter];
    counter += 1;
  }

  function takeQuiz() {
    counter = 0;
  }


  window.quiz = {};
})();

$('#quiz').hide();
$('#question').hide();
$('#answer').hide();

$(document).on('click', '#start', function(){
  $(this).hide();
  $('#quiz').show();
  $('#question').show();
  quiz.takeQuiz();
  $(document).trigger('click', '#next');
});

$(document).on('click', '#next', function(){
  var question = quiz.getQuestion();
  var template = "<h3>"+question.question+"</h3><span>Options:</span>";
  $('#question').html();
});
