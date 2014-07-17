window.App = {
  client: (new XMLHttpRequest()),
  store: function() {
    // load quiz objects
    return $.ajax({
      url: 'lib/store/myQuiz.txt',
      dataType: 'text',
      success: function(data){
        console.log(data);
      }
    });
  }
};
