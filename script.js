(function (root, $) {
  "use strict";

  var start = {

    // Version Number
    version: "1.15.25",

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

    // Video
    video: false,

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
        start.yt();
      },
      function() {
        start.poe();
      },
      function() {
        start.lexichronic();
      },
      function () {
        start.nfts();
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
      },
      function () {
        start.background();
      },
      function () {
        start.toggle_blur();
      },
      function () {
        start.change_art_source();
      },
      function () {
        start.resize_news();
      }
    ],

    // Init
    init: function () {

      // Version Number
      start.version_number();

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

      // Search
      this.click_focus_search();
      this.change_search();

      // Menu
      this.menu_clicks();

      // Animation on Leave
      this.bye_bye();

      // IP
      this.ip();

      // Output into Console
      this.console_log();
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
          if (start.down[49]) { // Instapaper             (shift + 1️⃣)
            start.feed_count = 0;
          } else if (start.down[50]) { // News            (shift + 2️⃣)
            start.feed_count = 1;
          } else if (start.down[51]) { // New York Times  (shift + 3️⃣)
            start.feed_count = 2;
          } else if (start.down[52]) { // Reddit          (shift + 4️⃣)
            start.feed_count = 3;
          } else if (start.down[53]) { // Podcasts        (shift + 5️⃣)
            start.feed_count = 4;
          } else if (start.down[54]) { // Lexichronic     (shift + 6️⃣)
            start.feed_count = 5;
          } else if (start.down[55]) { // YouTube         (shift + 7️⃣)
            start.feed_count = 6;
          } else if (start.down[56]) { // Path of Exile   (shift + 8️⃣)
            start.feed_count = 7;
          } else if (start.down[57]) { // Music           (shift + 9️⃣)
            start.feed_count = 8;
          } else if (start.down[48]) { // NFTs            (shift + 0️⃣)
            start.feed_count = 9;
          }
          // Switch Feed Source
          if (Number.isInteger(start.feed_count)) start.feeds[start.feed_count]();
          // Audio: Fast Forward                      (shift + ⏩)
          if (start.down[39]) start.audio_fast_forward();
          // Audio: Rewind                            (shift + ⏪)
          if (start.down[37]) start.audio_rewind();
          // Audio: Increased Playback Speed          (shift + ⏫)
          if (start.down[38]) start.audio_more_speed();
          // Audio: Decreased Playback Speed          (shift + ⏬)
          if (start.down[40]) start.audio_less_speed();
          // Audio: Play/Pause                        (shift + "space")
          if (start.down[32]) start.audio_toggle();
          // Audio: Mute                              (shift + "m")
          if (start.down[77]) start.audio_mute();
          // Video: Fullscreen Toggle                 (shift + "f")
          if (start.down[70]) start.fullscreen_video();
          // Music: Randomized Playlist               (alt + "f11")
          if (start.down[122]) start.play_x_playlist();
          // Music: Random Song                       (alt + "f12")
          if (start.down[123]) start.play_x();
        }
        // Alt/Option
        if (start.down[18]) {
          e.preventDefault();
          if (start.down[49]) { // Path of Exile      (alt + 1️⃣)
            start.count = 0;
          } else if (start.down[50]) { // YouTube     (alt + 2️⃣)
            start.count = 1;
          } else if (start.down[51]) { // DuckDuckGo  (alt + 3️⃣)
            start.count = 2;
          } else if (start.down[52]) { // Apple Music (alt + 4️⃣)
            start.count = 3;
          } else if (start.down[53]) { // LastFM      (alt + 5️⃣)
            start.count = 4;
          } else if (start.down[54]) { // Twitter     (alt + 6️⃣)
            start.count = 5;
          } else if (start.down[55]) { // Google News (alt + 7️⃣)
            start.count = 6;
          } else if (start.down[56]) { // Github      (alt + 8️⃣)
            start.count = 7;
          } else if (start.down[57]) { // MidJourney  (alt + 9️⃣)
            start.count = 8;
          } else if (start.down[48]) { // Google      (alt + 0️⃣)
            start.count = 9;
          }
          // Switch Search Source
          if (Number.isInteger(start.count)) start.search_switcher(start.searches[start.count]);
          // Toggle Cursor                            (alt + 🔙)
          if (start.down[8]) start.toggle_cursor();
          // Resize News                              (alt + ] or alt + [)
          if (start.down[221] || start.down[219]) start.resize_news();
          // Change Art Source To Full Resolution     (alt + z)
          if (start.down[90]) start.change_art_source();
          // Update LastFM                            (alt + "x")
          if (start.down[88]) {
            start.lastfm();
            start.notifications("Fetched <span>Last.fm</span>");
          }
          // Toggle Menu                              (alt + "c")
          if (start.down[67]) start.menu();
          // Refresh Background Image                 (alt + "v")
          if (start.down[86]) start.background();
          // Blur                                     (alt + "b")
          if (start.down[66]) start.toggle_blur();
          // Wallet Status                            (alt + "n")
          if (start.down[78]) start.console_wallet();
        }
      }).keyup(function (e) {
        // Reset Key on Key Up
        start.down[e.keyCode] = false;
      });
    },

    // Menu
    menu: function () {
      const html = $(".menu-links-source").html();
      $(".instapaper-links").removeClass(start.s);
      setTimeout(function () {
        $(".instapaper-links").html(html);
      }, 600);
      setTimeout(function () {
        $(".instapaper-links").addClass(start.s);
      }, 1000);
      start.notifications("Menu <span>Toggled</span>");
    },

    // Menu Click Events
    menu_clicks: function() {
      // Trigger Menu on Hambuger Click
      $(document).on(start.touch, ".menu-toggle", function (e) {
        e.preventDefault();
        start.menu();
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
      if (!num) start.notifications(`<span>New Background</span> #${start.art_num} <span>Loaded</span>`);
    },

    // Change Background Art Resolution
    change_art_source: function () {
      start.art_url = start.art_url === start.conf.artThumbURL ? start.conf.artURL : start.conf.artThumbURL;
      const message = start.art_url.replace("https://marko.tech/", "").replace(/\/$/, "");
      start.background(true);
      start.notifications(`<span>Background Source Changed To</span> ${message}`);
    },

    // Toggle Blur on Background Image
    toggle_blur: function () {
      $(".background-image").toggleClass("deblur");
      const status = ($(".background-image").hasClass("deblur")) ? " Off" : " On";
      start.notifications(`<span>Blurred Background</span>${status}`);
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
            const media_playing = start.audio && !start.audio.paused || start.video && start.video.getPlayerState() === 1;
            if (!media_playing) {
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
      const artist = $(".lastfm__artist"),
            song = $(".lastfm__song"),
            album = $(".lastfm__album"),
            image = $(".lastfm__image"),
            container = $(".lastfm__container"),
            url = $(".lastfm__url");
      artist.text(data.artist).attr("title", `Artist: ${data.artist}`);
      song.text(data.name).attr("title", `Song: ${data.name}`);
      album.text(data.album ? ` - ${data.album}` : "").attr("title", data.album ? `Album: ${data.album}` : "");
      image.toggle(data.image != null).attr("src", data.image);
      url.attr("href", data.link ? data.link : "#").addClass(start.s);
      container.show();
    },

    // Search Switcher
    search_switcher: function (search) {
      const action = search['action'],
            logo = search['logo'],
            name = search['name'],
            type = search['type'];
      let text = search['text'];
      const is_mobile = window.matchMedia("(max-width: 30em)").matches;
      const search_text = is_mobile ? text.replace("Search ", "") : text;
      $("#searchform").attr("action", action);
      $(".search").attr("src", logo);
      $("#search").attr({
        "placeholder": search_text,
        "name": name,
        "data-type": type
      }).focus();
      start.notifications(`<span>Search Switched to </span> ${type}`);
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
            if (source) start.notifications(`<span>Feed Switched to</span> ${source}`);
          }
        })
        .catch(function (err) {
          $(".instapaper-links").addClass(start.s);
        });
      start.feed_count = false;
      if (!$(".instapaper-links").hasClass("video-links")) start.video = false;
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

    // YouTube Home Feed
    yt: function () {
      $.when(start.conf).then(function () {
        start.fetch_news(start.conf.youTubeURL, "YouTube");
        start.yt_click();
      });
    },

    video_is_ready: function (event) {
      start.video_timer();
      start.video.addEventListener('onStateChange', function (event) {
        if (event.data === YT.PlayerState.ENDED) {
          start.yt();
          start.notifications("<span>Video</span> Finished Playing");
          $(".podcasts-replace").text('0:00');
          $(".podcasts").removeClass(start.s);
          $(".container .progress").css('width', '0%');
          if ($("#search").hasClass("full")) $("#search").removeClass("full");
          if (!$(".instapaper-links").hasClass("video-links")) start.video = false;
        }
      });
    },

    // Open Youtube Video in Modal
    yt_click: function () {
      $(document).on(start.touch, ".video-links a", function (e) {
        const that = $(this);
        e.preventDefault();
        start.audio_toggle();
        // Init New Player
        start.video = new YT.Player('video-container', {
          height: '360',
          width: '640',
          videoId: that.data("id"),
          playerVars: {
            'autoplay': 1,
            'controls': 1,
            'modestbranding': 1,
            'rel': 0,
            'showinfo': 0
          },
          events: {
            'onReady': start.video_is_ready,
          }
        });
        // get href from $(this) and set it to the iframe src
        const vid_data = {
          id: that.data("id"),
          name: that.data("title"),
          album: "",
          artist: that.data("feed"),
          image: that.find("img").attr("src"),
          link: that.attr("href")
        }
        start.change_lastfm_artwork(vid_data);
        if (!$(".container__inner").hasClass("container__inner--large")) start.resize_news();
        start.notifications(`Now Playing <span>${vid_data.name}</span>`);
      });
    },

    // Fullscreen Toggle
    fullscreen_video: function () {
      const v = $(".video-links .instapaper-list"),
            vl = $(".video-links"),
            fs = v.hasClass("fullscreen") ? "Fullscreen Off" : "Fullscreen";
      vl.removeClass(start.s);
      setTimeout(function () {
        v.toggleClass("fullscreen");
      }, 600);
      setTimeout(function () {
        vl.addClass(start.s);
      }, 1000);
      start.notifications(`Video <span>${fs}</span>`);
    },

    // Play X
    play_x: function (url) {
      if (!start.audio.paused) start.audio.pause();
      if (start.video && start.video.getPlayerState() === 1) start.video.pauseVideo();
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
      start.notifications(`Now Playing <span>${start.conf.x}</span> #${number}`);
      if (!$("#search").hasClass("full")) $("#search").addClass("full");
    },

    // Play X Playlist
    play_x_playlist: function () {
      if (!start.audio.paused) start.audio.pause();
      if (start.video && start.video.getPlayerState() === 1) start.video.pauseVideo();
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
        const a = $(this);
        if (!start.audio.paused) start.audio.pause();
        if (start.video) {
          if (start.video.getPlayerState() === 1) start.video.pauseVideo();
        }
        $(".podcasts").addClass(start.s);
        start.audio.src = a.attr("href");
        if (!$(".podcast-links").hasClass("music-links")) start.audio.playbackRate = 1.3;
        start.audio.play();
        start.audio_time();
        start.notifications(`<span>Now Playing</span> ${a.text().trim().slice(0, 75) + "..."}`);
        const pod_data = {
          id: '',
          name: a.data('title'),
          album:'',
          artist: a.data('feed'),
          image: a.find("img").attr('src'),
          link: a.attr('href')
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
      if (start.video) start.video.isMuted() ? start.video.unMute() : start.video.mute();
      start.notifications(`<span>Audio</span> ${status}`);
    },

    // Audio: Rewind
    audio_rewind: function (val = 5) {
      if (!start.audio.paused) start.audio.currentTime -= val;
      if (start.video && start.video.getPlayerState() === 1) start.video.seekTo(start.video.getCurrentTime() - val);
      start.notifications(`<span>Audio</span> Rewind <span>-${val} seconds</span>`);
    },

    // Audio: Fast Forward
    audio_fast_forward: function (val = 15) {
      if (!start.audio.paused) start.audio.currentTime += val;
      if (start.video && start.video.getPlayerState() === 1) start.video.seekTo(start.video.getCurrentTime() + val);
      start.notifications(`<span>Audio</span> Fast Forward <span>+${val} seconds</span>`);
    },

    // Audio: Faster Playback
    audio_more_speed: function () {
      if (!start.audio.paused) {
        start.audio.playbackRate += 0.1;
        start.notifications(`<span>Audio</span> Playback Rate <span>${start.audio.playbackRate.toFixed(2) }x</span>`);
      }
    },

    // Audio: Slower Playback
    audio_less_speed: function () {
      if (!start.audio.paused) {
        start.audio.playbackRate -= 0.1;
        start.notifications(`<span>Audio</span> Playback Rate <span>${start.audio.playbackRate.toFixed(2) }x</span>`);
      }
    },

    // Audio: Timer
    audio_time: function () {
      setInterval(function () {
        const tr = start.audio.duration - start.audio.currentTime,
              minutes = Math.floor(tr / 60),
              seconds = Math.floor(tr % 60),
              padded_time = seconds < 10 ? '0' + seconds : seconds;
        // Update Time
        if (seconds) {
          $(".podcasts-replace").text(minutes + ':' + padded_time);
          let width = ((start.audio.currentTime / start.audio.duration) * 100).toFixed(3);
          if (width < 1) width = 1;
          $(".container .progress").css('width', width + '%');
        }
      }, 500);
      // When Audio Ends
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

    // Video Timer
    video_timer: function () {
      $(".podcasts").addClass(start.s);
      setInterval(function () {
        try {
            var tr = start.video.getDuration() - start.video.getCurrentTime(),
                min = Math.floor(tr / 60),
                sec = Math.floor(tr % 60),
                pt = sec < 10 ? '0' + sec : sec;
            // Update Time
            if (sec) {
              $(".podcasts-replace").text(min + ':' + pt);
              let width = ((start.video.getCurrentTime() / start.video.getDuration()) * 100).toFixed(3);
              if (width < 1) width = 1;
              $(".container .progress").css('width', width + '%');
            }
        } finally {}
      }, 500);
    },

    // Audio: Play/Pause
    audio_toggle: function () {
      let current_vol = start.audio.volume;
      let step_size = 0.05;
      // Audio Toggle
      if (!start.audio.paused) {
        step_size *= -1;
        $(".podcasts img").attr("src", "icons/icon__pause.svg");
        $(".instapaper-links .menu-links--item-pause img").attr("src", "icons/icon__play.svg");
        start.notifications("<span>Audio</span> Paused");
      } else {
        // Rewind 3 seconds
        start.audio.currentTime = start.audio.currentTime - 3;
        $(".podcasts img").attr("src", "icons/icon__play.svg");
        $(".instapaper-links .menu-links--item-pause img").attr("src", "icons/icon__pause.svg");
        start.notifications("<span>Audio</span> Playing");
        if (start.video) {
          if (start.video.getPlayerState() === 1) {
            start.video.pauseVideo();
          }
        }
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
      // Video Toggle
      try {
        if (start.video.getPlayerState() === 1) {
          start.video.pauseVideo();
          start.notifications("<span>Video</span> Paused");
        } else {
          start.video.playVideo();
          start.notifications("<span>Video</span> Playing");
          if (!start.audio.paused) fader;
        }
      } catch (e) {
        return;
      }
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
      start.notifications(`<span>Cursor Toggled</span>${status}`);
    },

    // Resize
    resize_news: function () {
      $(".container__inner").toggleClass("container__inner--large");
      const status = ($(".instapaper-links").hasClass("large-6")) ? " Large" : " Default";
      start.notifications(`<span>News Resized</span>${status}`);
    },

    // Animation on Leave & Alert Check if Media is Playing
    bye_bye: function () {
      $(window).on("beforeunload", function () {
        const media_playing = start.audio && !start.audio.paused || start.video && start.video.getPlayerState() === 1;
        if (media_playing) {
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
