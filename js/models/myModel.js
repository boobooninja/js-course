(function () {

  var myModel = {
    firstName: "Osei",
    lastName: "It's Complicated",
    age: "Old",
    gender: "Metrosexual",
    getName: function() {
      return this.firstName + " " + this.lastName;
    }
  };

  var myTemplate = $('#myTemplate').html();

  var myView = {
    el: "#here",
    render: function() {
      $(this.el).html(Robin.render(myTemplate, myModel));
    }
  }

  myView.render();


})();
