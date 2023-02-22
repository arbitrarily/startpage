(function (root, $) {
  "use strict";

  var start = {

    // Version Number
    version: "1.10.13",

    // Touch Events
    touch: "onontouchend" in document.documentElement ? "ontouchend" : "click",

    // Keyboard Variable
    down: {},

    // Count for Arrays
    count: 0,

    // Animation Time
    animation_time: 333,

    // Pageviews
    pageviews: false,

    // Wallet Balance
    balance: false,

    // Audio
    audio: new Audio(),

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
        "name": "hl=en&sl=en&tl=es&text",
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

      // Background Image
      this.background();

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

      // Output into Console
      this.console_log();

      // Focus Search
      this.click_focus_search();

      // Animation on Leave
      this.bye_bye();

      // Console Log Font Family
      this.font_family();

      // IP
      this.ip();
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
      // Notification
      start.notifications("<span>Search Switched to </span> " + search['type']);
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
            // Notification
            start.notifications("<span>Feed Switched to</span> Instapaper");
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
          // Lexichronic
          if (start.down[54]) { // shift + 6
            start.lexichronic();
          }
          // Path of Exile Characters
          if (start.down[55]) { // shift + 7
            start.poe();
          }
          // Podcasts
          if (start.down[56]) { // shift + 8
            start.podcasts();
          }
          // Fast Podcast Forward
          if (start.down[39]) { // shift + ➡
            start.podcast_fast_forward();
          }
          // Fast Podcast Forward
          if (start.down[37]) { // shift + ⬅
            start.podcast_rewind();
          }
          // Faster Podcast Playback
          if (start.down[38]) { // shift + ⬆
            start.podcast_more_speed();
          }
          // Slower Podcast Playback
          if (start.down[40]) { // shift + ⬇
            start.podcast_less_speed();
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
          // Toggle Cursor - Backspace
          if (start.down[8]) {
            start.toggle_cursor();
          }
          // Resize News - Right Bracket
          if (start.down[221]) {
            start.resize_news();
          }
          // Play/Pause Podcasts - "z" Key
          if (start.down[90]) {
            start.podcast_toggle();
          }
          // Update LastFM - "x" Key
          if (start.down[88]) {
            start.lastfm();
            // Notification
            start.notifications("Fetched <span>Last.fm</span>");
          }
          // Hide Animated Background - "c" Key
          if (start.down[67]) {
            start.toggle_background();
          }
          // Refresh Background Image - "v" Key
          if (start.down[86]) {
            start.background();
          }
          // Blur - "b" Key
          if (start.down[66]) {
            start.toggle_blur();
          }
          // Invert Colors - "n" Key
          if (start.down[78]) {
            start.invert();
          }
        }
      }).keyup(function (e) {
        // Reset Key on Key Up
        start.down[e.keyCode] = false;
      });
    },

    // Notifications
    notifications: function (text) {
      // prevent stacking notifications
      const noti = $(".notifications");
      noti.removeClass("hidden").html(text);
      setTimeout(function () {
        noti.addClass("hidden");
      }, start.animation_time * 6);
    },

    // Invert Colors
    invert: function () {
      $("body").toggleClass("invert");
      // Notification
      const status = ($("body").hasClass("invert")) ? " Light" : " Dark";
      start.notifications("<span>Toggled</span> " + status + " <span>Mode</span>");
    },

    // Load Background Image
    background: function () {
      const bg = $(".background-image");
      const num = start.numb(1, 291).toString().padStart(4, "0").toString();
      bg.addClass("hidden");
      setTimeout(function () {
        bg.attr("src", "https://marko.tech/media/art/" + num + ".png");
        bg.one("load", function () {
          bg.removeClass("hidden");
        }).each(function () {
          if (this.complete) $(this).trigger('load');
        });
      }, start.animation_time * 2);
      // Notification
      start.notifications("<span>New</span> Background #" + num + " <span>Loaded</span>");
    },

    // Toggle Blur on Background Image
    toggle_blur: function () {
      $(".background-image").toggleClass("deblur");
      // Notification
      const status = ($(".background-image").hasClass("deblur")) ? " Off" : " On";
      start.notifications("<span>Blur on Background</span>" + status);
    },

    // Toggle Animated Background
    toggle_background: function () {
      ($(".background").hasClass("hidden")) ? $(".background").toggleClass("hidden").html(start.background_html) : $(".background").toggleClass("hidden").html("");
      // Notification
      const status = ($(".background").hasClass("hidden")) ? " Off" : " On";
      start.notifications("<span>Background Animation</span>" + status);
    },

    // Toggle Animated Desktop - Don't Render on Super Large Screens
    toggle_background_large_screens: function () {
      $(window).bind("resize load", function () {
        const bg = $(".background");
        if (window.matchMedia("(min-width: 1024px)").matches) {
          if (!bg.hasClass("hidden")) bg.addClass("hidden").html("");
        } else {
          if (bg.hasClass("hidden")) bg.removeClass("hidden").html(start.background_html);
          // Notification
          start.notifications("Toggled <span>Animated Background</span>");
        }
      });
    },

    // IP
    ip: function () {
      fetch('https://ipinfo.io/json?token=' + start.conf.ipKey)
        .then(res => res.json())
        .then(res => res)
        .then(ip => {
          const region = (ip.country === "US") ? ip.region : ip.country;
          const msg = ip.ip + " - " + ip.city + ", " + region;
          $(".ip-replace").text(msg);
          $(".ip div").addClass("shown");
          console.log("\n");
          console.log("IPv4          : " + msg);
        }).catch(error => {
          $(".ip").hide();
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
              $.when(start.pageviews).then(function () {
                setTimeout(function () {
                  var number_string = start.format_numb(count).trim().toString();
                  $(".songs-replace").text(number_string);
                  $(".songs").addClass("shown");
                  console.log("\n");
                  console.log("Scrobbles     : " + number_string);
                }, start.animation_time * 3);
              });
            }
            // Remap Data
            var s = song["recenttracks"]["track"].map(_map_it)[0];
            // Change Artwork
            if (start.audio.paused || !start.audio.currentTime) {
              const pod_data = {
                id: s.id,
                name: s.name,
                album: s.album,
                artist: s.artist,
                image: s.image,
                link: s.link
              }
              start.change_lastfm_artwork(pod_data);
            }
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

    // Change LastFM Artwork
    change_lastfm_artwork: function (data) {
      // Assign Data to Placeholders
      $(".lastfm__artist").text(data['artist']).attr("title", "Artist: " + data['artist']);
      $(".lastfm__song").text(data['name']).attr("title", "Song: " + data['name']);
      if (data['album'] != "") {
        $(".lastfm__album").text(" - " + data['album']).attr("title", "Album: " + data['album']);
      } else {
        $(".lastfm__album").text("");
      }
      // Album Image
      if (data['image'] != "") {
        $(".lastfm__image").attr("src", data['image']).show();
      } else {
        $(".lastfm__image").hide();
      }
      // Show Now Playing
      $(".lastfm__container").show();
      $(".lastfm__url").attr("href", data['link']).addClass("shown");
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
        // Notification
        start.notifications("<span>Feed Switched to</span> Techmeme");
      });
    },

    // NYT Home Feed
    nyt: function () {
      $.when(start.conf).then(function () {
        start.fetch_news(start.conf.nytURL);
        // Notification
        start.notifications("<span>Feed Switched to</span> New York Times");
      });
    },

    // Reddit Home Feed
    reddit: function () {
      $.when(start.conf).then(function () {
        start.fetch_news(start.conf.redditURL);
        // Notification
        start.notifications("<span>Feed Switched to</span> Reddit");
      });
    },

    // NFTs Home Feed
    nfts: function () {
      $.when(start.conf).then(function () {
        start.fetch_news(start.conf.alchemyURL);
        // Notification
        start.notifications("<span>Feed Switched to</span> NFTs");
      });
    },

    // Lexichronic Home Feed
    lexichronic: function () {
      $.when(start.conf).then(function () {
        start.fetch_news(start.conf.lexiURL);
        // Notification
        start.notifications("<span>Feed Switched to</span> Lexichronic");
      });
    },

    // Path of Exile Home Feed
    poe: function () {
      $.when(start.conf).then(function () {
        start.fetch_news(start.conf.poeURL);
        // Notification
        start.notifications("<span>Feed Switched to</span> Path of Exile");
      });
    },

    // Podcasts Home Feed
    podcasts: function () {
      $.when(start.conf).then(function () {
        start.fetch_news(start.conf.podURL);
        // Notification
        start.notifications("<span>Feed Switched to</span> Podcasts");
        // Play Podcasts
        start.play_podcast();
      });
    },

    // Play Podcast
    play_podcast: function () {
      $(document).on(start.touch, ".podcast-links li a", function (e) {
        e.preventDefault();
        const podcast = $(this);
        $(".podcasts").addClass("shown");
        if (podcast.attr("href").indexOf(".mp3") > -1) {
          start.audio.src = $(this).attr("href");
          // Play the Podcasts Slightly Faster
          start.audio.playbackRate = 1.25;
          // Stop Other Audio
          if (start.audio.playing) {
            start.audio.pause();
          }
          start.audio.play();
          // Timer
          start.podcast_time();
        }
        // Notification
        start.notifications("<span>Now Playing</span> " + $(this).text().trim().slice(0, 75) + "...");
        // Change Artwork
        const pod_data = {
          id: '',
          name: podcast.data('title'),
          album:'',
          artist: podcast.data('feed'),
          image: podcast.find("img").attr('src'),
          link: podcast.data('link')
        }
        start.change_lastfm_artwork(pod_data);
      });
      // Pause on Click of Timer
      $(document).on(start.touch, ".podcasts", function (e) {
        e.preventDefault();
        start.podcast_toggle();
      });
    },

    // Podcast Fast Forward
    podcast_rewind: function () {
      start.audio.currentTime -= 5;
      // Notification
      start.notifications("<span>Podcast Fast Forward</span> -5 seconds");
    },

    // Podcast Fast Forward
    podcast_fast_forward: function () {
      start.audio.currentTime += 15;
      // Notification
      start.notifications("<span>Podcast Fast Forward</span> +10 seconds");
    },

    // Podcast Faster Playback
    podcast_more_speed: function () {
      start.audio.playbackRate += 0.25;
      // Notification
      start.notifications("<span>Podcast Playback Rate</span> " + start.audio.playbackRate + "x");
    },

    // Podcast Slower Playback
    podcast_less_speed: function () {
      start.audio.playbackRate -= 0.25;
      // Notification
      start.notifications("<span>Podcast Playback Rate</span> " + start.audio.playbackRate + "x");
    },

    // Podcast Timer
    podcast_time: function () {
      setInterval(function () {
        const time_remaining = start.audio.duration - start.audio.currentTime;
        const minutes = Math.floor(time_remaining / 60);
        const seconds = Math.floor(time_remaining % 60);
        const padded_time = seconds < 10 ? '0' + seconds : seconds;
        // Update Time
        if (seconds) {
          $(".podcasts-replace").text(minutes + ':' + padded_time);
        }
        // When Podcast Ends
        start.audio.addEventListener("ended", function () {
          $(".podcasts-replace").text('0:00');
          $(".podcasts").removeClass("shown");
          // Notification
          start.notifications("<span>Podcast</span> Finished");
        });
      }, 500);
    },

    // Pause Podcast
    podcast_toggle: function () {
      let current_vol = start.audio.volume;
      // Determine Step Size For Fading In / Out
      let stepSize = 0.05;
      if (!start.audio.paused) {
        stepSize *= -1;
        // Notification
        start.notifications("<span>Podcast</span> Paused");
      } else {
        // Rewind 2 seconds
        start.audio.currentTime = start.audio.currentTime - 2;
        // Notification
        start.notifications("<span>Podcast</span> Playing");
      }
      // Fader
      let fader = setInterval(function () {
        // Calculate New Volume Based On Step Size
        current_vol += stepSize;
        // No weird numbers
        current_vol = Math.max(0, Math.min(1, current_vol));
        // Update Volume
        start.audio.volume = current_vol;
        // Pause
        if (current_vol <= 0) {
          start.audio.pause();
        }
        // Play
        if (current_vol >= 1) {
          start.audio.play();
        }
        // Stop Fader
        if (current_vol <= 0 || current_vol >= 1) {
          clearInterval(fader);
        }
      }, 1000 / 25);
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
                start.pageviews = number.trim().toString();
                $(".counter-replace").text(start.pageviews);
                $(".counter").addClass("shown");
                console.log("\n");
                console.log("Page Views    : " + start.pageviews);
              }, start.animation_time * 2);
            }
          })
          .catch(function (err) {
            $(".counter").remove();
            start.pageviews = true;
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
                $(".wallet").addClass("shown");
              }, start.animation_time);
              // Console Log Details
              console.log("\n");
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
      // Focus Search if Clicking Anything Not a Link or Input
      $(document).on(this.touch, function (e) {
        if (e.target.tagName !== "A" && e.target.tagName !== "INPUT") {
          start.focus_search();
        }
      });
      // Focus Out Remove Styling for Search
      $("#search").on("focusout", function () {
        $("form").removeClass("focus");
      });
    },

    // Reset Mouse Cursor
    toggle_cursor: function () {
      $("body").toggleClass("vaal");
      // Notification
      const status = ($("body").hasClass("vaal")) ? " On" : " Off";
      start.notifications("<span>Cursor Toggled</span>" + status);
    },

    // Resize
    resize_news: function () {
      // Keep Both Large Classes for Smoothness
      $(".cell.small-12.large-4.instapaper-links.shown").toggleClass("large-6");
      // Notification
      const status = ($(".instapaper-links").hasClass("large-6")) ? " Large" : " Default";
      start.notifications("<span>News Resized</span>" + status);
    },

    // Animation on Leave
    bye_bye: function () {
      $(window).on("beforeunload", function () {
        $("body").css("opacity", 0);
      });
    },

    // Console Log Attribution
    console_log: function () {
      console.log("Built By");
      console.log(
        "%cMarko Bajlovic",
        "background-color:#fff;color:#0b0b0b;padding:0.85em 0.5em;font-weight:900;line-height:1.5em;font-size:2em;"
      );
      console.log("Build Version : " + this.version);
    },

    // Font Family
    font_family: function () {
      $.when(start.conf).then(function () {
        console.log("\n");
        console.log("Font Family   : " + $("body").css("font-family"));
      });
    }

  };

  // Init
  start.load_config();

  // Focus on Load
  $(window).on("load", function () {
    start.focus_search();
  });

})(this, jQuery);
