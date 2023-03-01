(function (root, $) {
  "use strict";

  var start = {

    // Version Number
    version: "1.10.44",

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

    // Shared Class Names
    s: "shown",
    h: "hidden",

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

      // Key Listeners
      this.key_listener();

      // Background Image
      this.background();

      // Background Resize
      this.toggle_background_large_screens();

      // Wallet Value
      this.wallet();

      // Get Last FM Now Playing
      this.lastfm();
      setInterval(start.lastfm, 1000 * 60 * 3)

      // Get Latest Instapaper Articles
      this.instapaper(true);

      // Output into Console
      this.console_log();

      // Focus Search
      this.click_focus_search();

      // Console Log Font Family
      this.font_family();

      // Search Change on Click
      this.change_search();

      // Animation on Leave
      this.bye_bye();

      // IP
      this.ip();
    },

    // Load Config, then Init
    load_config: function () {
      $.getJSON("./conf.json", function (conf) {
        // Store Config
        start.conf = conf;
        // Init
        $.when(start.conf).then(start.init());
      }).fail(function () {
        $(".instapaper-links").addClass(start.s);
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
      $(document).find("#search").focus().addClass("focus");
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
          // Instapaper - shift + 1
          if (start.down[49]) start.instapaper();
          // News - shift + 2
          if (start.down[50]) start.news();
          // New York Times - shift + 3
          if (start.down[51]) start.nyt();
          // Reddit - shift + 4
          if (start.down[52]) start.reddit();
          // podcasts - shift + 5
          if (start.down[53]) start.podcasts();
          // Lexichronic - shift + 6
          if (start.down[54]) start.lexichronic();
          // Path of Exile Characters - shift + 7
          if (start.down[55]) start.poe();
          // NFTs - shift + 8
          if (start.down[56]) start.nfts();
          // Fast Podcast Forward - shift + ➡
          if (start.down[39]) start.podcast_fast_forward();
          // Fast Podcast Forward - shift + ⬅
          if (start.down[37]) start.podcast_rewind();
          // Faster Podcast Playback - shift + ⬆
          if (start.down[38]) start.podcast_more_speed();
          // Slower Podcast Playback - shift + ⬇
          if (start.down[40]) start.podcast_less_speed();
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
          } else if (start.down[48]) { // alt + 0
            search = start.searches[9];
            start.count = 9;
          }
          // Switch Search
          if (search) start.switcher(search);
          // Toggle Cursor - Backspace
          if (start.down[8]) start.toggle_cursor();
          // Resize News - Right Bracket
          if (start.down[221]) start.resize_news();
          // Play/Pause Podcasts - "z" Key
          if (start.down[90]) start.podcast_toggle();
          // Update LastFM - "x" Key
          if (start.down[88]) {
            start.lastfm();
            start.notifications("Fetched <span>Last.fm</span>");
          }
          // Hide Animated Background - "c" Key
          if (start.down[67]) start.toggle_background();
          // Refresh Background Image - "v" Key
          if (start.down[86]) start.background();
          // Blur - "b" Key
          if (start.down[66]) start.toggle_blur();
          // X "f12" Key
          if (start.down[123]) start.play_x();
        }
      }).keyup(function (e) {
        // Reset Key on Key Up
        start.down[e.keyCode] = false;
      });
    },

    // Notifications
    notifications: function (text) {
      const noti = $(".notifications");
      if (noti.hasClass(start.h)) noti.removeClass(start.h);
      noti.html(text);
      const timeout_id = setTimeout(function () {
        noti.addClass(start.h);
      }, start.animation_time * 6);
      if (timeout_id) clearTimeout(start.timeout_id);
    },

    // Load Background Image
    background: function () {
      const bg = $(".background-image");
      const num = start.numb(1, 291).toString().padStart(4, "0").toString();
      bg.addClass(start.h);
      setTimeout(function () {
        bg.attr("src", "https://marko.tech/media/art/" + num + ".png");
        bg.one("load", function () {
          bg.removeClass(start.h);
        }).each(function () {
          if (this.complete) $(this).trigger('load');
        });
      }, start.animation_time * 2);
      start.notifications("<span>New</span> Background #" + num + " <span>Loaded</span>");
    },

    // Toggle Blur on Background Image
    toggle_blur: function () {
      $(".background-image").toggleClass("deblur");
      const status = ($(".background-image").hasClass("deblur")) ? " Off" : " On";
      start.notifications("<span>Blur on Background</span>" + status);
    },

    // Toggle Animated Background
    toggle_background: function () {
      const bg = $(".background");
      bg.hasClass(start.h) ? bg.toggleClass(start.h).html(start.background_html) : bg.toggleClass(start.h).html("");
      const status = (bg.hasClass(start.h)) ? " Off" : " On";
      start.notifications("<span>Background Animation</span>" + status);
    },

    // Toggle Animated Desktop - Don't Render on Super Large Screens
    toggle_background_large_screens: function () {
      $(window).bind("resize load", function () {
        const bg = $(".background");
        if (window.matchMedia("(min-width: 1024px)").matches) {
          if (!bg.hasClass(start.h)) bg.addClass(start.h).html("");
        } else {
          if (bg.hasClass(start.h)) bg.removeClass(start.h).html(start.background_html);
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
          const msg = ip.ip.slice(0, 16) + " - " + ip.city + ", " + region;
          $(".ip-replace").text(msg);
          $(".ip div").addClass(start.s);
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
                  $(".songs").addClass(start.s);
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
            start.version_number();
          }).catch(error => {
            $(".lastfm__container").hide();
            start.version_number();
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
      // Album
      data['album'] != "" ? $(".lastfm__album").text(" - " + data['album']).attr("title", "Album: " + data['album']) : $(".lastfm__album").text("");
      // Album Image
      data['image'] != "" ? $(".lastfm__image").attr("src", data['image']).show() : $(".lastfm__image").hide();
      // Show Now Playing
      $(".lastfm__container").show();
      // Dead the Link if a Podcast
      data['link'] ? $(".lastfm__url").attr("href", data['link']).addClass(start.s) : $(".lastfm__url").attr("href", "#").addClass(start.s);
    },

    // Replace News
    fetch_news: function (url, source) {
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
              $(".instapaper-links").addClass(start.s);
            }, 1000);
            if (source) start.notifications("<span>Feed Switched to</span> " + source);
          }
        })
        .catch(function (err) {
          $(".instapaper-links").removeClass("large-4").addClass("large-auto");
        });
    },

    // Instapaper Home Feed
    instapaper: function (skip) {
      const skipper = skip ? false : "Instapaper"
      $.when(start.conf).then(start.fetch_news(start.conf.instapaperURL, skipper));
    },

    // News Home Feed
    news: function () {
      $.when(start.conf).then(start.fetch_news(start.conf.techmemeURL, "All News"));
    },

    // NYT Home Feed
    nyt: function () {
      $.when(start.conf).then(start.fetch_news(start.conf.nytURL, "New York Times"));
    },

    // Reddit Home Feed
    reddit: function () {
      $.when(start.conf).then(start.fetch_news(start.conf.redditURL, "Reddit"));
    },

    // NFTs Home Feed
    nfts: function () {
      $.when(start.conf).then(start.fetch_news(start.conf.alchemyURL, "NFTs"));
    },

    // Lexichronic Home Feed
    lexichronic: function () {
      $.when(start.conf).then(start.fetch_news(start.conf.lexiURL, "Lexichronic"));
    },

    // Path of Exile Home Feed
    poe: function () {
      $.when(start.conf).then(start.fetch_news(start.conf.poeURL, "Path of Exile"));
    },

    // Podcasts Home Feed
    podcasts: function () {
      $.when(start.conf).then(function () {
        start.fetch_news(start.conf.podURL, "Podcasts");
        // Play Podcasts
        start.play_podcast();
      });
    },

    // Play X
    play_x: function () {
      // Stop Other Audio
      if (start.audio.playing) start.audio.pause();
      const x = start.numb(1, 5);
      start.audio.src = start.conf.xURL + x + ".mp3";
      start.audio.playbackRate = 1;
      start.audio.play();
      // Timer
      $(".podcasts").addClass(start.s);
      start.podcast_time();
      start.notifications("Now Playing <span>" + start.conf.x + "</span> #" + x);
    },

    // Play Podcast
    play_podcast: function () {
      $(document).on(start.touch, ".podcast-links li a", function (e) {
        e.preventDefault();
        const podcast = $(this);
        $(".podcasts").addClass(start.s);
        if (podcast.attr("href").indexOf(".mp3") > -1) {
          start.audio.src = podcast.attr("href");
          // Play the Podcasts Slightly Faster
          start.audio.playbackRate = 1.3;
          // Stop Other Audio
          if (start.audio.playing) start.audio.pause();
          // Play
          start.audio.play();
          // Timer
          start.podcast_time();
        }
        start.notifications("<span>Now Playing</span> " + podcast.text().trim().slice(0, 75) + "...");
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

    // Podcast Rewind
    podcast_rewind: function () {
      start.audio.currentTime -= 5;
      start.notifications("<span>Audio</span> Rewind <span>-5 seconds</span>");
    },

    // Podcast Fast Forward
    podcast_fast_forward: function () {
      start.audio.currentTime += 15;
      start.notifications("<span>Audio</span> Fast Forward <span>+15 seconds</span>");
    },

    // Podcast Faster Playback
    podcast_more_speed: function () {
      start.audio.playbackRate += 0.15;
      start.notifications("<span>Audio</span> Playback Rate <span>" + start.audio.playbackRate + "x</span>");
    },

    // Podcast Slower Playback
    podcast_less_speed: function () {
      start.audio.playbackRate -= 0.15;
      start.notifications("<span>Audio</span> Playback Rate <span>" + start.audio.playbackRate + "x</span>");
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
          let width = (start.audio.currentTime / start.audio.duration) * 100;
          if (width < 1) width = 1;
          $(".container .progress").css('width', width + '%');
        }
        // When Podcast Ends
        start.audio.addEventListener("ended", function () {
          $(".podcasts-replace").text('0:00');
          $(".podcasts").removeClass(start.s);
          $(".container .progress").css('width', '0%');
          start.notifications("<span>Podcast</span> Finished");
          // Reset Audio
          start.audio = new Audio();
        });
      }, 500);
    },

    // Pause Podcast
    podcast_toggle: function () {
      let current_vol = start.audio.volume;
      let step_size = 0.05;
      if (!start.audio.paused) {
        step_size *= -1;
        start.notifications("<span>Audio</span> Paused");
      } else {
        // Rewind 2 seconds
        start.audio.currentTime = start.audio.currentTime - 2;
        start.notifications("<span>Audio</span> Playing");
      }
      // Fader
      let fader = setInterval(function () {
        // Calculate New Volume Based On Step Size
        current_vol += step_size;
        // No weird numbers
        current_vol = Math.max(0, Math.min(1, current_vol));
        // Update Volume
        start.audio.volume = current_vol;
        // Pause
        if (current_vol <= 0) start.audio.pause();
        // Play
        if (current_vol >= 1) start.audio.play();
        // Stop Fader
        if (current_vol <= 0 || current_vol >= 1) clearInterval(fader);
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
                $(".counter").addClass(start.s);
                console.log("\n");
                console.log("Page Views    : " + start.pageviews);
                console.log("\n");
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
                $(".wallet").addClass(start.s);
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
      $("#searchform label").on(start.touch, function () {
        start.count = start.count < start.searches.length - 1 ? start.count + 1 : 0;
        // Switch Search
        start.switcher(start.searches[start.count]);
      });
    },

    // Focus/DeFocus Search
    click_focus_search: function () {
      // Focus Search if Clicking Anything Not a Link or Input
      $(document).on(start.touch, function (e) {
        if (e.target.tagName !== "A" && e.target.tagName !== "INPUT") start.focus_search();
      });
      // Focus Out Remove Styling for Search
      $("#search").on("focusout", function () {
        $("form").removeClass("focus");
      });
    },

    // Reset Mouse Cursor
    toggle_cursor: function () {
      $("body").toggleClass("vaal");
      const status = ($("body").hasClass("vaal")) ? " On" : " Off";
      start.notifications("<span>Cursor Toggled</span>" + status);
    },

    // Resize
    resize_news: function () {
      $(".cell.small-12.large-4.instapaper-links.shown").toggleClass("large-6");
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
      console.log("Build Version : " + start.version);
    },

    // Version
    version_number: function () {
      setTimeout(function () {
        $(".version-target").text(start.version).parent().addClass(start.s);
      }, start.animation_time * 4);
    },

    // Font Family
    font_family: function () {
      $.when(start.conf).then(console.log("\nFont Family   : " + $("body").css("font-family")));
    }

  };

  // Init
  start.load_config();

  // Focus on Load
  $(window).on("load", function () {
    start.focus_search();
  });

})(this, jQuery);
