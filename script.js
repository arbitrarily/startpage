( function( root, $ ) {
  "use strict";

  var start = {

    // Version Number
    version: "1.7.4",

    // Touch Events
    touch: "onontouchend" in document.documentElement ? "ontouchend" : "click",

    // Keyboard Variable
    down: {},

    // Wallet Balance
    balance: false,

    // Init
    init: function() {
      // Pageview Counter
      this.counter();

      // Wallet Value
      this.wallet();

      // Search Change on Click
      this.change_search();

      // Get Last FM Now Playing
      this.lastfm();

      // Rerun LastFM Script Every 3 Minutes
      setInterval( start.lastfm, 1000 * 60 * 3 )

      // Get Latest Instapaper Articles
      this.instapaper();

      // Key Listeners
      this.key_listener();

      // Set Background Gradient
      this.background_gradient();

      // Output into Console
      this.console_log();

      // Focus Search
      this.focus_search();
      this.click_focus_search();

      // Animation on Leave
      this.bye_bye();
    },

    // Timestamp for Breaking Cached URLs
    timestamp: ~~( new Date().getTime() / 1000 ),

    // Random Number in a Range
    numb: function( min, max ) {
      return Math.floor( Math.random() * ( max - min + 1 ) + min );
    },

    // Prettify Numbers
    format_numb: function(numb) {
      return numb.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    },

    // Focus Search
    focus_search: function() {
      $( "#search" ).focus();
      $( "form" ).addClass( "focus" );
    },

    // Search Switcher
    switcher: function( action, logo, text, name, type ) {
      $( "#searchform" ).attr( "action", action );
      $( ".search" ).attr( "src", logo );
      $( "#search" ).attr( "placeholder", text )
        .attr( "name", name )
        .attr( "data-type", type )
        .focus();
      $( "form" ).removeClass( "focus" );
    },

    // Function Triggers by Keyboard Combos
    key_listener: function( e ) {
      $(document).keydown(function (e) {
        // Key Down
        start.down[e.keyCode] = true;
        // Left Shift
        if (start.down[16]) {
          e.preventDefault();
          // Instapaper
          if (start.down[49]) { // shift + 1
            start.instapaper();
          }
          // Techmeme
          if (start.down[50]) { // shift + 2
            start.techmeme();
          }
          // New York Times
          if (start.down[51]) { // shift + 3
            start.nyt();
          }
          // Reddit
          if (start.down[52]) { // shift + 4
            start.reddit();
          }
        }
        // Alt/Option
        if (start.down[18]) {
          e.preventDefault();
          // Alt Modifiers
          action = false;
          if (start.down[49]) { // alt + 1
            var action = "https://duckduckgo.com",
              logo = "icons/icon__duckduckgo.svg",
              text = "Search DuckDuckGo",
              name = "q",
              type = "duckduckgo";
          } else if (start.down[50]) { // alt + 2
            var action = "https://translate.google.com/",
              logo = "icons/icon__translate.svg",
              text = "Translate",
              name = "hl=en&sl=en&tl=es&text=",
              type = "translate";
          } else if (start.down[51]) { // alt + 3
            var action = "https://youtube.com/results",
              logo = "icons/icon__youtube.svg",
              text = "Search YouTube",
              name = "search_query",
              type = "youtube";
          } else if (start.down[52]) { // alt + 4
            var action = "https://beta.music.apple.com/us/search",
              logo = "icons/icon__applemusic.svg",
              text = "Search Apple Music",
              name = "term",
              type = "applemusic";
          } else if (start.down[53]) { // alt + 5
            var action = "https://www.last.fm/search",
              logo = "icons/icon__lastfm.svg",
              text = "Search LastFM",
              name = "q",
              type = "lastfm";
          } else if (start.down[54]) { // alt + 6
            var action = "https://twitter.com/search",
              logo = "icons/icon__twitter.svg",
              text = "Search Twitter",
              name = "q",
              type = "twitter";
          } else if (start.down[55]) { // alt + 7
            var action = "https://news.google.com/search",
              logo = "icons/icon__googlenews.svg",
              text = "Search Google News",
              name = "q",
              type = "googlenews";
          } else if (start.down[56]) { // alt + 8
            var action = "https://github.com/search",
              logo = "icons/icon__github.svg",
              text = "Search Github",
              name = "q",
              type = "github";
          } else if (start.down[57]) { // alt + 9
            var action = "https://www.midjourney.com/app/users/383432442448576517",
              logo = "icons/icon__midjourney.svg",
              text = "Search MidJourney",
              name = "search",
              type = "midjourney";
          } else if (start.down[173]) { // alt + -
            var action = "https://www.poewiki.net/index.php",
              logo = "icons/icon__poe.png",
              text = "Search PoE Wiki",
              name = "poewiki",
              type = "poewiki";
          } else if (start.down[48]) { // alt + 0
            var action = "https://google.com/search",
              logo = "icons/icon__google.svg",
              text = "Search Google",
              name = "q",
              type = "google";
          }
          if (action) {
            // Switch Search
            start.switcher(action, logo, text, name, type);
          }
          // Backspace
          if (start.down[8]) {
            e.preventDefault();
            // Toggle Cursor
            start.toggle_cursor();
          }
          // Backslash
          if (start.down[220]) {
            e.preventDefault();
            // Update LastFM
            start.lastfm();
          }
          // Right Bracket
          if (start.down[221]) {
            e.preventDefault();
            // Resize News
            start.resize_news();
          }
        }
      }).keyup(function(e) {
        // Reset Key on Key Up
        start.down[e.keyCode] = false;
      });
    },

    // LastFM Song
    lastfm: function() {
      $.getJSON( "./conf.json", function( d ) {
        fetch( d.lastFMURL )
          .then( res => res.json() )
          .then( res => res )
          .then( song => {
            var count = song["recenttracks"]["@attr"]["total"];
            if ( count ) {
              setTimeout( function() {
                var number_string = start.format_numb(count).trim().toString();
                $( ".songs-replace" ).text( number_string );
                $( ".songs" ).addClass( "shown" ).attr( "title", "Songs Scrobbled: " + number_string );
                console.log( "Scrobbles     : " + number_string );
              }, 1000 );
            }
            // Remap Data
            var s = song[ "recenttracks" ][ "track" ].map( _map_it )[ 0 ];
            // Assign Data to Placeholders
            $( ".lastfm__artist" ).text( s.artist ).attr( "title", "Artist: " + s.artist );
            $( ".lastfm__song" ).text( s.name ).attr( "title", "Song: " + s.name );
            $( ".lastfm__album" ).text( s.album ).attr( "title", "Album: " + s.album );
            // Album Image
            if ( s.image != "" ) {
              $( ".lastfm__image" ).attr( "src", s.image ).show();
            } else {
              $( ".lastfm__image" ).hide();
            }
            // Show Now Playing
            $( ".lastfm__container" ).show();
            $( ".lastfm__url" ).attr( "href", s.link ).addClass( "shown" );
          } ).catch( error => {
            $( ".lastfm__container" ).hide();
          } );

        // Format Output
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
      } );
    },

    // Instapaper Home Feed
    instapaper: function() {
      $.getJSON( "./conf.json", function( d ) {
        let target = ($(".instapaper-links").length) ? $(".instapaper-links") : $(".instapaper-replace");
        fetch( d.instapaperURL + '?t=' + start.timestamp )
          .then( function( response ) {
            target.css( "opacity", 0 );
            return response.text();
          } )
          .then( function( html ) {
            if ( html ) {
              setTimeout( function() {
                target.replaceWith( html );
              }, 600 );
              setTimeout( function() {
                $( ".instapaper-links" ).addClass("shown");
              }, 1000 );
            }
          } )
          .catch( function( err ) {
            target.removeClass( "large-4" ).addClass( "large-auto" );
          } )
      } );
    },

    // Techmeme Home Feed
    techmeme: function() {
      $.getJSON( "./conf.json", function( d ) {
        fetch( d.techmemeURL + '?t=' + start.timestamp )
          .then( function( response ) {
            $( ".instapaper-links" ).removeClass('shown');
            return response.text();
          } )
          .then( function( html ) {
            if ( html ) {
              setTimeout( function() {
                $( ".instapaper-links" ).replaceWith( html );
              }, 600 );
              setTimeout( function() {
                $( ".instapaper-links" ).addClass("shown");
              }, 1000 );
            }
          } )
          .catch( function( err ) {
            $( ".instapaper-links" ).removeClass( "large-4" ).addClass( "large-auto" );
          } );
      } );
    },

    // NYT Home Feed
    nyt: function() {
      $.getJSON( "./conf.json", function( d ) {
        fetch( d.nytURL + '?t=' + start.timestamp )
          .then( function( response ) {
            $( ".instapaper-links" ).removeClass('shown');
            return response.text();
          } )
          .then( function( html ) {
            if ( html ) {
              setTimeout( function() {
                $( ".instapaper-links" ).replaceWith( html );
              }, 600 );
              setTimeout( function() {
                $( ".instapaper-links" ).addClass("shown");
              }, 1000 );
            }
          } )
          .catch( function( err ) {
            $( ".instapaper-links" ).removeClass( "large-4" ).addClass( "large-auto" );
          } );
      } );
    },

    // Reddit Home Feed
    reddit: function () {
      $.getJSON("./conf.json", function (d) {
        fetch(d.redditURL + '?t=' + start.timestamp)
          .then(function (response) {
            $(".instapaper-links").removeClass('shown');
            return response.text();
          })
          .then(function (html) {
            if (html) {
              setTimeout(function () {
                $(".instapaper-links").replaceWith(html);
              }, 600);
              setTimeout(function () {
                $(".instapaper-links").addClass("shown");
              }, 1000);
            }
          })
          .catch(function (err) {
            $(".instapaper-links").removeClass("large-4").addClass("large-auto");
          });
      });
    },

    // Page View Counter
    counter: function() {
      $.getJSON( "./conf.json", function( d ) {
        fetch( d.counterURL + '?t=' + start.timestamp )
          .then( function( response ) {
            return response.text();
          } )
          .then( function( number ) {
            if ( number ) {
              setTimeout( function() {
                var number_string = number.trim().toString();
                $( ".counter-replace" ).text( number_string );
                $( ".counter" ).addClass( "shown" ).attr( "title", "Views: " + number_string );
                console.log( "---" );
                console.log( "Page Views    : " + number_string );
              }, 1000 );
            }
          } )
          .catch( function( err ) {
            $( ".counter" ).remove();
          } );
      } );
    },

    // Primary Wallet Status
    wallet: function() {
      $.getJSON( "./conf.json", function( d ) {
        fetch( d.ethplorerURL + '?t=' + start.timestamp )
          .then( function( response ) {
            return response.json();
          } )
          .then( function( response ) {
            start.balance = response[ "ETH" ][ "totalIn" ].toString();
            var balance_formatted = ( response[ "ETH" ][ "totalIn" ] ).toFixed( 3 );
            var balance_diff = response[ "ETH" ][ "price" ][ "diff" ];
            var formatted = ( balance_diff > 0 ? " (+" + balance_diff + "%)" : " (" + balance_diff + "%)" );
            if ( start.balance ) {
              // Show After Delay
              setTimeout( function() {
                $( ".wallet-replace" ).text( ( balance_formatted + formatted ).toString() );
                $( ".wallet" ).addClass( "shown" ).attr( "title", "Ξ " + start.balance + formatted );
              }, 500 );
              // Console Log Details
              console.log( "---" );
              console.log( "Balance       : " + "Ξ " + start.balance.toString() );
              console.log( "1 Day Diff    : " + response[ "ETH" ][ "price" ][ "diff" ].toString() + "%" );
              console.log( "7 Day Diff    : " + response[ "ETH" ][ "price" ][ "diff7d" ].toString() + "%" );
              console.log( "30 Day Diff   : " + response[ "ETH" ][ "price" ][ "diff30d" ].toString() + "%" );
            }
          } )
          .catch( function( err ) {
            $( ".wallet" ).remove();
          } );
      } );
    },

    // Change Search on Click
    change_search: function() {
      // Click Search to Toggle Targeting
      $( "#searchform label" ).on( this.touch, function() {
        var s = $( "#search" );
        if ( s.attr( "data-type" ) === "google" ) {
          var action = "https://duckduckgo.com",
            logo = "icons/icon__duckduckgo.svg",
            text = "Search DuckDuckGo",
            name = "q",
            type = "duckduckgo";
        } else if ( s.attr( "data-type" ) === "duckduckgo" ) {
          var action = "https://translate.google.com/",
            logo = "icons/icon__translate.svg",
            text = "Translate",
            name = "hl=en&sl=en&tl=es&text=",
            type = "translate";
        } else if ( s.attr( "data-type" ) === "translate" ) {
          var action = "https://youtube.com/results",
            logo = "icons/icon__youtube.svg",
            text = "Search YouTube",
            name = "search_query",
            type = "youtube";
        } else if ( s.attr( "data-type" ) === "youtube" ) {
          var action = "https://beta.music.apple.com/us/search",
            logo = "icons/icon__applemusic.svg",
            text = "Search Apple Music",
            name = "term",
            type = "applemusic";
        } else if ( s.attr( "data-type" ) === "applemusic" ) {
          var action = "https://www.last.fm/search",
            logo = "icons/icon__lastfm.svg",
            text = "Search LastFM",
            name = "q",
            type = "lastfm";
        } else if ( s.attr( "data-type" ) === "lastfm" ) {
          var action = "https://twitter.com/search",
            logo = "icons/icon__twitter.svg",
            text = "Search Twitter",
            name = "q",
            type = "twitter";
        } else if ( s.attr( "data-type" ) === "twitter" ) {
          var action = "https://news.google.com/search",
            logo = "icons/icon__googlenews.svg",
            text = "Search Google News",
            name = "q",
            type = "googlenews";
        } else if ( s.attr( "data-type" ) === "googlenews" ) {
          var action = "https://github.com/search",
            logo = "icons/icon__github.svg",
            text = "Search Github",
            name = "q",
            type = "github";
        } else if ( s.attr( "data-type" ) === "github" ) {
          var action = "https://www.midjourney.com/app/users/383432442448576517",
            logo = "icons/icon__midjourney.svg",
            text = "Search MidJourney",
            name = "search",
            type = "midjourney";
        } else if ( s.attr( "data-type" ) === "midjourney" ) {
          var action = "https://www.poewiki.net/index.php",
            logo = "icons/icon__poe.png",
            text = "Search PoE Wiki",
            name = "poewiki",
            type = "poewiki";
        } else {
          var action = "https://google.com/search",
            logo = "icons/icon__google.svg",
            text = "Search Google",
            name = "q",
            type = "google";
        }
        // Switch Search
        start.switcher( action, logo, text, name, type );
      } );
    },

    // Focus/DeFocus Search
    click_focus_search: function() {
      // Focus Search if Clicking Anytning Not a Link or Input
      $( document ).on( this.touch, function( e ) {
        if ( e.target.tagName !== "A" || e.target.tagName !== "INPUT" ) {
          start.focus_search();
        }
      } );
      // Focus Out Remove Styling for Search
      $( "#search" ).on( "focusout", function() {
        $( "form" ).removeClass( "focus" );
      } );
    },

    // Randomize Background Gradient
    background_gradient: function() {
      // Randomize Background Gradient
      $( "body" ).css( {
        "background": "radial-gradient(ellipse at " + this.numb( 1, 75 ) + "% " + this.numb( 90, 150 ) + "%, rgb(27, 27, 24) 0%, #0d0d0d 90%)"
      } );
    },

    // Reset Mouse Cursor
    toggle_cursor: function() {
      $( "body" ).toggleClass( "vaal" );
    },

    // Resize
    resize_news: function() {
      // Keep Both Large Classes for Smoothness
      $( ".cell.small-12.large-4.instapaper-links.shown" ).toggleClass( "large-6" );
    },

    // Animation on Leave
    bye_bye: function() {
      $( window ).on( "beforeunload", function() {
        $( "body" ).css( "opacity", 0 );
      } );
    },

    console_log: function() {
      // Console Log Attribution
      console.log( "Built By" );
      console.log(
        "%cMarko Bajlovic",
        "background-color:#fff;color:#0b0b0b;padding:0.85em 0.5em;font-weight:900;line-height:1.5em;font-size:2em;"
      );
      console.log( "Build Version : " + this.version );
    }

  };

  // Init
  start.init();

} )( this, jQuery );
