(function (root, $) {
  "use strict";

  var start = {

    // Version Number
    version: "1.14.26",

    // Touch Events
    touch: "onontouchend" in document.documentElement ? "ontouchend" : "click",

    // Keyboard Variable
    down: {},

    // Config
    conf: false,

    // Counts
    count: false,
    feed_count: false,

    // Animation Time
    animation_time: 333,

    // Pageviews
    pageviews: false,

    // Wallet Balance
    balance: false,

    // Art
    art_url: false,
    art_num: false,

    // NFTs
    nfts_collection: false,

    // Shared Class Names
    s: "shown",
    h: "hidden",

    // Audio
    audio: new Audio(),

    // Timestamp for Breaking Cached URLs
    timestamp: ~~(new Date().getTime() / 1000),

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

    // Feeds
    feeds: [
      function() {
        start.instapaper();
      },
      function() {
        start.news();
      },
      function() {
        start.nyt();
      },
      function() {
        start.reddit();
      },
      function() {
        start.podcasts();
      },
      function() {
        start.music();
      },
      function() {
        start.poe();
      },
      function() {
        start.lexichronic();
      },
      function() {
        start.nfts();
      },
      function () {
        start.background();
      },
      function () {
        start.play_x();
      },
      function () {
        start.play_x_playlist();
      },
      function () {
        start.audio_rewind();
      },
      function () {
        start.audio_toggle();
      },
      function () {
        start.audio_fast_forward();
      },
      function () {
        start.audio_mute();
      }
    ],

    // Init
    init: function () {

      // Background Image Number
      start.art_num = this.random_numb(1, 291).toString().padStart(4, "0")

      // Pageview Counter
      this.pageview_counter();

      // Key Listeners
      this.key_listener();

      // Background Image
      this.background();

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

      // Search Change on Click
      this.change_search();

      // Menu
      this.menu();

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
        start.art_url = conf.artThumbURL;
        // Init
        $.when(start.conf).then(start.init());
      }).fail(function () {
        $(".instapaper-links").addClass(start.s);
      });
    },

    // Random Number in a Range
    random_numb: function (min, max) {
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

    // Function Triggers by Keyboard Combos
    key_listener: function (e) {
      $(document).keydown(function (e) {
        // Key Down
        start.down[e.keyCode] = true;
        // Left Shift
        if (start.down[16]) {
          e.preventDefault();
          if (start.down[49]) { // Instapaper (shift + 1️⃣)
            start.feed_count = 0;
          } else if (start.down[50]) { // News (shift + 2️⃣)
            start.feed_count = 1;
          } else if (start.down[51]) { // New York Times (shift + 3️⃣)
            start.feed_count = 2;
          } else if (start.down[52]) { // Reddit (shift + 4️⃣)
            start.feed_count = 3;
          } else if (start.down[53]) { // Podcasts (shift + 5️⃣)
            start.feed_count = 4;
          } else if (start.down[54]) { // Lexichronic (shift + 6️⃣)
            start.feed_count = 5;
          } else if (start.down[55]) { // Path of Exile Characters (shift + 7️⃣)
            start.feed_count = 6;
          } else if (start.down[56]) { // Music (shift + 8️⃣)
            start.feed_count = 7;
          } else if (start.down[57]) { // NFTs (shift + 9️⃣)
            start.feed_count = 8;
          }
          // Switch Feed Source
          if (Number.isInteger(start.feed_count)) start.feeds[start.feed_count]();
          // Audio: Fast Forward (shift + ⏩)
          if (start.down[39]) start.audio_fast_forward();
          // Audio: Rewind (shift + ⏪)
          if (start.down[37]) start.audio_rewind();
          // Audio: Increased Playback Speed (shift + ⏫)
          if (start.down[38]) start.audio_more_speed();
          // Audio: Decreased Playback Speed (shift + ⏬)
          if (start.down[40]) start.audio_less_speed();
          // Audio: Play/Pause ("space" Key)
          if (start.down[32]) start.audio_toggle();
          // Audio: Mute (shift + "m" Key)
          if (start.down[77]) start.audio_mute();
        }
        // Alt/Option
        if (start.down[18]) {
          e.preventDefault();
          // Alt Modifiers
          if (start.down[49]) { // Path of Exile (alt + 1️⃣)
            start.count = 0;
          } else if (start.down[50]) { // YouTube (alt + 2️⃣)
            start.count = 1;
          } else if (start.down[51]) { // DuckDuckGo (alt + 3️⃣)
            start.count = 2;
          } else if (start.down[52]) { // Apple Music (alt + 4️⃣)
            start.count = 3;
          } else if (start.down[53]) { // LastFM (alt + 5️⃣)
            start.count = 4;
          } else if (start.down[54]) { // Twitter (alt + 6️⃣)
            start.count = 5;
          } else if (start.down[55]) { // Google News (alt + 7️⃣)
            start.count = 6;
          } else if (start.down[56]) { // Github (alt + 8️⃣)
            start.count = 7;
          } else if (start.down[57]) { // MidJourney (alt + 9️⃣)
            start.count = 8;
          } else if (start.down[48]) { // Google (alt + 0️⃣)
            start.count = 9;
          }
          // Switch Search Source
          if (Number.isInteger(start.count)) start.search_switcher(start.searches[start.count]);
          // Toggle Cursor (alt + 🔙)
          if (start.down[8]) start.toggle_cursor();
          // Resize News (alt + ] or alt + [)
          if (start.down[221] || start.down[219]) start.resize_news();
          // Change Art Source To Full Resolution (alt + )
          if (start.down[90]) start.change_art_source();
          // Update LastFM (alt + "x")
          if (start.down[88]) {
            start.lastfm();
            start.notifications("Fetched <span>Last.fm</span>");
          }
          // Refresh Background Image (alt + "v")
          if (start.down[86]) start.background();
          // Blur (alt + "b")
          if (start.down[66]) start.toggle_blur();
          // Wallet Status (alt + "n")
          if (start.down[78]) start.console_wallet();
          // X
          if (start.down[123]) start.play_x();
          if (start.down[122]) start.play_x_playlist();
        }
      }).keyup(function (e) {
        // Reset Key on Key Up
        start.down[e.keyCode] = false;
      });
    },

    // Menu
    menu: function () {
      $(".menu-toggle").on(start.touch, function (e) {
        e.preventDefault();
        const html = $(".menu-links-source").html();
        $(".instapaper-links").removeClass(start.s);
        setTimeout(function () {
          $(".instapaper-links").html(html);
        }, 600);
        setTimeout(function () {
          $(".instapaper-links").addClass(start.s).addClass("");
        }, 1000);
        start.notifications("Menu <span>Toggled</span> ");
      });
      // Menu Clicks
      $(document).on(start.touch, ".menu-links--item", function (e) {
        e.preventDefault();
        start.feed_count = $(this).data("id");
        // Switch Feed Source
        if (Number.isInteger(start.feed_count)) start.feeds[start.feed_count]();
      });
    },

    // Notifications
    notifications: function (text) {
      const noti = $(".notifications");
      if (noti.hasClass(start.h)) noti.removeClass(start.h);
      noti.find(".notifications__inner").html(text);
      const timeout_id = setTimeout(function () {
        noti.addClass(start.h);
      }, start.animation_time * 6);
      if (timeout_id) clearTimeout(start.timeout_id);
    },

    // Load Background Image
    background: function (num = false) {
      const bg = $(".background-image");
      if (!num) start.art_num = start.random_numb(1, 291).toString().padStart(4, "0").toString();
      bg.addClass(start.h);
      setTimeout(function () {
        bg.attr("src", start.art_url + start.art_num + ".png");
        bg.one("load", function () {
          bg.removeClass(start.h);
        }).each(function () {
          if (this.complete) $(this).trigger('load');
        });
      }, start.animation_time * 3);
      if (!num) start.notifications("<span>New Background</span> #" + start.art_num + " <span>Loaded</span>");
    },

    // Change Background Art Resolution
    change_art_source: function () {
      start.art_url = start.art_url === start.conf.artThumbURL ? start.conf.artURL : start.conf.artThumbURL;
      const message = start.art_url.replace("https://marko.tech/", "").replace(/\/$/, "");
      start.background(true);
      start.notifications("<span>Background Source Changed To</span> " + message);
    },

    // Toggle Blur on Background Image
    toggle_blur: function () {
      $(".background-image").toggleClass("deblur");
      const status = ($(".background-image").hasClass("deblur")) ? " Off" : " On";
      start.notifications("<span>Blurred Background</span>" + status);
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
                  $(".songs-replace").text(start.format_numb(count).trim().toString());
                  $(".songs").addClass(start.s);
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
      const artist = $(".lastfm__artist"),
            song = $(".lastfm__song"),
            album = $(".lastfm__album"),
            image = $(".lastfm__image"),
            container = $(".lastfm__container"),
            url = $(".lastfm__url");
      artist.text(data.artist).attr("title", `Artist: ${data.artist}`);
      song.text(data.name).attr("title", `Song: ${data.name}`);
      if (data.album) {
        album.text(` - ${data.album}`).attr("title", `Album: ${data.album}`);
      } else {
        album.text("");
      }
      if (data.image) {
        image.attr("src", data.image).show();
      } else {
        image.hide();
      }
      if (data.link) {
        url.attr("href", data.link).addClass(start.s);
      } else {
        url.attr("href", "#").addClass(start.s);
      }
      container.show();
    },

    // Search Switcher
    search_switcher: function (search) {
      const action = search['action'],
            logo = search['logo'],
            name = search['name'],
            type = search['type'];
      let text = search['text'];
      if (window.matchMedia("(max-width: 30em)").matches) {
        text = text.replace("Search ", "");
      }
      $("#searchform").attr("action", action);
      $(".search").attr("src", logo);
      $("#search").attr("placeholder", text)
        .attr("name", name)
        .attr("data-type", type)
        .focus();
      start.notifications("<span>Search Switched to </span> " + search['type']);
    },

    // Replace News
    fetch_news: function (url, source) {
      fetch(url + '?t=' + start.timestamp)
        .then(function (response) {
          $(".instapaper-links").removeClass(start.s);
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
      start.feed_count = false;
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
        start.play_audio();
      });
    },

    // Music Home Feed
    music: function () {
      $.when(start.conf).then(function () {
        start.fetch_news(start.conf.xPlaylistHTMLURL, "Music");
        start.play_audio();
      });
    },

    // Play X
    play_x: function (url) {
      if (start.audio.playing) start.audio.pause();
      let number = start.random_numb(1, 13);
      if (!url) {
        start.audio.src = start.conf.xURL + number + ".mp3";
      } else {
        number = start.random_numb(1, 268);
        start.audio.src = url;
      }
      start.audio.playbackRate = 1;
      start.audio.play();
      $(".podcasts").addClass(start.s);
      start.audio_click_play();
      start.audio_time();
      const pod_data = {
        id: "",
        name: "Song #" + number,
        album: "",
        artist: "Lofi Girl",
        image: "icons/icon__lofi-girl.jpg",
        link: "https://www.youtube.com/@LofiGirl"
      }
      start.change_lastfm_artwork(pod_data);
      start.notifications("Now Playing <span>" + start.conf.x + "</span> #" + number);
      if (!$("#search").hasClass("full")) $("#search").addClass("full");
    },

    // Play X Playlist
    play_x_playlist: function () {
      if (start.audio.playing) start.audio.pause();
      $.when(start.conf).then(function () {
        fetch(start.conf.xPlaylistJSONURL + '?t=' + start.timestamp)
          .then(function (response) {
            return response.json();
          })
          .then(function (x) {
            for (let i = x.length - 1; i > 0; i--) {
              const j = Math.floor(Math.random() * (i + 1));
              [x[i], x[j]] = [x[j], x[i]];
            }
            if (x) {
              async function x_pl() {
                for (var i = 0; i < 20; i++) {
                  start.play_x(x[i]);
                  await new Promise(resolve => {
                    start.audio.addEventListener('ended', function () {
                      resolve();
                    });
                  });
                }
              }
              x_pl();
            }
          })
          .catch(function (err) {
            console.log(err);
          });
      });
    },

    // Audio: Play
    play_audio: function () {
      $(document).on(start.touch, ".podcast-links li a", function (e) {
        e.preventDefault();
        const podcast = $(this);
        $(".podcasts").addClass(start.s);
        start.audio.src = podcast.attr("href");
        if (!$(".podcast-links").hasClass("music-links")) start.audio.playbackRate = 1.3;
        if (start.audio.playing) start.audio.pause();
        start.audio.play();
        start.audio_time();
        start.notifications("<span>Now Playing</span> " + podcast.text().trim().slice(0, 75) + "...");
        const pod_data = {
          id: '',
          name: podcast.data('title'),
          album:'',
          artist: podcast.data('feed'),
          image: podcast.find("img").attr('src'),
          link: podcast.data('link')
        }
        start.change_lastfm_artwork(pod_data);
        start.audio_click_play();
        if (!$("#search").hasClass("full")) $("#search").addClass("full");
      });
    },

    // Audio: Pause on Click of Timer
    audio_click_play: function () {
      $(document).on(start.touch, ".podcasts", function (e) {
        e.preventDefault();
        start.audio_toggle();
      });
    },

    // Audio: Toggle Mute
    audio_mute: function () {
      start.audio.muted = !start.audio.muted;
      const status = start.audio.muted ? "Muted" : "Unmuted";
      const icon = start.audio.muted ? "unmuted" : "mute";
      $(".instapaper-links .menu-links--item-mute img").attr("src", "icons/icon__" + icon + ".svg");
      start.audio.muted ? $(".mute").addClass(start.s) : $(".mute").removeClass(start.s);
      start.notifications("<span>Audio</span> " + status);
    },

    // Audio: Rewind
    audio_rewind: function () {
      start.audio.currentTime -= 5;
      start.notifications("<span>Audio</span> Rewind <span>-5 seconds</span>");
    },

    // Audio: Fast Forward
    audio_fast_forward: function () {
      start.audio.currentTime += 15;
      start.notifications("<span>Audio</span> Fast Forward <span>+15 seconds</span>");
    },

    // Audio: Faster Playback
    audio_more_speed: function () {
      start.audio.playbackRate += 0.1;
      start.notifications("<span>Audio</span> Playback Rate <span>" + start.audio.playbackRate.toFixed(2) + "x</span>");
    },

    // Audio: Slower Playback
    audio_less_speed: function () {
      start.audio.playbackRate -= 0.1;
      start.notifications("<span>Audio</span> Playback Rate <span>" + start.audio.playbackRate.toFixed(2) + "x</span>");
    },

    // Audio: Timer
    audio_time: function () {
      setInterval(function () {
        const time_remaining = start.audio.duration - start.audio.currentTime,
              minutes = Math.floor(time_remaining / 60),
              seconds = Math.floor(time_remaining % 60),
              padded_time = seconds < 10 ? '0' + seconds : seconds;
        // Update Time
        if (seconds) {
          $(".podcasts-replace").text(minutes + ':' + padded_time);
          let width = ((start.audio.currentTime / start.audio.duration) * 100).toFixed(3);
          if (width < 1) width = 1;
          $(".container .progress").css('width', width + '%');
        }
      }, 500);
      // When Podcast Ends
      start.audio.addEventListener("ended", function () {
        $(".podcasts-replace").text('0:00');
        $(".podcasts").removeClass(start.s);
        $(".container .progress").css('width', '0%');
        if ($("#search").hasClass("full")) $("#search").removeClass("full");
        start.notifications("<span>Audio</span> Finished Playing");
        // Reset Audio
        start.audio = new Audio();
      });
    },

    // Pause Podcast
    audio_toggle: function () {
      let current_vol = start.audio.volume;
      let step_size = 0.05;
      if (!start.audio.paused) {
        step_size *= -1;
        start.notifications("<span>Audio</span> Paused");
        $(".podcasts img, .instapaper-links .menu-links--item-pause img").attr("src", "icons/icon__pause.svg");
      } else {
        // Rewind 3 seconds
        start.audio.currentTime = start.audio.currentTime - 3;
        start.notifications("<span>Audio</span> Playing");
        $(".podcasts img, .instapaper-links .menu-links--item-pause img").attr("src", "icons/icon__play.svg");
      }
      // Fader
      let fader = setInterval(function () {
        current_vol += step_size;
        current_vol = Math.max(0, Math.min(1, current_vol));
        start.audio.volume = current_vol;
        if (current_vol <= 0) start.audio.pause();
        if (current_vol >= 1) start.audio.play();
        if (current_vol <= 0 || current_vol >= 1) clearInterval(fader);
      }, 1000 / 25);
    },

    // Page View Counter
    pageview_counter: function () {
      $.when(start.conf).then(function () {
        fetch(start.conf.counterURL + '?t=' + start.timestamp)
          .then(function (response) {
            return response.text();
          })
          .then(function (number) {
            if (number) {
              setTimeout(function () {
                start.pageviews = number.trim().toString().slice(0, 10);
                $(".counter-replace").text(start.pageviews);
                $(".counter").addClass(start.s);
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
              setTimeout(function () {
                $(".wallet-replace").text((balance_formatted + formatted).toString());
                $(".wallet").addClass(start.s);
              }, start.animation_time);
              start.nfts_collection = response['ETH']['price'];
            }
          })
          .catch(function (err) {
            $(".wallet").remove();
          });
      });
    },

    // Console Log Wallet Status
    console_wallet: function () {
      console.log(start.nfts_collection)
      start.notifications("Console.log <span>Wallet</span> Stats");
    },

    // Change Search on Click
    change_search: function () {
      $("#searchform label").on(start.touch, function () {
        start.count = start.count < start.searches.length - 1 ? start.count + 1 : 0;
        start.search_switcher(start.searches[start.count]);
      });
    },

    // Focus Search if Clicking Anything Not a Link or Input
    click_focus_search: function () {
      if (window.matchMedia("(min-width: 40em)").matches) {
        $(document).on(start.touch, function (e) {
          if (e.target.tagName !== "A" &&
              e.target.tagName !== "INPUT" &&
              e.target.className !== "menu-toggle"
          ) start.focus_search();
        });
      }
    },

    // Reset Mouse Cursor
    toggle_cursor: function () {
      $("body").toggleClass("vaal");
      const status = ($("body").hasClass("vaal")) ? " On" : " Off";
      start.notifications("<span>Cursor Toggled</span>" + status);
    },

    // Resize
    resize_news: function () {
      $(".container__inner").toggleClass("container__inner--large");
      const status = ($(".instapaper-links").hasClass("large-6")) ? " Large" : " Default";
      start.notifications("<span>News Resized</span>" + status);
    },

    // Animation on Leave
    bye_bye: function () {
      $(window).on("beforeunload", function () {
        if (start.audio && !start.audio.paused) {
          const result = window.confirm("Audio is still playing, sure you want to leave?");
          if (result) {
            $("body").css("opacity", 0);
          } else {
            return false;
          }
        } else {
          $("body").css("opacity", 0);
        }
      });
    },

    // Console Log Attribution
    console_log: function () {
      console.log("Built By");
      console.log(
        "%cMarko Bajlovic",
        "background-color:#fff;color:#0b0b0b;padding:0.85em 0.5em;font-weight:900;line-height:1.5em;font-size:2em;"
      );
    },

    // Version
    version_number: function () {
      // fetch request
      let commits = "";
      fetch(start.conf.githubURL + "&t=" + start.timestamp)
        .then(function (response) {
          if (response) return response.json();
        }).then(function (response) {
          if (response) commits = " (" + response[0].contributions + ")";
        });
      setTimeout(function () {
        $(".version-target").text(start.version.toString() + commits).parent().addClass(start.s);
      }, start.animation_time * 4);
    }

  };

  // Init
  start.load_config();

  // Focus on Load
  $(window).on("load", function () {
    start.focus_search();
  });

})(this, jQuery);
