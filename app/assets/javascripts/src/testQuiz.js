(function(){
  window.App.store.getQuizzes().push(
    { id: 2,
      name: 'How Well Do You Know Our Presidents',
      author: 'Loren',
      highScores: [],
      questions: [
        { id: 1,
          question: "Did James K. Polk popularize the faux hawk hair style?",
          answer: false,
          reason: "He popularized the mullet."
        },
        { id: 2,
          question: "What John Quincy Adams known for streaking accross the grounds of the white house?",
          answer: false,
          reason: "He was known for skinny-dipping in the Patomac."
        }
      ]
    }
  );

  window.App.store.put();
})();
