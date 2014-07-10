(function(){
  videos = [
    { title: 'Get Krazy', youtubeId: 'GyR2HJ9B7aM', genre: 'kid rap' },
    { title: 'Sadness', youtubeId: 'sIeJSSjTG3k', genre: 'piano' },
    { title: 'MIKA', youtubeId: 'nmcdLOjGVzw', genre: 'pop' },
    { title: 'Blurred Lines', youtubeId: 'yyDUC1LUXSU', genre: 'pop' }
  ];

  $(document).on('click', 'button', function(e){
    e.preventDefault();
    var title = $('#title').val();
    var youtubeId = $('#youtubeId').val();
    var genre = $('#genre').val();

    $('#title').val('');
    $('#youtubeId').val('');
    $('#genre').val('');

    videos.push({title: title, youtubeId: youtubeId, genre: genre});
    renderVideoList();
  });

  var renderVideoList = function () {
    $('#video-list').empty();
    var videoTemplate = $('#templates #video-list-item').html();
    for(var i = 0; i < videos.length; i++) {
      var renderedTemplate = Robin.render(videoTemplate, videos[i]);
      $('#video-list').append(renderedTemplate);
    }
    renderGenreStats();
  };

  var renderGenreStats = function() {
    $('#genre-stats').empty();
    var genreStats = {};
    for(var i = 0; i < videos.length; i++) {
      if ( genreStats[videos[i]['genre']] ) {
        genreStats[videos[i]['genre']] += 1;
      } else {
        genreStats[videos[i]['genre']] = 0;
        genreStats[videos[i]['genre']] += 1;
      }
    }
    var genreTemplate = $('#templates #genre-item').html();
    for (var genre in genreStats) {
      var renderedTemplate = Robin.render(genreTemplate, {genre: genre, count: genreStats[genre]});
      $('#genre-stats').append(renderedTemplate);
    }
  };

  renderVideoList();
})();
