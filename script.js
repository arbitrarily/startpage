jQuery( function( $ ) {

  var lasty = setInterval( lastfm, 1000 * 60 * 3 ),
    down = {};

  function switcher( action, logo, text, name ) {
    $( "#searchform" ).attr( 'action', action );
    $( ".search" ).attr( 'src', logo );
    $( "#search" ).attr( 'placeholder', text );
    $( "#search" ).attr( 'name', name );
  }

  function numb( min, max ) {
    return Math.floor( Math.random() * ( max - min + 1 ) + min );
  }

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
        $( ".lastfm__container" ).show();
        $( ".lastfm__url" ).attr( "href", s.link ).addClass( "shown" );
      } ).catch( error => {
        $( ".lastfm__container" ).hide();
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

  $( "#searchform label" ).on( "click", function() {
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
      var action = 'https://www.midjourney.com/app/users/383432442448576517',
        logo = 'midjourney.svg',
        text = 'Search MidJourney',
        name = 'search';
    } else if ( $( "#searchform" ).attr( 'action' ) === 'https://www.midjourney.com/app/users/383432442448576517' ) {
      var action = 'https://www.poewiki.net/index.php',
        logo = 'poe.png',
        text = 'Search PoE Wiki',
        name = 'search';
    } else {
      var action = 'https://google.com/search',
        logo = 'google.svg',
        text = 'Search Google',
        name = 'q';
    }
    switcher( action, logo, text, name );
  } );

  $( "#search" ).on( 'focus focusout', function() {
    $( "form" ).removeClass( "focus" );
  } );

  $( document ).on( "click", function( e ) {
    if ( e.target.tagName !== "A" || e.target.tagName !== "INPUT" ) {
      $( "#search" ).focus();
      $( "form" ).addClass( "focus" );
    }
  } );

  $( "body" ).css( {
    "background": "radial-gradient(ellipse at " + numb( 1, 50 ) + "% " + numb( 90, 120 ) + "%, rgb(27, 27, 24) 0%, #0d0d0d 90%)"
  } );

  $( "#search" ).focus();

  $( document ).keydown( function( e ) {
    down[ e.keyCode ] = true;
  } ).keyup( function( e ) {
    if ( down[ 37 ] && down[ 38 ] ) {
      var action = 'https://www.poewiki.net/index.php',
        logo = 'poe.png',
        text = 'Search PoE Wiki',
        name = 'search';
      switcher( action, logo, text, name );
    }
    if ( down[ 38 ] && down[ 39 ] ) {
      var action = 'https://youtube.com/results',
        logo = 'youtube.svg',
        text = 'Search YouTube',
        name = 'search_query';
      switcher( action, logo, text, name );
    }
    if ( down[ 37 ] && down[ 39 ] && down[ 40 ] ) {
      var action = 'https://google.com/search',
        logo = 'google.svg',
        text = 'Search Google',
        name = 'q';
      switcher( action, logo, text, name );
    }
    down[ e.keyCode ] = false;
  } );

  lastfm();

  console.log( "Built By" );
  console.log(
    "%cMarko Bajlovic",
    "background-color:#fff;color:#0b0b0b;padding:0.5em 1em;font-weight:900;line-height:1.5em;font-size:2em;"
  );
  console.log( "Build Version: 1.0.28" );

} );
