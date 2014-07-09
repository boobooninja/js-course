(function() {
  $(document).on('click', 'button', function(e){
    e.preventDefault();
    var name = $('#name').val();
    var price = $('#price').val();
    var itemTemplate = $('#templates #item').html();
    var renderedTemplate = Robin.render(itemTemplate, {name: name, price: price});
    $('#store').append(renderedTemplate);
    $('#name').val('');
    $('#price').val('');
  });
})();
