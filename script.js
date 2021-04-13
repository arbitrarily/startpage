jQuery( function( $ ) {

  $( ".search" ).on( "click", function() {
    if ( $( "#searchform" ).attr( 'action' ) === 'https://google.com/search' ) {
      var action = 'https://duckduckgo.com',
        logo = 'duckduckgo.svg';
    } else if ( $( "#searchform" ).attr( 'action' ) === 'https://duckduckgo.com' ) {
      var action = 'https://youtube.com/results?search_query=',
        logo = 'youtube.svg';
    } else {
      var action = 'https://google.com/search',
        logo = 'google.svg';
    }
    $( "#searchform" ).attr( 'action', action );
    $( ".search" ).attr( 'src', logo );
  } );

  $( "input" ).focus( function() {
    $( "form" ).addClass( "focus" );
  } );

  $( "input" ).focusout( function() {
    $( "form" ).removeClass( "focus" );
  } );

  var lasty = setInterval(lastfm, 1000 * 60 * 3);
  lastfm();

  function lastfm() {
    var url = 'https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=desmosthenes&api_key=df46fd3a07f78050c087696ec675130c&format=json&limit=1';

    fetch(url)
      .then(res => res.json())
      .then(res => res['recenttracks']['track'])
      .then(song => {
        var s = song.map(_map_it)[0];
        $(".lastfm__artist").text(s.artist);
        $(".lastfm__song").text(s.name);
        $(".lastfm__album").text(s.album);
        if (s.image != "") {
          $(".lastfm__image").attr("src", s.image).show();
        } else {
          $(".lastfm__image").hide();
        }
        $(".lastfm__url").attr("href", s.link).addClass("shown");
    });

    function _map_it(song) {
      console.log(song);
      return {
        id: song.mbid,
        name: song.name,
        album: song.album["#text"],
        artist: song.artist["#text"],
        image: song.image[3]["#text"],
        link: song.url
      }
    }
  }

} );
