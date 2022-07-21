jQuery( function( $ ) {

  $( ".search" ).on( "click", function() {
    if ( $( "#searchform" ).attr( 'action' ) === 'https://google.com/search' ) {
      var action = 'https://duckduckgo.com',
        logo = 'duckduckgo.svg',
        text = 'Search DuckDuckGo',
        name = 'q';
    } else if ( $( "#searchform" ).attr( 'action' ) === 'https://duckduckgo.com' ) {
      var action = 'https://youtube.com/results',
        logo = 'youtube.svg',
        text = 'Search YouTube',
        name = 'search_query';
    } else if ( $( "#searchform" ).attr( 'action' ) === 'https://youtube.com/results' ) {
      var action = 'https://beta.music.apple.com/us/search',
        logo = 'applemusic.svg',
        text = 'Search Apple Music',
        name = 'term';
    } else if ( $( "#searchform" ).attr( 'action' ) === 'https://beta.music.apple.com/us/search' ) {
      var action = 'https://www.last.fm/search',
        logo = 'lastfm.svg',
        text = 'Search LastFM',
        name = 'q';
    } else if ( $( "#searchform" ).attr( 'action' ) === 'https://www.last.fm/search' ) {
      var action = 'https://twitter.com/search',
        logo = 'twitter.svg',
        text = 'Search Twitter',
        name = 'q';
    } else if ( $( "#searchform" ).attr( 'action' ) === 'https://twitter.com/search' ) {
      var action = 'https://news.google.com/search',
        logo = 'googlenews.svg',
        text = 'Search Google News',
        name = 'q';
    } else if ( $( "#searchform" ).attr( 'action' ) === 'https://news.google.com/search' ) {
      var action = 'https://github.com/search',
        logo = 'github.svg',
        text = 'Search Github',
        name = 'q';
    } else if ( $( "#searchform" ).attr( 'action' ) === 'https://github.com/search' ) {
      var action = 'https://www.midjourney.com/app/users/383432442448576517/?sort=new&search=',
        logo = 'midjourney.svg',
        text = 'Search MidJourney',
        name = 'search';
    } else {
      var action = 'https://google.com/search',
        logo = 'google.svg',
        text = 'Search Google',
        name = 'q';
    }
    $( "#searchform" ).attr( 'action', action );
    $( ".search" ).attr( 'src', logo );
    $( "#search" ).attr( 'name', name );
    $( "#search" ).attr( 'placeholder', text );
  } );

  $( "#search" ).on( 'focus', function() {
    $( "form" ).addClass( "focus" );
  } );

  $( "#search" ).on( 'focusout', function() {
    $( "form" ).removeClass( "focus" );
  } );

  $( document ).on( "click", function( e ) {
    if ( e.target.tagName !== "A" || e.target.tagName !== "INPUT" ) {
      $( "#search" ).focus();
      $( "form" ).addClass( "focus" );
    }
  } );

  $( "#search" ).focus();

  var lasty = setInterval( lastfm, 1000 * 60 * 3 );
  lastfm();

  function lastfm() {
    var url = 'https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=desmosthenes&api_key=df46fd3a07f78050c087696ec675130c&format=json&limit=1';

    fetch( url )
      .then( res => res.json() )
      .then( res => res[ 'recenttracks' ][ 'track' ] )
      .then( song => {
        var s = song.map( _map_it )[ 0 ];
        $( ".lastfm__artist" ).text( s.artist );
        $( ".lastfm__song" ).text( s.name );
        $( ".lastfm__album" ).text( s.album );
        $( ".lastfm__artist" ).attr( 'title', "Artist: " + s.artist );
        $( ".lastfm__song" ).attr( 'title', "Song: " + s.name );
        $( ".lastfm__album" ).attr( 'title', "Album: " + s.album );
        if ( s.image != "" ) {
          $( ".lastfm__image" ).attr( "src", s.image ).show();
        } else {
          $( ".lastfm__image" ).hide();
        }
        $( ".lastfm__url" ).attr( "href", s.link ).addClass( "shown" );
      } );

    function _map_it( song ) {
      return {
        id: song.mbid,
        name: song.name,
        album: song.album[ "#text" ],
        artist: song.artist[ "#text" ],
        image: song.image[ 3 ][ "#text" ],
        link: song.url
      }
    }
  }

} );
