(function () {

  var $root = $("#puppy-showcase")
    , puppyTemplate = $("#templates .puppy").html()

// View Interaction

  // Using event delegation on the $root because the
  // because the image is in the template to be rendered.
  $root.on('click', '.vote-image', function (e) {
    var id = $(this).closest('.puppy').data('id');
    puppies.castVote(id);
  });


// Model Interaction

  puppies.on("create", function (puppy) {
    console.log('Spawned puppy:', puppy);
    var renderedTemplate = Robin.render(puppyTemplate, puppy);
    $root.append(renderedTemplate);
  });

  puppies.on('vote-cast', function (puppy) {
    var template = $('#templates .rank').html();
    var Renderedtemplate = Robin.render(template, puppy);
    console.log('Vote cast for:', puppy);
    var str = '*[data-id="' +puppy.id+'"]'
    $root.find(str).find('.vote-count').html(Renderedtemplate);
  });

})();
