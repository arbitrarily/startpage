(function (root, $) {
  "use strict";

  var start = {

    // Version Number
    version: "1.16.32",

    // Touch Events
    touch: "onontouchend" in document.documentElement ? "ontouchend" : "click",

    // Animation Time
    animation_time: 333,

    // Keyboard Variable
    down: {},

    // Config
    conf: false,

    // Counts
    count: false,
    feed_count: false,
    timer: {},
    progress_bar: 0,

    // Pageviews
    pageviews: false,

    // Wallet Balance
    balance: false,

    // Art
    art_url: false,
    art_num: false,

    // Media
    video: false,
    audio: new Audio(),

    // NFTs
    nfts_collection: false,

    // Menu HTML
    menu_html: $(".menu-links-source").html(),

    // Shared Class Names
    s: "shown",
    h: "hidden",

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
      () => start.instapaper(),
      () => start.news(),
      () => start.nyt(),
      () => start.reddit(),
      () => start.podcasts(),
      () => start.music(),
      () => start.yt(),
      () => start.poe(),
      () => start.nft_summaries(),
      () => start.lexichronic(),
      () => start.nfts(),
      () => start.play_single(),
      () => start.play_playlist(),
      () => start.audio_rewind(),
      () => start.media_toggle(),
      () => start.audio_fast_forward(),
      () => start.audio_mute(),
      () => start.background(),
      () => start.toggle_blur(),
      () => start.change_art_source()
    ],

    // Init
    init: function () {

      // Version Number
      start.version_number();

      // Background Image Number
      start.art_num = this.random_numb(1, 291).toString().padStart(4, "0");

      // Pageview Counter
      this.pageview_counter();

      // Key Listeners
      this.key_listener();

      // Background Image
      this.background();
      setInterval(start.background, 1000 * 60 * 5)

      // Remove Menu Source HTML
      this.remove_html();

      // Wallet Value
      this.wallet();

      // Instapaper
      this.instapaper(true);

      // Get Last FM Now Playing
      this.lastfm();
      setInterval(start.lastfm, 1000 * 60 * 3)

      // Search
      this.click_focus_search();
      this.change_search();
      this.focus_search();

      // Menu
      this.menu_clicks();
      this.menu_toggle();

      // Animation on Leave
      this.bye_bye();

      // Add Event Listeners
      this.media_events();
      this.timer_media_toggle();

      // IP
      this.ip();

      // Output into Console
      this.console_log();
    },

    // Load Config, then Init
    load_config: () => {
      fetch('./conf.json')
        .then(response => response.json())
        .then(conf => {
          // Store Config
          start.conf = conf;
          start.art_url = conf.artThumbURL;
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

    // Focus Search
    focus_search: () => $(document).find("#search").focus().addClass("focus"),

    // Remove Source HTML
    remove_html: () => $(".menu-links-source").remove(),

    // Function Triggers by Keyboard Combos
    key_listener: () => {
      $(document).keydown( e => {
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
          } else if (start.down[54]) { // NFT News        (shift + 6️⃣)
            start.feed_count = 5;
          } else if (start.down[55]) { // YouTube         (shift + 7️⃣)
            start.feed_count = 6;
          } else if (start.down[56]) { // Path of Exile   (shift + 8️⃣)
            start.feed_count = 7;
          } else if (start.down[57]) { // Music           (shift + 9️⃣)
            start.feed_count = 8;
          } else if (start.down[48]) { // NFTs            (shift + 0️⃣)
            start.feed_count = 10;
          } else if (start.down[173]) { // Lexichronic    (shift + "-")
            start.feed_count = 9;
          }
          // Switch Feed Source
          if (Number.isInteger(start.feed_count)) start.feeds[start.feed_count]();
          // Audio: Fast Forward                          (shift + ⏩)
          if (start.down[39]) start.audio_fast_forward();
          // Audio: Rewind                                (shift + ⏪)
          if (start.down[37]) start.audio_rewind();
          // Audio: Increased Playback Speed              (shift + ⏫)
          if (start.down[38]) start.audio_more_speed();
          // Audio: Decreased Playback Speed              (shift + ⏬)
          if (start.down[40]) start.audio_less_speed();
          // Audio: Play/Pause                            (shift + "space")
          if (start.down[32]) start.media_toggle();
          // Audio: Mute                                  (shift + "m")
          if (start.down[77]) start.audio_mute();
          // Video: Fullscreen Toggle                     (shift + "f")
          if (start.down[70]) start.fullscreen_video();
          // Music: Randomized Playlist                   (alt + "f11")
          if (start.down[122]) start.play_playlist();
          // Music: Random Song                           (alt + "f12")
          if (start.down[123]) start.play_single();
        } else {
          // Menu: Toggle                                 (⏪ or ⏩)
          if (start.down[39] || start.down[37]) start.slide_menu();
          // Close Fullscreen Video                       ("esc")
          if (start.down[27]) {
            if ($(".container__overflow").hasClass("fullscreen")) start.fullscreen_video();
          }
        }
        // Alt/Option
        if (start.down[18]) {
          e.preventDefault();
          if (start.down[49]) { // Path of Exile          (alt + 1️⃣)
            start.count = 0;
          } else if (start.down[50]) { // YouTube         (alt + 2️⃣)
            start.count = 1;
          } else if (start.down[51]) { // DuckDuckGo      (alt + 3️⃣)
            start.count = 2;
          } else if (start.down[52]) { // Apple Music     (alt + 4️⃣)
            start.count = 3;
          } else if (start.down[53]) { // LastFM          (alt + 5️⃣)
            start.count = 4;
          } else if (start.down[54]) { // Twitter         (alt + 6️⃣)
            start.count = 5;
          } else if (start.down[55]) { // Google News     (alt + 7️⃣)
            start.count = 6;
          } else if (start.down[56]) { // Github          (alt + 8️⃣)
            start.count = 7;
          } else if (start.down[57]) { // MidJourney      (alt + 9️⃣)
            start.count = 8;
          } else if (start.down[48]) { // Google          (alt + 0️⃣)
            start.count = 9;
          }
          // Switch Search Source
          if (Number.isInteger(start.count)) start.search_switcher(start.searches[start.count]);
          // Toggle Cursor                                (alt + 🔙)
          if (start.down[8]) start.toggle_cursor();
          // Change Art Source To Full Resolution         (alt + "z")
          if (start.down[90]) start.change_art_source();
          // Update LastFM                                (alt + "x")
          if (start.down[88]) {
            start.lastfm();
            start.notifications("Fetched <span>Last.fm</span>");
          }
          // Toggle Menu                                  (alt + "c")
          if (start.down[67]) start.menu();
          // Refresh Background Image                     (alt + "v")
          if (start.down[86]) start.background();
          // Blur                                         (alt + "b")
          if (start.down[66]) start.toggle_blur();
          // Wallet Status                                (alt + "n")
          if (start.down[78]) start.console_wallet();
        }
      }).keyup( e => {
        // Reset Key on Key Up
        start.down[e.keyCode] = false;
      });
    },

    // Slide Menu Toggle
    slide_menu: () => $(".container__overflow").toggleClass(start.s),

    // Menu
    menu: () => {
      $(".feed-links").removeClass(start.s);
      start.feed_toggle(start.menu_html, "Menu Toggles");
    },

    // Menu Click Events
    menu_clicks: function () {
      $(document).on(start.touch, ".menu-links__item, .menu-links__toggle", function (e) {
        e.preventDefault();
        start.feed_count = $(this).data("id");
        if (Number.isInteger(start.feed_count)) start.feeds[start.feed_count]();
      });
    },

    // Trigger Menu on Hambuger Click
    menu_toggle: () => {
      $(document).on(start.touch, ".menu-toggle", e => {
        e.preventDefault();
        start.menu();
      });
    },

    // Notifications
    notifications: text => {
      const noti = $(".notifications");
      if (noti.hasClass(start.h)) noti.removeClass(start.h);
      noti.find(".notifications__inner").html(text);
      const timeout_id = setTimeout( () => { noti.addClass(start.h) }, start.animation_time * 6);
      if (timeout_id) clearTimeout(start.timeout_id);
    },

    // Load Background Image
    background: function (num = false) {
      const bg = $(".background-image");
      if (!num) start.art_num = start.random_numb(1, 291).toString().padStart(4, "0").toString();
      bg.addClass(start.h);
      setTimeout(() => {
        bg.attr("src", start.art_url + start.art_num + ".png");
        bg.one("load", () => bg.removeClass(start.h)).each(() => {
          if (this.complete) $(this).trigger('load');
        });
      }, start.animation_time * 3);
      if (!num) start.notifications(`<span>New Background</span> #${start.art_num} <span>Loaded</span>`);
    },

    // Change Background Art Resolution
    change_art_source: () => {
      start.art_url = start.art_url === start.conf.artThumbURL ? start.conf.artURL : start.conf.artThumbURL;
      const message = start.art_url.replace("https://marko.tech/", "").replace(/\/$/, "");
      start.background(true);
      start.notifications(`<span>Background Source Changed To</span> ${message}`);
    },

    // Toggle Blur on Background Image
    toggle_blur: () => {
      $(".background-image").toggleClass("deblur");
      const status = ($(".background-image").hasClass("deblur")) ? " Off" : " On";
      start.notifications(`<span>Blurred Background</span>${status}`);
    },

    // IP
    ip: () => {
      fetch('https://ipinfo.io/json?token=' + start.conf.ipKey)
        .then(res => res.json())
        .then(res => res)
        .then(ip => {
          const region = (ip.country === "US") ? ip.region : ip.country;
          const msg = ip.ip.slice(0, 16) + " - " + ip.city + ", " + region;
          $(".ip-replace").text(msg);
          $(".ip div").addClass(start.s);
        }).catch(error => { $(".ip").hide() });
    },

    // LastFM Song
    lastfm: () => {
      $.when(start.conf).then(() => {
        fetch(start.conf.lastFMURL)
          .then(res => res.json())
          .then(res => res)
          .then(song => {
            const count = song["recenttracks"]["@attr"]["total"];
            $.when(count && start.pageviews).then(() => {
              setTimeout(() => {
                $(".songs-replace").text(start.format_numb(count).trim().toString());
                $(".songs").addClass(start.s);
              }, start.animation_time * 3);
            });
            const s = song["recenttracks"]["track"].map(_map_it)[0];
            const media_playing = start.audio && !start.audio.paused || start.video && start.video.getPlayerState() === 1;
            if (!media_playing) {
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
        const _map_it = song => ({
          id: song.mbid,
          name: song.name,
          album: song.album["#text"],
          artist: song.artist["#text"],
          image: song.image[3]["#text"],
          link: song.url
        });
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
      artist.text(data.artist).attr("title", `Artist: ${data.artist}`);
      song.text(data.name).attr("title", `Song: ${data.name}`);
      album.text(data.album ? ` - ${data.album}` : "").attr("title", data.album ? `Album: ${data.album}` : "");
      image.toggle(data.image != null).attr("src", data.image);
      url.attr("href", data.link ? data.link : "#").addClass(start.s);
      container.show();
      if (source) start.notifications(`Now Playing <span>${source}</span>`);
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
      start.notifications(`<span>Search Switched to </span> ${type}`);
    },

    // Feed Toggle Animation
    feed_toggle: (html, source) => {
      if (start.video === YT.PlayerState.PLAYING) start.media_stop();
      setTimeout(() => { $(".feed-links").replaceWith(html) }, 600);
      setTimeout(() => { $(".feed-links").addClass(start.s) }, 1000);
      if (source) {
        start.notifications(`<span>Feed Switched to</span> ${source}`);
        if (!$(".container__overflow").hasClass(start.s)) start.slide_menu();
      }
    },

    // Replace News
    fetch_news: (url, source) => {
      fetch(url + '?t=' + start.timestamp())
        .then(response => {
          $(".feed-links").removeClass(start.s);
          return response.text();
        })
        .then(html => {
          if (html) start.feed_toggle(html, source)
        })
        .catch(err => $(".feed-links").addClass(start.s));
      start.feed_count = false;
      if (!$(".feed-links").hasClass("video-links")) start.video = false;
    },

    // Instapaper Home Feed
    instapaper: skip => start.fetch_news(start.conf.instapaperURL, skip ? false : "Instapaper"),

    // News Home Feed
    news: () => start.fetch_news(start.conf.techmemeURL, "All News"),

    // NYT Home Feed
    nyt: () => start.fetch_news(start.conf.nytURL, "New York Times"),

    // Reddit Home Feed
    reddit: () => start.fetch_news(start.conf.redditURL, "Reddit"),

    // NFTs Home Feed
    nfts: () => start.fetch_news(start.conf.alchemyURL, "NFTs"),

    // Lexichronic Home Feed
    lexichronic: () => start.fetch_news(start.conf.lexiURL, "Lexichronic"),

    // NFT News Summaries
    nft_summaries: () => start.fetch_news(start.conf.nftNewsURL, "NFT News"),

    // Path of Exile Home Feed
    poe: () => start.fetch_news(start.conf.poeURL, "Path of Exile"),

    // Podcasts Home Feed
    podcasts: () => {
      start.fetch_news(start.conf.podURL, "Podcasts");
      start.play_audio();
    },

    // Music Home Feed
    music: () => {
      start.fetch_news(start.conf.xPlaylistHTMLURL, "Music");
      start.play_audio();
    },

    // YouTube Home Feed
    yt: () => {
      start.fetch_news(start.conf.youTubeURL, "YouTube");
      start.yt_click();
    },

    // Media Based Event Listeners
    media_events: function () {
      // Audio Events
      start.audio.addEventListener("play", () => {
        if (start.video) start.video.pauseVideo();
      });
      start.audio.addEventListener("ended", () => {
        start.media_ended();
        start.notifications("<span>Audio</span> Finished Playing");
        start.audio = new Audio();
        start.timer = {};
      });
      // Video Events
      if (start.video) {
        start.video.addEventListener('onStateChange', event => {
          if (event.data === YT.PlayerState.ENDED) {
            start.timer = {};
            start.yt();
            start.media_ended();
            start.notifications("<span>Video</span> Finished Playing");
            if ($(".container__overflow").hasClass("fullscreen")) start.fullscreen_video();
            if (!$(".feed-links").hasClass("video-links")) start.video = false;
          }
          if (event.data === YT.PlayerState.PAUSED) {
            start.notifications("<span>Video</span> Paused");
            $(".podcasts img").attr("src", "icons/icon__pause.svg");
            $(".feed-links .menu-links__item-pause img").attr("src", "icons/icon__play.svg");
            if (!$(".feed-links").hasClass("video-links")) start.video = false;
          }
          if (event.data === YT.PlayerState.PLAYING) {
            start.notifications("<span>Video</span> Playing");
            $(".podcasts img").attr("src", "icons/icon__play.svg");
            $(".feed-links .menu-links__item-pause img").attr("src", "icons/icon__pause.svg");
          }
        });
      }
    },

    // Media: Reset Timer & Progress Bar
    media_ended: () => {
      start.timer = {};
      $(".podcasts").removeClass(start.s);
      $(".progress").css('width', '0%');
      $("#search").removeClass("full");
      $(".podcasts-replace").text('0:00');
    },

    // Media: Stop
    media_stop: () => {
      start.media_ended();
      if (start.video) {
        start.video.pauseVideo();
        start.video = false;
      }
      if (start.audio) {
        start.audio.pause();
        start.audio.src = "";
        start.audio = new Audio();
      }
    },

    // Media: Pause
    media_pause: () => {
      if (start.video && start.video === YT.PlayerState.PLAYING) {
        start.video.pauseVideo();
      }
      if (!start.audio.paused) start.audio.pause();
    },

    // Media: Play
    media_play: () => {
      if (start.video && start.video === YT.PlayerState.PAUSED) {
        start.video.playVideo();
      }
      if (!start.audio.paused) start.audio.play();
      if (!$(".podcasts").hasClass(start.s)) $(".podcasts").addClass(start.s);
    },

    // Start YouTube Video
    yt_start: video_id => {
      start.video = new YT.Player('video-container', {
        height: '360',
        width: '640',
        videoId: video_id,
        playerVars: {
          'autoplay': 1,
          'controls': 1,
          'modestbranding': 1,
          'rel': 0,
          'showinfo': 0
        },
        events: {
          'onReady': start.media_timer,
        }
      });
      start.media_events();
    },

    // Open Youtube Video in Modal
    yt_click: function () {
      $(document).on(start.touch, ".video-links a", function (e) {
        e.preventDefault();
        const that = $(this),
          targets = $(".feed-container, .feed-list");
        if (!targets.hasClass(start.s)) targets.addClass(start.s);
        start.media_stop();
        start.yt_start(that.data("id"));
        const vid_data = {
          id: that.data("id"),
          name: that.data("title"),
          album: "",
          artist: that.data("feed"),
          image: that.find("img").attr("src"),
          link: that.attr("href")
        }
        start.now_playing(vid_data, vid_data.name);
      });
    },

    // Video: Fullscreen Toggle
    fullscreen_video: function () {
      const v = $(".video-links .feed-list, .container__overflow"),
        vl = $(".video-links"),
        fs = v.hasClass("fullscreen") ? "Fullscreen Off" : "Fullscreen";
      vl.removeClass(start.s);
      setTimeout(() => { v.toggleClass("fullscreen") }, 600);
      setTimeout(() => { vl.addClass(start.s) }, 1000);
      start.notifications(`Video <span>${fs}</span>`);
    },

    // Audio: Play Single Track
    play_single: function (url) {
      start.media_stop();
      let number = start.random_numb(1, 13);
      if (!url) {
        start.audio.src = start.conf.xURL + number + ".mp3";
      } else {
        number = start.random_numb(1, 268);
        start.audio.src = url;
      }
      start.audio.playbackRate = 1;
      start.audio.play();
      start.media_timer();
      const song_data = {
        id: "",
        name: "Song #" + number,
        album: "",
        artist: "Lofi Girl",
        image: "icons/icon__lofi-girl.jpg",
        link: "https://www.youtube.com/@LofiGirl"
      }
      start.now_playing(song_data, false);
      start.notifications(`Now Playing <span>${start.conf.x}</span> #${number}`);
      if (!$("#search").hasClass("full")) $("#search").addClass("full");
    },

    // Audio: Play X Playlist
    play_playlist: function () {
      start.media_stop();
      fetch(start.conf.xPlaylistJSONURL + '?t=' + start.timestamp())
        .then(res => res.json())
        .then(x => {
          for (let i = x.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [x[i], x[j]] = [x[j], x[i]];
          }
          if (x) {
            async function x_pl() {
              for (var i = 0; i < 20; i++) {
                start.play_single(x[i]);
                await new Promise(resolve => {
                  start.audio.addEventListener('ended', () => {
                    resolve();
                  });
                });
              }
            }
            x_pl();
          }
        })
        .catch(err => start.media_stop());
    },

    // Audio: Play
    play_audio: function () {
      $(document).on(start.touch, ".podcast-links li a", function (e) {
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
        start.now_playing(song_data, `${a.text().trim().slice(0, 75) + "..."}`);
        if (!$("#search").hasClass("full")) $("#search").addClass("full");
      });
    },

    // Audio: Pause on Click of Timer
    timer_media_toggle: () => {
      $(document).on(start.touch, ".podcasts", e => {
        e.preventDefault();
        start.media_toggle();
      });
    },

    // Audio: Toggle Mute
    audio_mute: () => {
      start.audio.muted = !start.audio.muted;
      const status = start.audio.muted ? "Muted" : "Unmuted";
      const icon = start.audio.muted ? "unmuted" : "mute";
      $(".feed-links .menu-links__item-mute img").attr("src", "icons/icon__" + icon + ".svg");
      start.audio.muted ? $(".mute").addClass(start.s) : $(".mute").removeClass(start.s);
      if (start.video) start.video.isMuted() ? start.video.unMute() : start.video.mute();
      start.notifications(`<span>Audio</span> ${status}`);
    },

    // Audio: Rewind
    audio_rewind: (val = 5) => {
      if (!start.audio.paused) start.audio.currentTime -= val;
      if (start.video && start.video.getPlayerState() === 1) start.video.seekTo(start.video.getCurrentTime() - val);
      start.notifications(`<span>Audio</span> Rewind <span>-${val} seconds</span>`);
    },

    // Audio: Fast Forward
    audio_fast_forward: (val = 15) => {
      if (!start.audio.paused) start.audio.currentTime += val;
      if (start.video && start.video.getPlayerState() === 1) start.video.seekTo(start.video.getCurrentTime() + val);
      start.notifications(`<span>Audio</span> Fast Forward <span>+${val} seconds</span>`);
    },

    // Audio: Faster Playback
    audio_more_speed: () => {
      if (!start.audio.paused) {
        start.audio.playbackRate += 0.1;
        start.notifications(`<span>Audio</span> Playback Rate <span>${start.audio.playbackRate.toFixed(2)}x</span>`);
      }
    },

    // Audio: Slower Playback
    audio_less_speed: () => {
      if (!start.audio.paused) {
        start.audio.playbackRate -= 0.1;
        start.notifications(`<span>Audio</span> Playback Rate <span>${start.audio.playbackRate.toFixed(2)}x</span>`);
      }
    },

    // Media: Timer
    media_timer: () => {
      let elapsed = 0;
      let tr = 0;
      setInterval(() => {
        let last_second = start.timer.seconds;
        try {
          if (start.video && start.video.getPlayerState() === YT.PlayerState.PLAYING) {
            elapsed = start.video.getDuration() - start.video.getCurrentTime();
            tr = elapsed > 0 ? elapsed : 0;
            start.progress_bar = (start.video.getCurrentTime() / start.video.getDuration()).toFixed(3);
          }
          if (!start.audio.paused) {
            elapsed = start.audio.duration - start.audio.currentTime;
            tr = elapsed > 0 ? elapsed : 0;
            start.progress_bar = (start.audio.currentTime / start.audio.duration).toFixed(3);
          }
          start.timer = {
            minutes: Math.floor(tr / 60),
            seconds: Math.floor(tr % 60),
            padded_time: Math.floor(tr % 60) < 10 ? '0' + Math.floor(tr % 60).toString() : Math.floor(tr % 60)
          }
          // Update Time
          if (start.timer.seconds && last_second > start.timer.seconds) {
            if (!$(".podcasts").hasClass(start.s) && start.timer.seconds > 0) $(".podcasts").addClass(start.s);
            $(".podcasts-replace").text(start.timer.minutes + ':' + start.timer.padded_time);
            start.progress_bar = Math.min(Math.max((start.progress_bar * 100).toFixed(3), 1), 100);
            $(".progress").css('width', start.progress_bar + '%');
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

    // Audio: Play/Pause
    audio_toggle: () => {
      if (!start.audio.paused) {
        start.audio.pause();
        $(".podcasts img").attr("src", "icons/icon__pause.svg");
        $(".feed-links .menu-links__item-pause img").attr("src", "icons/icon__play.svg");
        start.notifications("<span>Audio</span> Paused");
      } else {
        start.audio.currentTime = start.audio.currentTime - 3;
        $(".podcasts img").attr("src", "icons/icon__play.svg");
        $(".feed-links .menu-links__item-pause img").attr("src", "icons/icon__pause.svg");
        start.notifications("<span>Audio</span> Playing");
        start.audio.play();
      }
    },

    // Toggle Video Play / Pause
    video_toggle: () => {
      try {
        if (start.video && start.video.getPlayerState() === 1) {
          start.video.pauseVideo();
          start.notifications("<span>Video</span> Paused");
        } else {
          start.notifications("<span>Video</span> Playing");
          start.video.playVideo();
        }
      } catch (e) {
        return;
      }
    },

    // Page View Counter
    pageview_counter: () => {
      fetch(start.conf.counterURL + '?t=' + start.timestamp())
        .then(res => res.text() )
        .then(number => {
          if (number) {
            setTimeout(() => {
              start.pageviews = number.trim().toString().slice(0, 10);
              $(".counter-replace").text(start.pageviews);
              $(".counter").addClass(start.s);
            }, start.animation_time * 2);
          }
        })
        .catch(err => {
          $(".counter").remove();
          start.pageviews = true;
        });
    },

    // Primary Wallet Status
    wallet: () => {
      fetch(start.conf.ethplorerURL + '?t=' + start.timestamp())
        .then(res => res.json())
        .then(res => {
          start.balance = res["ETH"]["totalIn"].toString();
          var balance_formatted = (res["ETH"]["totalIn"]).toFixed(3);
          var balance_diff = res["ETH"]["price"]["diff"];
          var formatted = (balance_diff > 0 ? " (+" + balance_diff + "%)" : " (" + balance_diff + "%)");
          if (start.balance) {
            $(".wallet-replace").text((balance_formatted + formatted).toString());
            $(".wallet").addClass(start.s);
            start.nfts_collection = res['ETH']['price'];
          }
        });
    },

    // Console Log Wallet Status
    console_wallet: () => {
      console.log(start.nfts_collection)
      start.notifications("Console.log <span>Wallet</span> Stats");
    },

    // Change Search on Click
    change_search: () => {
      $("#searchform label").on(start.touch, function () {
        start.count = start.count < start.searches.length - 1 ? start.count + 1 : 0;
        start.search_switcher(start.searches[start.count]);
      });
    },

    // Focus Search if Clicking Anything Not a Link or Input
    click_focus_search: () => {
      if (window.matchMedia("(min-width: 40em)").matches) {
        $(document).on(start.touch, e => {
          if (e.target.tagName !== "A" &&
            e.target.tagName !== "INPUT" &&
            e.target.className !== "menu-toggle"
          ) start.focus_search();
        });
      }
    },

    // Reset Mouse Cursor
    toggle_cursor: () => {
      $("body").toggleClass("vaal");
      const status = ($("body").hasClass("vaal")) ? " On" : " Off";
      start.notifications(`<span>Cursor Toggled</span>${status}`);
    },

    // Animation on Leave & Alert Check if Media is Playing
    bye_bye: () => {
      $(window).on("beforeunload", function () {
        const media_playing = !start.audio.paused || start.video && start.video.getPlayerState() === 1;
        if (media_playing) {
          const result = window.confirm("Media is still playing, sure you want to leave?");
          if (result) {
            $("body").css("opacity", 0);
          } else {
            return false;
          };
        } else {
          $("body").css("opacity", 0);
        }
      });
    },

    // Console Log Attribution
    console_log: () => {
      console.log(
        "%cMarko Bajlovic",
        "background-color:#fff;color:#0b0b0b;padding:0.85em 0.5em;font-weight:900;line-height:1.5em;font-size:2em;"
      );
    },

    // Version
    version_number: () => {
      // fetch request
      let commits = "";
      fetch(start.conf.githubURL + "&t=" + start.timestamp())
        .then(res => res.json())
        .then(res => { if (res[0]) commits = " (" + res[0].contributions + ")" });
      setTimeout(() => {
        $(".version-target").text(start.version.toString() + commits).parent().addClass(start.s);
      }, start.animation_time * 6);
    }

  };

  // Init
  start.load_config();

})(this, jQuery);
