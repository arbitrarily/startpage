(function (root, $) {
  "use strict";

  var start = {

    // Version Number
    version: "1.8.7",

    // Touch Events
    touch: "onontouchend" in document.documentElement ? "ontouchend" : "click",

    // Keyboard Variable
    down: {},

    // Count for Arrays
    count: 0,

    // Wallet Balance
    balance: false,

    // Config
    conf: false,

    // Search Inputs
    searches: [
      {
        "action": "https://www.poewiki.net/index.php",
        "logo": "icons/icon__poe.png",
        "text": "Search PoE Wiki",
        "name": "search",
        "type": "poewiki"
      },
      {
        "action": "https://youtube.com/results",
        "logo": "icons/icon__youtube.svg",
        "text": "Search YouTube",
        "name": "search_query",
        "type": "youtube"
      },
      {
        "action": "https://duckduckgo.com",
        "logo": "icons/icon__duckduckgo.svg",
        "text": "Search DuckDuckGo",
        "name": "q",
        "type": "duckduckgo"
      },
      {
        "action": "https://translate.google.com/",
        "logo": "icons/icon__translate.svg",
        "text": "Translate",
        "name": "hl=en&sl=en&tl=es&text=",
        "type": "translate"
      },
      {
        "action": "https://beta.music.apple.com/us/search",
        "logo": "icons/icon__applemusic.svg",
        "text": "Search Apple Music",
        "name": "term",
        "type": "applemusic"
      },
      {
        "action": "https://www.last.fm/search",
        "logo": "icons/icon__lastfm.svg",
        "text": "Search LastFM",
        "name": "q",
        "type": "lastfm"
      },
      {
        "action": "https://twitter.com/search",
        "logo": "icons/icon__twitter.svg",
        "text": "Search Twitter",
        "name": "q",
        "type": "twitter"
      },
      {
        "action": "https://news.google.com/search",
        "logo": "icons/icon__googlenews.svg",
        "text": "Search Google News",
        "name": "q",
        "type": "googlenews"
      },
      {
        "action": "https://github.com/search",
        "logo": "icons/icon__github.svg",
        "text": "Search Github",
        "name": "q",
        "type": "github"
      },
      {
        "action": "https://www.midjourney.com/app/users/383432442448576517",
        "logo": "icons/icon__midjourney.svg",
        "text": "Search MidJourney",
        "name": "search",
        "type": "midjourney"
      },
      {
        "action": "https://google.com/search",
        "logo": "icons/icon__google.svg",
        "text": "Search Google",
        "name": "q",
        "type": "google"
      }
    ],

    // Init
    init: function () {
      // Pageview Counter
      this.counter();

      // Background Resize
      this.toggle_background_large_screens();

      // Wallet Value
      this.wallet();

      // Search Change on Click
      this.change_search();

      // Get Last FM Now Playing
      this.lastfm();

      // Rerun LastFM Script Every 3 Minutes
      setInterval(start.lastfm, 1000 * 60 * 3)

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

    // Load Config, then Init
    load_config: function () {
      $.getJSON("./conf.json", function (d) {
        // Store Config
        start.conf = d;
        // Init
        $.when(start.conf).then(function () {
          start.init();
        });
      }).fail(function () {
        $(".instapaper-links").addClass("shown");
      });
    },

    // Timestamp for Breaking Cached URLs
    timestamp: ~~(new Date().getTime() / 1000),

    // Background HTML
    background_html: $(".background").html(),

    // Random Number in a Range
    numb: function (min, max) {
      return Math.floor(Math.random() * (max - min + 1) + min);
    },

    // Prettify Numbers
    format_numb: function (numb) {
      return numb.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    },

    // Focus Search
    focus_search: function () {
      $("#search").focus();
      $("form").addClass("focus");
    },

    // Search Switcher
    switcher: function (search) {
      const action = search['action'],
        logo = search['logo'],
        text = search['text'],
        name = search['name'],
        type = search['type'];
      $("#searchform").attr("action", action);
      $(".search").attr("src", logo);
      $("#search").attr("placeholder", text)
        .attr("name", name)
        .attr("data-type", type)
        .focus();
      $("form").removeClass("focus");
    },

    // Function Triggers by Keyboard Combos
    key_listener: function (e) {
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
          // NFTs
          if (start.down[53]) { // shift + 5
            start.nfts();
          }
        }
        // Alt/Option
        if (start.down[18]) {
          e.preventDefault();
          let search = false;
          // Alt Modifiers
          if (start.down[49]) { // alt + 1
            search = start.searches[0];
            start.count = 0;
          } else if (start.down[50]) { // alt + 2
            search = start.searches[1];
            start.count = 1;
          } else if (start.down[51]) { // alt + 3
            search = start.searches[2];
            start.count = 2;
          } else if (start.down[52]) { // alt + 4
            search = start.searches[3];
            start.count = 3;
          } else if (start.down[53]) { // alt + 5
            search = start.searches[4];
            start.count = 4;
          } else if (start.down[54]) { // alt + 6
            search = start.searches[5];
            start.count = 5;
          } else if (start.down[55]) { // alt + 7
            search = start.searches[6];
            start.count = 6;
          } else if (start.down[56]) { // alt + 8
            search = start.searches[7];
            start.count = 7;
          } else if (start.down[57]) { // alt + 9
            search = start.searches[8];
            start.count = 8;
          } else if (start.down[173]) { // alt + -
            search = start.searches[9];
            start.count = 9;
          } else if (start.down[48]) { // alt + 0
            search = start.searches[10];
            start.count = 10;
          }
          // Switch Search
          if (search) {
            start.switcher(search);
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
          // Left Bracket
          if (start.down[219]) {
            e.preventDefault();
            // Hide Animated Background
            start.toggle_background();
          }
        }
      }).keyup(function (e) {
        // Reset Key on Key Up
        start.down[e.keyCode] = false;
      });
    },

    // Toggle Animated Background
    toggle_background: function () {
      ($(".background").hasClass("hidden")) ? $(".background").toggleClass("hidden").html(start.background_html) : $(".background").toggleClass("hidden").html("");
    },

    // Toggle Animated Desktop - Don't Render on Super Large Screens
    toggle_background_large_screens: function () {
      $(window).bind("resize load", function () {
        const bg = $(".background");
        if (window.matchMedia("(min-width: 1440px)").matches) {
          if (!bg.hasClass("hidden")) bg.addClass("hidden").html("");
        } else {
          if (bg.hasClass("hidden")) bg.removeClass("hidden").html(start.background_html);
        }
      });
    },

    // LastFM Song
    lastfm: function () {
      $.when(start.conf).then(function () {
        fetch(start.conf.lastFMURL)
          .then(res => res.json())
          .then(res => res)
          .then(song => {
            var count = song["recenttracks"]["@attr"]["total"];
            if (count) {
              setTimeout(function () {
                var number_string = start.format_numb(count).trim().toString();
                $(".songs-replace").text(number_string);
                $(".songs").addClass("shown").attr("title", "Songs Scrobbled: " + number_string);
                console.log("Scrobbles     : " + number_string);
              }, 1000);
            }
            // Remap Data
            var s = song["recenttracks"]["track"].map(_map_it)[0];
            // Assign Data to Placeholders
            $(".lastfm__artist").text(s.artist).attr("title", "Artist: " + s.artist);
            $(".lastfm__song").text(s.name).attr("title", "Song: " + s.name);
            $(".lastfm__album").text(s.album).attr("title", "Album: " + s.album);
            // Album Image
            if (s.image != "") {
              $(".lastfm__image").attr("src", s.image).show();
            } else {
              $(".lastfm__image").hide();
            }
            // Show Now Playing
            $(".lastfm__container").show();
            $(".lastfm__url").attr("href", s.link).addClass("shown");
          }).catch(error => {
            $(".lastfm__container").hide();
          });

        // Format Output
        function _map_it(song) {
          return {
            id: song.mbid,
            name: song.name,
            album: song.album["#text"],
            artist: song.artist["#text"],
            image: song.image[3]["#text"],
            link: song.url
          }
        }
      });
    },

    // Replace News
    fetch_news: function (url) {
      fetch(url + '?t=' + start.timestamp)
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
    },

    // Instapaper Home Feed
    instapaper: function () {
      $.when(start.conf).then(function () {
        start.fetch_news(start.conf.instapaperURL);
      });
    },

    // Techmeme Home Feed
    techmeme: function () {
      $.when(start.conf).then(function () {
        start.fetch_news(start.conf.techmemeURL);
      });
    },

    // NYT Home Feed
    nyt: function () {
      $.when(start.conf).then(function () {
        start.fetch_news(start.conf.nytURL);
      });
    },

    // Reddit Home Feed
    reddit: function () {
      $.when(start.conf).then(function () {
        start.fetch_news(start.conf.redditURL);
      });
    },

    // NFTs Home Feed
    nfts: function () {
      $.when(start.conf).then(function () {
        start.fetch_news(start.conf.alchemyURL);
      });
    },

    // Page View Counter
    counter: function () {
      $.when(start.conf).then(function () {
        fetch(start.conf.counterURL + '?t=' + start.timestamp)
          .then(function (response) {
            return response.text();
          })
          .then(function (number) {
            if (number) {
              setTimeout(function () {
                var number_string = number.trim().toString();
                $(".counter-replace").text(number_string);
                $(".counter").addClass("shown").attr("title", "Views: " + number_string);
                console.log("---");
                console.log("Page Views    : " + number_string);
              }, 1000);
            }
          })
          .catch(function (err) {
            $(".counter").remove();
          });
      });
    },

    // Primary Wallet Status
    wallet: function () {
      $.when(start.conf).then(function () {
        fetch(start.conf.ethplorerURL + '?t=' + start.timestamp)
          .then(function (response) {
            return response.json();
          })
          .then(function (response) {
            start.balance = response["ETH"]["totalIn"].toString();
            var balance_formatted = (response["ETH"]["totalIn"]).toFixed(3);
            var balance_diff = response["ETH"]["price"]["diff"];
            var formatted = (balance_diff > 0 ? " (+" + balance_diff + "%)" : " (" + balance_diff + "%)");
            if (start.balance) {
              // Show After Delay
              setTimeout(function () {
                $(".wallet-replace").text((balance_formatted + formatted).toString());
                $(".wallet").addClass("shown").attr("title", "Ξ " + start.balance + formatted);
              }, 500);
              // Console Log Details
              console.log("---");
              console.log("Balance       : " + "Ξ " + start.balance.toString());
              console.log("1 Day Diff    : " + response["ETH"]["price"]["diff"].toString() + "%");
              console.log("7 Day Diff    : " + response["ETH"]["price"]["diff7d"].toString() + "%");
              console.log("30 Day Diff   : " + response["ETH"]["price"]["diff30d"].toString() + "%");
            }
          })
          .catch(function (err) {
            $(".wallet").remove();
          });
      });
    },

    // Change Search on Click
    change_search: function () {
      // Click Search to Toggle Targeting
      $("#searchform label").on(this.touch, function () {
        var s = $("#search");
        if (start.count < start.searches.length - 1) {
          start.count++;
        } else {
          start.count = 0;
        }
        // Switch Search
        start.switcher(start.searches[start.count]);
      });
    },

    // Focus/DeFocus Search
    click_focus_search: function () {
      // Focus Search if Clicking Anytning Not a Link or Input
      $(document).on(this.touch, function (e) {
        if (e.target.tagName !== "A" || e.target.tagName !== "INPUT") {
          start.focus_search();
        }
      });
      // Focus Out Remove Styling for Search
      $("#search").on("focusout", function () {
        $("form").removeClass("focus");
      });
    },

    // Randomize Background Gradient
    background_gradient: function () {
      // Randomize Background Gradient
      $("body").css({
        "background": "radial-gradient(ellipse at " + this.numb(1, 75) + "% " + this.numb(90, 150) + "%, rgb(27, 27, 24) 0%, #0d0d0d 90%)"
      });
    },

    // Reset Mouse Cursor
    toggle_cursor: function () {
      $("body").toggleClass("vaal");
    },

    // Resize
    resize_news: function () {
      // Keep Both Large Classes for Smoothness
      $(".cell.small-12.large-4.instapaper-links.shown").toggleClass("large-6");
    },

    // Animation on Leave
    bye_bye: function () {
      $(window).on("beforeunload", function () {
        $("body").css("opacity", 0);
      });
    },

    console_log: function () {
      // Console Log Attribution
      console.log("Built By");
      console.log(
        "%cMarko Bajlovic",
        "background-color:#fff;color:#0b0b0b;padding:0.85em 0.5em;font-weight:900;line-height:1.5em;font-size:2em;"
      );
      console.log("Build Version : " + this.version);
    }

  };

  // Init
  start.load_config();

})(this, jQuery);
