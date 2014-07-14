var myView = {
  el: "#here",
  render: function() {
    $(this.el).html(Robin.render(myTemplate,myModel));
  }
};
