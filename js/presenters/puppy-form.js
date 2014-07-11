$(function () {

  var $root = $('form.new-puppy');

// View Interaction

  $root.on('submit', function (e) {
    e.preventDefault();
    var name = $('.new-puppy .name').val();
    var img  = $('.new-puppy .image').val();
    puppies.create({name: name, image_url: img});
  });

});
