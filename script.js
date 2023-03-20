(function (root, $) {
  "use strict";

  var start = {
    an: false, // Art Number
    as: false, // Audio Source
    at: 333, // Animation Time
    audio: new Audio(), // Audio
    au: false, // Art URL
    balance: false, // Wallet Balance
    cache: {}, // Cached HTML
    c: false, // Config
    count: false, // Search Count
    d: {}, // Keyboard Variable
    fc: false, // Feed Count
    h: "hidden", // Shared Class Names
    mh: $(".menu-links-source").html(), // Menu HTML
    nc: false, // NFT Collection
    pb: 0, // Progress Bar
    pj: false, // Playlist Content
    pll: 0, // Playlist Length
    pv: false, // Pageviews
    s: "shown", // Shared Class Names
    t: "ontouchend" in document.documentElement || "click", // Touch Events
    timer: {}, // Timer Count
    v: "1.23.7", // Version Number
    vaa: false, // Video as Audio
    video: false, // Video

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

    // Mapped Functions
    mf: [
      () => start.instapaper(),
      () => start.news(),
      () => start.nyt(),
      () => start.reddit(),
      () => start.podcasts(),
      () => start.play_music(),
      () => start.play_video(),
      () => start.poe(),
      () => start.industry_news(),
      () => start.lexi(),
      () => start.nfts(),
      () => start.play_single(),
      () => start.play_playlist(),
      () => start.audio_rewind(),
      () => start.media_toggle(),
      () => start.audio_ff(),
      () => start.audio_mute(),
      () => start.background(),
      () => start.blur(),
      () => start.art_source(),
      () => start.play_playlist_input(),
      () => start.audio_volume(),
      () => start.lastfm(),
      () => start.dev_news(),
      () => start.resize_feed_images()
    ],

    // Init
    init: function () {
      start.version(); // Version Number
      start.an = this.random_numb(1, 243).toString().padStart(4, "0"); // Background Art Number
      this.pageview_counter(); // Pageview Counter
      this.key_listener(); // Key Listeners
      this.background(); // Background Image
      this.strip_menu(); // Remove Menu Source HTML
      this.wallet(); // Wallet Value
      this.init_fetch(); // Initial Feed
      this.lastfm(); // Get Last FM Now Playing
      this.focus_click(); // Search Focus
      this.change_search();  // Search Change
      this.focus(); // Focus on Search
      this.menu_clicks(); // Menu Clicks
      this.menu_toggle(); // Menu Toggle
      this.help_toggle(); // Help Toggle
      this.bye(); // Run Before Leaving Page
      this.timer_media_toggle(); // Add Event Listeners
      this.ip(); // IP
      this.log(); // Output into Console
      this.rerun_functions(); // Cron Functions
      this.marquee_title(); // Marquee Title
    },

    // Load Config, then Init
    config: () => {
      fetch('./conf.json')
        .then(response => response.json())
        .then(conf => {
          // Store Config
          start.c = conf;
          start.au = conf.artThumbURL;
          // Init
          start.init();
        })
        .catch(() => $(".feed-links").addClass(start.s));
    },

    // Random Number in a Range
    random_numb: (min, max) => Math.floor(Math.random() * (max - min + 1) + min),

    // Prettify Numbers
    format_numb: numb => numb.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),

    // Timestamp for Breaking Cached URLs
    timestamp: () => ~~(new Date().getTime() / 1000),

    // Shuffle Array
    shuffle_array: arr => {
      for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
      }
    },

    // Focus Search
    focus: () => $(document).find("#search").focus().addClass("focus"),

    // Remove Source HTML
    strip_menu: () => $(".menu-links-source").remove(),

    // Function Triggers by Keyboard Combos
    key_listener: () => {
      $(document).keydown(e => {
        // Key Down
        start.d[e.keyCode] = true;
        // Left Shift
        if (start.d[16]) {
          e.preventDefault();

          // Switch Feed Source
          const keys_map = {
            49: 0, // Instapaper                          (shift + 1️⃣)
            50: 1, // News                                (shift + 2️⃣)
            51: 2, // New York Times                      (shift + 3️⃣)
            52: 3, // Reddit                              (shift + 4️⃣)
            53: 4, // Podcasts                            (shift + 5️⃣)
            54: 5, // NFT News                            (shift + 6️⃣)
            55: 6, // YouTube                             (shift + 7️⃣)
            56: 7, // Path of Exile                       (shift + 8️⃣)
            57: 8, // Music                               (shift + 9️⃣)
            48: 23, // Dev News                           (shift + 0️⃣)
            173: 9, // Lexichronic                        (shift + "-")
            61: 10, // NFTs                               (shift + "=")
          };
          const kcc = Object.keys(keys_map).find(key => start.d[key]);
          start.fc = keys_map ? keys_map[kcc] : start.fc;
          if (!$(".feed-container").hasClass("fullscreen")) {
            if (Number.isInteger(start.fc)) start.mf[start.fc]();
          }

          // Audio Controls
          // Fast Forward: shift + ⏩
          if (start.d[39]) start.audio_ff();

          // Rewind: shift + ⏪
          if (start.d[37]) start.audio_rewind();

          // Increase Playback Speed: shift + ⏫
          if (start.d[38]) start.audio_more_speed();

          // Decrease Playback Speed: shift + ⏬
          if (start.d[40]) start.audio_less_speed();

          // Play/Pause: shift + "space"
          if (start.d[32]) start.media_toggle();

          // Mute: shift + "m"
          if (start.d[77]) start.audio_mute();

          // Volume: shift + "v"
          if (start.d[86]) start.audio_volume();

          // Video Controls
          // Fullscreen Toggle: shift + "f"
          if (start.d[70]) start.video_fullscreen();

          // Music Controls
          // Random Song: shift + "f12"
          if (start.d[123]) start.play_single();

          // Randomized Playlist: shift + "f11"
          if (start.d[122]) start.play_playlist();

          // Toggle Playlist Control Limit: shift + "f10"
          if (start.d[121]) start.play_playlist_input();

          // Play the Ambient Song: shift + "f10"
          if (start.d[120]) start.play_ambient_song();

          // Other Controls
          // Toggle Cursor: shift + 🔙
          if (start.d[8]) start.cursor();

          // Toggle Menu: shift + "z"
          if (!$(".feed-container").hasClass("fullscreen") && start.d[90]) start.menu();

          // Update LastFM: shift + "x"
          if (start.d[88]) {
            start.lastfm();
            start.notify("Fetched <span>Last.fm</span>");
          }

          // Refresh Background Image: shift + "c"
          if (start.d[67]) start.background();

          // Blur: shift + "b"
          if (start.d[66]) start.blur();

          // Wallet Status: shift + "n"
          if (start.d[78]) start.log_wallet();


          // Resize Feed Images: shift + "."
          if (start.d[190]) start.resize_feed_images();

          // Resize Container: shift + "/"
          if (start.d[191]) start.resize_container();

          // Help Shortcuts: shift + "h"
          if (start.d[72]) start.shortcuts();

          // Toggle Audio Player: shift + "t"
          if (start.d[84]) start.switch_audio_source();

        } else {

          // Menu: Toggle                                 (⏪ or ⏩)
          if (start.d[39] || start.d[37]) start.slide_menu();

          // Close Fullscreen Video                       ("esc")
          if (start.d[27]) {
            if ($(".feed-container").hasClass("fullscreen")) start.video_fullscreen();
            if ($(".shortcuts").hasClass(start.s)) start.shortcuts();
          }
        }

        // Alt/Option
        if (start.d[18]) {
          e.preventDefault();

          // Switch Search Source
          const keys_mapped = {
            49: 0, // Path of Exile                       (alt + 1️⃣)
            50: 1, // YouTube                             (alt + 2️⃣)
            51: 2, // DuckDuckGo                          (alt + 3️⃣)
            52: 3, // Apple Music                         (alt + 4️⃣)
            53: 4, // LastFM                              (alt + 5️⃣)
            54: 5, // Twitter                             (alt + 6️⃣)
            55: 6, // Google News                         (alt + 7️⃣)
            56: 7, // Github                              (alt + 8️⃣)
            57: 8, // MidJourney                          (alt + 9️⃣)
            48: 9, // Google                              (alt + 0️⃣)
          };
          const kc = Object.keys(keys_mapped).find(key => start.d[key]);
          start.count = kc ? keys_mapped[kc] : start.count;
          if (!$(".feed-container").hasClass("fullscreen")) {
            if (Number.isInteger(start.count)) start.search_switcher(start.searches[start.count]);
          }
        }
      }).keyup(e => {
        // Reset Key on Key Up
        start.d[e.keyCode] = false;
      });
    },

    // Slide Menu Toggle
    slide_menu: () => $(".container__overflow").toggleClass(start.s),

    // Menu
    menu: () => {
      $(".feed-links").removeClass(start.s);
      start.feed_toggle(start.mh, "Menu Toggles");
    },

    // Menu Click Events
    menu_clicks: function () {
      $(document).on(start.t, ".menu-links__item, .menu-links__toggle", function (e) {
        e.preventDefault();
        start.fc = $(this).data("id");
        if (Number.isInteger(start.fc)) start.mf[start.fc]();
      });
    },

    // Trigger Menu on Hambuger Click
    menu_toggle: () => {
      $(document).on(start.t, ".menu-toggle", e => {
        e.preventDefault();
        start.menu();
      });
    },

    // Toggle Help Menu
    help_toggle: () => {
      $(document).on(start.t, event => {
        if (!$(event.target).closest(".shortcuts__inner").length && $(".shortcuts").hasClass(start.s)) {
          start.shortcuts();
        }
      });
    },

    // Toggle Video Fullscreen on Click
    fullscreen_toggle: () => {
      $(document).on(start.t, event => {
        const t = $(".video-links .feed-container.fullscreen .feed-list");
        if ($(".feed-container").hasClass("fullscreen")) {
          if (t.is(event.target) && t.has(event.target).length > 0) return;
          start.video_fullscreen();
        }
      });
    },

    // Notifications
    notify: text => {
      const wait = (ms) => new Promise(resolve => setTimeout(resolve, ms)),
        first = () => {
          $(".notifications__inner").html(text);
          $(".notifications").removeClass(start.h);
        },
        last = async () => {
          await wait(start.at * 5);
          $(".notifications").addClass(start.h);
        };
      first();
      last();
    },

    // Load Background Image
    background: function (num = false) {
      const bg = $(".background-image");
      if (!num) {
        start.an = start.random_numb(1, 243).toString().padStart(4, "0").toString();
        start.notify(`<span>New Background</span> #${start.an} <span>Loaded</span>`);
      }
      bg.addClass(start.h);
      setTimeout(() => {
        bg.attr("src", start.au + start.an + ".jpg");
        bg.one("load", () => bg.removeClass(start.h)).each(() => {
          if (this.complete) $(this).trigger('load');
        });
      }, start.at * 6);
    },

    // Change Background Art Resolution
    art_source: (notfy = true) => {
      start.au = start.au === start.c.artThumbURL ? start.c.artURL : start.c.artThumbURL;
      const message = start.au.replace("https://marko.tech/", "").replace(/\/$/, "");
      start.background(true);
      if (notfy) start.notify(`<span>Background Source Changed To</span> ${message}`);
    },

    // Toggle Blur on Background Image
    blur: () => {
      if (start.au !== start.c.artURL) start.art_source(false);
      $(".background-image").toggleClass("deblur");
      const status = ($(".background-image").hasClass("deblur")) ? " Off" : " On";
      start.notify(`<span>Blurred Background</span>${status}`);
    },

    // IP
    ip: () => {
      fetch('https://ipinfo.io/json?token=' + start.c.ipKey)
        .then(res => res.json())
        .then(res => res)
        .then(ip => {
          const region = (ip.country === "US") ? ip.region : ip.country;
          const msg = ip.ip.slice(0, 16) + " - " + ip.city + ", " + region;
          $(".ip-replace").text(msg);
          $(".ip div").addClass(start.s);
        }).catch(error => { $(".ip").hide() });
    },

    // Remap Song Data
    remap_song_data: song => ({
      id: song.mbid,
      name: song.name,
      album: song.album["#text"],
      artist: song.artist["#text"],
      image: song.image[3]["#text"],
      link: song.url
    }),

    // LastFM Song
    lastfm: () => {
      $.when(start.c).then(() => {
        fetch(start.c.lastFMURL)
          .then(res => res.json())
          .then(res => res)
          .then(song => {
            const count = song["recenttracks"]["@attr"]["total"];
            $.when(count && start.pv).then(() => {
              setTimeout(() => {
                $(".songs-replace").text(start.format_numb(count).trim().toString());
                $(".songs").addClass(start.s);
              }, start.at * 3);
            });
            const s = song["recenttracks"]["track"].map(start.remap_song_data)[0];
            if (!start.media_is_playing()) {
              const song_data = {
                id: s.id,
                name: s.name,
                album: s.album,
                artist: s.artist,
                image: s.image,
                link: s.link
              }
              start.now_playing(song_data, false);
            }
          }).catch(error => $(".nowplaying__container").hide());
      });
    },

    // Change Now Playing Artwork
    now_playing: (data, source = false) => {
      const artist = $(".nowplaying__artist"),
        song = $(".nowplaying__song"),
        album = $(".nowplaying__album"),
        image = $(".nowplaying__image"),
        container = $(".nowplaying__container"),
        url = $(".nowplaying__url");
      container.addClass(start.h)
      setTimeout(() => {
        artist.text(data.artist).attr("title", `Artist: ${data.artist}`);
        song.text(data.name).attr("title", `Song: ${data.name}`);
        album.text(data.album ? `${data.album}` : "").attr("title", data.album ? `Album: ${data.album}` : "");
        image.attr("src", data.image ? data.image : "fallback.png");
        url.attr("href", data.link ? data.link : "#").addClass(start.s);
        container.show();
        container.removeClass(start.h)
      }, start.at * 2);
      if (source) start.notify(`Now Playing <span>${source}</span>`);
    },

    // Search Switcher
    search_switcher: search => {
      const action = search['action'],
        logo = search['logo'],
        name = search['name'],
        type = search['type'],
        is_mobile = window.matchMedia("(max-width: 30em)").matches;
      let text = search['text'];
      const search_text = is_mobile ? text.replace("Search ", "") : text;
      $("#searchform").attr("action", action);
      $(".search").attr("src", logo);
      $("#search").attr({
        "placeholder": search_text,
        "name": name,
        "data-type": type
      }).focus();
      start.notify(`<span>Search Switched to </span> ${type}`);
    },

    // Feed Toggle Animation
    feed_toggle: (html, source) => {
      if (start.video === YT.PlayerState.PLAYING) start.media_stop();
      setTimeout(() => { $(".feed-links").replaceWith(html) }, start.at);
      setTimeout(() => { $(".feed-links").addClass(start.s) }, start.at * 2);
      if (source) {
        start.notify(`<span>Feed Switched to</span> ${source}`);
        if (!$(".container__overflow").hasClass(start.s)) start.slide_menu();
      }
      $("body").removeClass("lock");
    },

    // Init Fetch
    init_fetch: () => {
      fetch(start.c.instapaperURL + '?t=' + start.timestamp())
        .then(response => response.text())
        .then(html => {
          if (html) {
            $(".feed-links").replaceWith(html);
            start.cache["Instapaper"] = {
              html: html,
              time: new Date().getTime()
            };
            $(".feed-links").addClass(start.s);
          }
        })
        .catch(err => $(".feed-links").addClass(start.s));
    },

    // Replace News
    fetch_news: async (url, source) => {
      $(".feed-links").removeClass(start.s);
      if (start.cache[source]) {
        const cn = start.cache[source];
        start.feed_toggle(cn.html, source);
        if (cn.time && new Date().getTime() - cn.time > 600000) {
          start.cache[source] = null;
        }
      } else {
        try {
          const response = await fetch(`${url}?t=${start.timestamp()}`);
          const html = await response.text();
          if (html) {
            start.feed_toggle(html, source);
            start.cache[source] = {
              html,
              time: new Date().getTime()
            };
          }
        } catch (err) {
          $(".feed-links").addClass(start.s);
        }
      }
      start.fc = false;
      if (!$(".feed-links").hasClass("video-links") && start.video) {
        start.media_stop();
      }
    },

    // Instapaper Home Feed
    instapaper: () => start.fetch_news(start.c.instapaperURL, "Instapaper"),

    // News Home Feed
    news: () => start.fetch_news(start.c.techmemeURL, "All News"),

    // NYT Home Feed
    nyt: () => start.fetch_news(start.c.nytURL, "New York Times"),

    // Reddit Home Feed
    reddit: () => start.fetch_news(start.c.redditURL, "Reddit"),

    // NFTs Home Feed
    nfts: () => start.fetch_news(start.c.alchemyURL, "NFTs"),

    // Lexichronic Home Feed
    lexi: () => start.fetch_news(start.c.lexiURL, "Lexichronic"),

    // NFT News Summaries
    industry_news: () => start.fetch_news(start.c.nftNewsURL, "Industry News"),

    // Path of Exile Home Feed
    poe: () => start.fetch_news(start.c.poeURL, "Path of Exile"),

    // Path of Exile Home Feed
    dev_news: () => start.fetch_news(start.c.devURL, "Developer News"),

    // Podcasts Home Feed
    podcasts: () => {
      start.fetch_news(start.c.podURL, "Podcasts");
      start.play_audio_on_click();
    },

    // Music Home Feed
    play_music: () => {
      start.fetch_news(start.c.xPlaylistHTMLURL, "Music");
      start[start.as ? 'play_music_on_click' : 'play_audio_on_click']();
    },

    // YouTube Home Feed
    play_video: () => {
      start.fetch_news(start.c.youTubeURL, "YouTube");
      start.video_click();
    },

    // Audio: Toggle Player Used
    switch_audio_source: () => {
      start.as = start.as === false ? true : false;
      const msg = start.as ? "Switched to <span>YouTube</span> Player" : "Switched to <span>HTML5</span> Player";
      start.notify(`${msg}`);
    },

    // Media: Is Any Media Playing?
    media_is_playing: () => {
      return !start.audio.paused ||
        start.video && start.video.getPlayerState() === 1 ||
        start.vaa && start.vaa.getPlayerState() === 1;
    },

    // Media Based Event Listeners
    media_events: function () {
      // Audio Events
      start.audio.addEventListener("play", () => {
        if (start.video && start.video === YT.PlayerState.PLAYING) start.video.pauseVideo();
        if (start.vaa && start.vaa === YT.PlayerState.PLAYING) start.vaa.pauseVideo();
      });
      start.audio.addEventListener("ended", () => {
        start.media_stop();
        start.notify("<span>Finished</span> Playing");
      });
      // Video Events
      if (start.video) {
        start.video.addEventListener('onStateChange', event => {
          if (event.data === YT.PlayerState.ENDED) {
            start.play_video();
            start.media_ended();
            start.notify("<span>Finished</span> Playing");
            if ($(".feed-container").hasClass("fullscreen")) start.video_fullscreen();
            if (!$(".feed-links").hasClass("video-links")) start.video.pauseVideo();
          }
          if (event.data === YT.PlayerState.PAUSED) {
            start.notify("Paused");
            $(".podcasts img").attr("src", "icons/icon__pause.svg");
            $(".feed-links .menu-links__item-pause img").attr("src", "icons/icon__play.svg");
            if (!$(".feed-links").hasClass("video-links")) start.video.pauseVideo();
          }
          if (event.data === YT.PlayerState.PLAYING) {
            start.notify("<span>Now</span> Playing");
            $(".podcasts img").attr("src", "icons/icon__play.svg");
            $(".feed-links .menu-links__item-pause img").attr("src", "icons/icon__pause.svg");
          }
        });
      }
      // Video as Audio
      if (start.vaa) {
        start.vaa.addEventListener('onStateChange', event => {
          if (event.data === YT.PlayerState.ENDED) {
            start.media_ended();
            start.notify("<span>Finished</span> Playing");
            if ($(".feed-container").hasClass("fullscreen")) start.video_fullscreen();
          }
          if (event.data === YT.PlayerState.PAUSED) {
            start.notify("Paused");
            $(".podcasts img").attr("src", "icons/icon__pause.svg");
            $(".feed-links .menu-links__item-pause img").attr("src", "icons/icon__play.svg");
            // if ($("#audio-player").contents().find("body").children().length === 0) start.vaa.pauseVideo();
          }
          if (event.data === YT.PlayerState.PLAYING) {
            start.notify("<span>Now</span> Playing");
            $(".podcasts img").attr("src", "icons/icon__play.svg");
            $(".feed-links .menu-links__item-pause img").attr("src", "icons/icon__pause.svg");
          }
        });
      }
    },

    // Media: Reset Timer & Progress Bar
    media_ended: () => {
      $(".podcasts").removeClass(start.s);
      $(".progress").css('width', '0%');
      $("#search").removeClass("full");
      setTimeout(() => {
        $(".podcasts-replace").text('0:00');
      }, start.at * 2);
    },

    // Media: Stop
    media_stop: () => {
      start.media_pause();
      if (!start.audio.paused) {
        start.audio.src = "";
        start.audio = new Audio();
      }
      start.media_ended();
    },

    // Media: Pause
    media_pause: () => {
      if (start.video && start.video === YT.PlayerState.PLAYING) {
        start.video.pauseVideo();
      }
      if (start.vaa && start.vaa === YT.PlayerState.PLAYING) {
        start.vaa.pauseVideo();
      }
      if (!start.audio.paused) start.audio.pause();
    },

    // Media: Timer
    media_timer: () => {
      // Start Events
      start.media_events();
      // Timer
      let elapsed = 0;
      let tr = 0;
      setInterval(() => {
        let last_second = start.timer.seconds;
        try {
          if (start.video && start.video.getPlayerState() === YT.PlayerState.PLAYING) {
            elapsed = start.video.getDuration() - start.video.getCurrentTime();
            tr = elapsed > 0 ? elapsed : 0;
            start.pb = (start.video.getCurrentTime() / start.video.getDuration()).toFixed(3);
          }
          if (start.vaa && start.vaa.getPlayerState() === YT.PlayerState.PLAYING) {
            elapsed = start.vaa.getDuration() - start.vaa.getCurrentTime();
            tr = elapsed > 0 ? elapsed : 0;
            start.pb = (start.vaa.getCurrentTime() / start.vaa.getDuration()).toFixed(3);
          }
          if (!start.audio.paused) {
            elapsed = start.audio.duration - start.audio.currentTime;
            tr = elapsed > 0 ? elapsed : 0;
            start.pb = (start.audio.currentTime / start.audio.duration).toFixed(3);
          }
          // Update Time
          start.timer = {
            minutes: Math.floor(tr / 60),
            seconds: Math.floor(tr % 60),
            padded_time: Math.floor(tr % 60) < 10 ? '0' + Math.floor(tr % 60).toString() : Math.floor(tr % 60)
          }
          if (start.timer.seconds && last_second > start.timer.seconds) {
            if (!$(".podcasts").hasClass(start.s) && start.timer.seconds > 0) $(".podcasts").addClass(start.s);
            $(".podcasts-replace").text(start.timer.minutes + ':' + start.timer.padded_time);
            start.pb = Math.min(Math.max((start.pb * 100).toFixed(3), 1), 100);
            $(".progress").css('width', start.pb + '%');
            last_second = start.timer.seconds;
          }
        } catch (e) {
          clearInterval();
        }
        if (start.video && $(".feed-links iframe").length === 0) {
          start.media_stop();
          clearInterval();
        }
      }, 500);
    },

    // Media: Play / Pause
    media_toggle: () => {
      start.audio_toggle();
      start.video_toggle();
    },

    // Start YouTube Video
    video_start: video_id => {
      start.video = new YT.Player('video-container', {
        height: '360',
        width: '640',
        videoId: video_id,
        playerVars: {
          'autoplay': 1,
          'controls': 1,
          'modestbranding': 1,
          'rel': 0,
          'showinfo': 0,
          'origin': window.location.href.includes("https://") ? window.location.href : null
        },
        events: {
          'onReady': start.media_timer,
        }
      });
    },

    // Start YouTube Video as Audio
    video_as_audio_start: video_id => {
      start.vaa = new YT.Player('audio-player', {
        height: '0',
        width: '0',
        videoId: video_id ? video_id : "jfKfPfyJRdk",
        playerVars: {
          'autoplay': 1,
          'controls': 0,
          'disablekb': 1,
          'iv_load_policy': 3,
          'modestbranding': 1,
          'playsinline': 1,
          'rel': 0,
          'showinfo': 0,
          'start': 0,
          'audio': 1
        },
        events: {
          'onReady': start.media_timer
        }
      });
    },

    // Video: Fullscreen Toggle
    video_fullscreen: function () {
      const v = $(".video-links .feed-list, .feed-container, .container__overflow"),
        vl = $(".video-links"),
        fs = v.hasClass("fullscreen") ? "Fullscreen Off" : "Fullscreen";
      vl.removeClass(start.s);
      setTimeout(() => { v.toggleClass("fullscreen") }, 600);
      setTimeout(() => { vl.addClass(start.s) }, 1000);
      start.fullscreen_toggle();
      $("body").toggleClass("lock");
      start.notify(`Video <span>${fs}</span>`);
    },

    // Play The 5 Hour Ambient Song I Made
    play_ambient_song: () => {
      let song_data = {
        id: start.c.ambientSongID,
        name: "5 Hours of Uplifting Ambient Music for 🛌 Sleep",
        album: "",
        artist: "Marko Bajlovic",
        image: "https://pbs.twimg.com/profile_images/745022860889034752/dHcllPsL_400x400.jpg",
        link: `https://www.youtube.com/watch?v=${start.c.ambientSongID}`
      };
      start.now_playing(song_data, false);
      start.media_stop();
      start.video_as_audio_start(song_data.id);
      start.notify(`Now Playing <span>${song_data.name}</span>`);
    },

    // Audio: Play Single Track
    play_single: (song = false, songs_left = false) => {
      let song_data = {};
      let song_title = song ? song.title : "Playlist";
      let song_artist = song ? song.channel : "YouTube";
      let song_image = song ? (song.image ? song.image : "icons/icon__lofi-girl.jpg") : "icons/icon__lofi-girl.jpg";
      let song_link = song ? song.url : "";
      let song_album = "";
      if (!song) {
        const number = start.random_numb(1, 13);
        song_data = {
          id: "",
          name: "Song #" + number,
          album: "",
          artist: "Lofi Girl",
          image: "icons/icon__lofi-girl.jpg",
          link: "https://www.youtube.com/@LofiGirl"
        };
        start.audio.src = start.c.xURL + number + ".mp3";
      } else {
        song_data = {
          id: song.id ? song.id : "",
          name: song_title,
          album: song_album,
          artist: song_artist,
          image: song_image,
          link: song_link
        }
        start.audio.src = song.media;
        song_data.album = songs_left ? (songs_left === 1 ? "Last song" : `${songs_left} songs left`) : "";
      }
      // Play audio and display information
      start.media_stop();
      start.audio.playbackRate = 1;
      start.audio.play();
      start.media_timer();
      start.now_playing(song_data, false);
      start.notify(`Now Playing <span>${song_data.name}</span>`);
      if (!$("#search").hasClass("full")) $("#search").addClass("full");

    },

    // Audio: Play Playlist
    play_playlist: (limit = 10) => {
      // Stop current media
      start.media_stop();
      // Play playlist
      const play_playlist = async (playlist, limit) => {
        for (let i = 0; i < limit; i++) {
          const song = playlist[i];
          const songs_left = limit - i > 0 ? limit - i : false;
          start.play_single(song, songs_left);
          await new Promise(resolve => {
            start.audio.addEventListener('ended', resolve, { once: true });
            $(document).on("keydown", e => {
              // Skip (Shift + S)
              if (e.shiftKey && e.which === 83) {
                if (start.audio) resolve();
              }
            });
          });
        }
        $(".nowplaying__album").text("");
      };
      // Fetch playlist if not available
      if (!start.pj) {
        fetch(start.c.xPlaylistJSONURL + '?t=' + start.timestamp())
          .then(res => res.json())
          .then(playlist => {
            start.pj = playlist;
            start.pll = playlist.length;
            start.shuffle_array(start.pj);
            play_playlist(start.pj, limit);
          })
          .catch(err => start.media_stop());
      } else {
        // Otherwise shuffle and play
        start.shuffle_array(start.pj);
        play_playlist(start.pj, limit);
      }
    },

    // Audio: Play Playlist via Prompt
    play_playlist_input: () => {
      let num;
      do {
        num = prompt('How many songs?:', '');
      } while (num !== null && (isNaN(parseInt(num)) || parseInt(num) != num));
      start.d[[16]] = false;
      start.d[[121]] = false;
      start.play_playlist(parseInt(num));
    },

    // Open Youtube Video in Modal
    video_click: function () {
      $(document).on(start.t, ".video-links a", function (e) {
        e.preventDefault();
        const that = $(this),
          targets = $(".feed-container, .feed-list");
        if (!targets.hasClass(start.s)) targets.addClass(start.s);
        start.media_stop();
        start.video_start(that.data("id"));
        start.media_timer();
        const vid_data = {
          id: that.data("id"),
          name: that.data("title"),
          album: "",
          artist: that.data("feed"),
          image: that.find("img").attr("src"),
          link: that.attr("href")
        };
        start.now_playing(vid_data, vid_data.name);
      });
    },

    // Audio: Play Music on Click
    play_music_on_click: function () {
      $(document).on(start.t, ".music-links li a", function (e) {
        e.preventDefault();
        const a = $(this);
        $(".podcasts").addClass(start.s);
        start.media_stop();
        start.video_as_audio_start(a.data('id'));
        const song_data = {
          id: a.data('id'),
          name: a.data('title'),
          album: '',
          artist: a.data('feed'),
          image: a.find("img").attr('src'),
          link: a.attr('href')
        }
        start.now_playing(song_data, `${a.text().trim().slice(0, 45) + "..."}`);
        if (!$("#search").hasClass("full")) $("#search").addClass("full");
      });
    },

    // Audio: Play
    play_audio_on_click: function () {
      $(document).on(start.t, ".podcast-links li a", function (e) {
        e.preventDefault();
        const a = $(this);
        start.media_stop();
        $(".podcasts").addClass(start.s);
        start.audio.src = a.attr("href");
        if (!$(".podcast-links").hasClass("music-links")) start.audio.playbackRate = 1.3;
        start.audio.play();
        start.media_timer();
        const song_data = {
          id: '',
          name: a.data('title'),
          album: '',
          artist: a.data('feed'),
          image: a.find("img").attr('src'),
          link: a.attr('href')
        }
        start.now_playing(song_data, `${a.text().trim().slice(0, 45) + "..."}`);
        if (!$("#search").hasClass("full")) $("#search").addClass("full");
      });
    },

    // Audio: Pause on Click of Timer
    timer_media_toggle: () => {
      $(document).on(start.t, ".podcasts", e => {
        e.preventDefault();
        start.media_toggle();
      });
    },

    // Audio: Volume Slider
    audio_volume: () => {
      const slider = $(".search__input--container-volume"),
        search = $("#search"),
        placeholder = search.attr("placeholder"),
        vol = slider.find("input.volume");
      let locked = true;
      if (locked && start.media_is_playing() && !slider.hasClass(start.s)) {
        slider.addClass(start.s);
        search.attr("placeholder", vol.val());
        vol.on("input", () => {
          if (!start.audio.paused) {
            start.audio.volume = vol.val() / 100;
            vol.value = start.audio.volume * 100;
          } else if (start.video && start.video.getPlayerState() === 1) {
            start.video.setVolume(vol.val());
            vol.value = start.video.getVolume();
          } else if (start.vaa && start.vaa.getPlayerState() === 1) {
            start.vaa.setVolume(vol.val());
            vol.value = start.vaa.getVolume();
          }
          search.attr("placeholder", vol.val());
          vol.on("mouseup", () => {
            setTimeout(() => {
              slider.removeClass(start.s);
              setTimeout(() => {
                search.attr("placeholder", placeholder);
                locked = false;
              }, start.at * 2);
            }, start.at * 4);
          });
        });
      } else {
        search.attr("placeholder", placeholder);
      }
    },

    // Audio: Toggle Mute
    audio_mute: () => {
      start.audio.muted = !start.audio.muted;
      const status = start.audio.muted ? "Muted" : "Unmuted";
      const icon = start.audio.muted ? "unmuted" : "mute";
      $(".feed-links .menu-links__item-mute img").attr("src", "icons/icon__" + icon + ".svg");
      start.audio.muted ? $(".mute").addClass(start.s) : $(".mute").removeClass(start.s);
      if (start.video) start.video.isMuted() ? start.video.unMute() : start.video.mute();
      if (start.vaa) start.vaa.isMuted() ? start.vaa.unMute() : start.vaa.mute();
      start.notify(`<span>Audio</span> ${status}`);
    },

    // Audio: Rewind
    audio_rewind: (val = 5) => {
      if (!start.audio.paused) start.audio.currentTime -= val;
      if (start.video && start.video.getPlayerState() === 1) start.video.seekTo(start.video.getCurrentTime() - val);
      if (start.vaa && start.vaa.getPlayerState() === 1) start.vaa.seekTo(start.vaa.getCurrentTime() - val);
      start.notify(`Rewind <span>-${val} seconds</span>`);
    },

    // Audio: Fast Forward
    audio_ff: (val = 15) => {
      if (!start.audio.paused) start.audio.currentTime += val;
      if (start.video && start.video.getPlayerState() === 1) start.video.seekTo(start.video.getCurrentTime() + val);
      if (start.vaa && start.vaa.getPlayerState() === 1) start.vaa.seekTo(start.vaa.getCurrentTime() + val);
      start.notify(`Fast Forward <span>+${val} seconds</span>`);
    },

    // Audio: Faster Playback
    audio_more_speed: () => {
      if (!start.audio.paused) {
        start.audio.playbackRate += 0.1;
        start.notify(`Playback Rate <span>${start.audio.playbackRate.toFixed(2)}x</span>`);
      }
    },

    // Audio: Slower Playback
    audio_less_speed: () => {
      if (!start.audio.paused) {
        start.audio.playbackRate -= 0.1;
        start.notify(`Playback Rate <span>${start.audio.playbackRate.toFixed(2)}x</span>`);
      }
    },

    // Audio: Play/Pause
    audio_toggle: () => {
      if (start.audio.paused) {
        start.audio.currentTime = start.audio.currentTime - 3;
        $(".podcasts img").attr("src", "icons/icon__play.svg");
        $(".feed-links .menu-links__item-pause img").attr("src", "icons/icon__pause.svg");
        start.notify("<span>Now</span> Playing");
        start.audio.play();
      } else {
        start.audio.pause();
        $(".podcasts img").attr("src", "icons/icon__pause.svg");
        $(".feed-links .menu-links__item-pause img").attr("src", "icons/icon__play.svg");
        start.notify("<span>Now</span> Paused");
      }
      try {
        if (start.vaa && start.vaa.getPlayerState() === YT.PlayerState.PAUSED) {
          start.notify("<span>Now</span> Playing");
          start.vaa.playVideo();
        } else {
          start.vaa.pauseVideo();
          start.notify("<span>Now</span> Paused");
        }
      } catch (e) {
        return;
      }
    },

    // Toggle Video Play / Pause
    video_toggle: () => {
      try {
        if (start.video && start.video.getPlayerState() === YT.PlayerState.PAUSED) {
          start.notify("<span>Now</span> Playing");
          start.video.playVideo();
        } else {
          start.video.pauseVideo();
          start.notify("<span>Now</span> Paused");
        }
      } catch (e) {
        return;
      }
    },

    // Page View Counter
    pageview_counter: () => {
      fetch(start.c.counterURL + '?t=' + start.timestamp())
        .then(res => res.text())
        .then(number => {
          if (number) {
            setTimeout(() => {
              start.pv = number.trim().toString().slice(0, 10);
              $(".counter-replace").text(start.pv);
              $(".counter").addClass(start.s);
            }, start.at * 2);
          }
        })
        .catch(err => {
          $(".counter").remove();
          start.pv = true;
        });
    },

    // Primary Wallet Status
    wallet: () => {
      fetch(start.c.ethplorerURL + '?t=' + start.timestamp())
        .then(res => res.json())
        .then(res => {
          start.balance = res["ETH"]["totalIn"].toString();
          var balance_formatted = (res["ETH"]["totalIn"]).toFixed(3);
          var balance_diff = res["ETH"]["price"]["diff"];
          var formatted = (balance_diff > 0 ? " (+" + balance_diff + "%)" : " (" + balance_diff + "%)");
          if (start.balance) {
            $(".wallet-replace").text((balance_formatted + formatted).toString());
            $(".wallet").addClass(start.s);
            start.nc = res['ETH']['price'];
          }
        });
    },

    // "Cron" Functions
    rerun_functions: () => {
      // Update Every 3 Minutes
      setInterval(start.lastfm, 1000 * 60 * 3)
      // Change Background Every 5 Minutes
      setInterval(start.background, 1000 * 60 * 5);
    },

    // Change Search on Click
    change_search: () => {
      $("#searchform label").on(start.t, function () {
        start.count = start.count < start.searches.length - 1 ? start.count + 1 : 0;
        start.search_switcher(start.searches[start.count]);
      });
    },

    // Focus Search if Clicking Anything Not a Link or Input
    focus_click: () => {
      if (window.matchMedia("(min-width: 40em)").matches) {
        $(document).on(start.t, e => {
          if (e.target.tagName !== "A" &&
            e.target.tagName !== "INPUT" &&
            e.target.className !== "menu-toggle"
          ) start.focus();
        });
      }
    },

    // Help Shortcuts
    shortcuts: () => {
      $(".shortcuts").toggleClass(start.s);
      $(".everything").toggleClass("blur");
      $("body").toggleClass("lock");
      if ($(".shortcuts").hasClass(start.s)) start.notify("<span>Shortcuts</span> Menu");
    },

    // Resize Feed Images
    resize_feed_images: () => {
      $(".container__content").toggleClass("large");
      start.notify(`<span>Feed Images</span> Resized`);
    },

    // Resize Container
    resize_container: () => {
      $(".everything, #video-container, .video-links").toggleClass("fluid");
      start.notify(`<span>Container</span> Resized`);
    },

    // Reset Mouse Cursor
    cursor: () => {
      $("body").toggleClass("vaal");
      const status = $("body").hasClass("vaal") ? " On" : " Off";
      start.notify(`<span>Cursor Toggled</span>${status}`);
    },

    // Marquee Title Animation
    marquee_title: () => {
      var title = $("title");
      var text = "Startpage ".repeat(15);
      setInterval(function () {
        text = text.substring(1) + text.charAt(0);
        title.text("⭐ " + text.toUpperCase());
      }, start.at);
    },

    // Animation on Leave & Alert Check if Media is Playing
    bye: () => {
      $(window).on("beforeunload", function () {
        if (start.media_is_playing()) {
          const result = window.confirm("Media is still playing, sure you want to leave?");
          if (!result) return false;
        }
        $("body").css("opacity", 0);
      });
    },

    // Console Log Wallet Status
    log_wallet: () => {
      console.log(start.nc)
      start.notify("Console.log <span>Wallet</span> Stats");
    },

    // Console Log Attribution
    log: () => {
      console.log(
        "%cMarko Bajlovic",
        "background-color:#fff;color:#0b0b0b;padding:0.85em 0.5em;font-weight:900;line-height:1.5em;font-size:2em;"
      );
    },

    // Version
    version: () => {
      // fetch request
      let commits = "";
      fetch(start.c.githubURL + "&t=" + start.timestamp())
        .then(res => res.json())
        .then(res => { if (res[0]) commits = " (" + res[0].contributions + ")" });
      setTimeout(() => {
        $(".version-target").text(start.v.toString() + commits).parent().addClass(start.s);
      }, start.at * 6);
    }

  };

  // Init
  start.config();

})(this, jQuery);
