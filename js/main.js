(function(){
  $(document).on('click', 'button', function(e){
    e.preventDefault();
    var title = $('#title').val();
    var youtubeId = $('#youtubeId').val();
    var videoTemplate = $('#templates #video-list-item').html();
    var renderedTemplate = Robin.render(videoTemplate, {title: title, youtubeId: youtubeId});
    $('#video-list').append(renderedTemplate);
    $('#title').val('');
    $('#youtubeId').val('');
  });

  var videos = [
    { title: 'Get Krazy', youtubeId: 'GyR2HJ9B7aM' },
    { title: 'Sadness', youtubeId: 'sIeJSSjTG3k' }
  ];

  var renderVideoList = function () {
    var videoTemplate = $('#templates #video-list-item').html();
    for(var i = 0; i < videos.length; i++) {
      var renderedTemplate = Robin.render(videoTemplate, videos[i]);
      $('#video-list').append(renderedTemplate);
    }
  };

  renderVideoList();
})();
