/*
███████╗████████╗ █████╗ ██████╗ ████████╗██████╗  █████╗  ██████╗ ███████╗
██╔════╝╚══██╔══╝██╔══██╗██╔══██╗╚══██╔══╝██╔══██╗██╔══██╗██╔════╝ ██╔════╝
███████╗   ██║   ███████║██████╔╝   ██║   ██████╔╝███████║██║  ███╗█████╗
╚════██║   ██║   ██╔══██║██╔══██╗   ██║   ██╔═══╝ ██╔══██║██║   ██║██╔══╝
███████║   ██║   ██║  ██║██║  ██║   ██║   ██║     ██║  ██║╚██████╔╝███████╗
╚══════╝   ╚═╝   ╚═╝  ╚═╝╚═╝  ╚═╝   ╚═╝   ╚═╝     ╚═╝  ╚═╝ ╚═════╝ ╚══════╝
*/

(function (root, $) {
  "use strict";

  var start = {
    ac: 284,                     // Art Count
    an: false,                   // Art Number
    at: 333,                     // Animation Time
    audio: new Audio(),          // Audio
    au: false,                   // Art URL
    cache: {},                   // Cached HTML
    c: false,                    // Config
    d: {},                       // Keyboard Variable
    ding: new Audio("ding.mp3"), // Ding
    f: false,                    // Fullscreen
    fc: false,                   // Feed Count
    fs: 0,                       // Feed Slide Count
    h: "hidden",                 // Shared Class Names
    nl: 60,                      // Notification String Limit
    pb: 0,                       // Progress Bar
    pv: false,                   // Pageviews
    s: "shown",                  // Shared Class Names
    sc: false,                   // Search Count
    t: "click",                  // Touch Events
    title: "Startpage",          // Page Title
    ti: false,                   // Page Title Interval
    timer: {},                   // Timer Count
    v: "1.64.3",                 // Version Number
    vaa: false,                  // Video as Audio
    video: false,                // Video

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
      () => start.fetch_news(start.c.instapaperURL, "Instapaper"),
      () => start.fetch_news(start.c.techmemeURL, "All News"),
      () => start.fetch_news(start.c.nytURL, "New York Times"),
      () => start.fetch_news(start.c.redditURL, "Lemmy"),
      () => start.fetch_news(start.c.podURL, "Podcasts"),
      () => start.fetch_news(start.c.xPlaylistHTMLURL, "LoFi Music"),
      () => start.fetch_news(start.c.youTubeURL, "YouTube"),
      () => start.fetch_news(start.c.poeURL, "Path of Exile"),
      () => start.fetch_news(start.c.nftNewsURL, "Industry News"),
      () => start.fetch_news(start.c.steamURL, "Steam Games"),
      () => start.fetch_news(start.c.alchemyURL, "NFTs"),
      () => start.fetch_news(start.c.steamSSURL, "Steam Screenshots"),
      () => start.fetch_news(start.c.lastFMStatsURL, "LastFM Stats"),
      () => start.audio_rewind(),
      () => start.media_toggle(),
      () => start.audio_ff(),
      () => start.audio_mute(),
      () => start.background(),
      () => start.blur(),
      () => start.art_source(),
      () => start.fetch_news(start.c.artGalleryURL, "Art Gallery"),
      () => start.audio_volume(),
      () => start.lastfm(),
      () => start.fetch_news(start.c.devURL, "Developer News"),
      () => start.shortcuts(),
      () => start.fetch_news(start.c.xPlaylistMetalHTMLURL, "Metal Music"),
      () => start.fetch_news(start.c.twitterURL, "Twitter"),
      () => start.fetch_news(start.c.summaryURL, "News, Summarized"),
      () => start.fetch_news(start.c.githubFeedURL, "Github"),
      () => start.fetch_news(start.c.traktURL, "Trakt"),
      () => start.fetch_news(start.c.twitchURL, "Twitch.tv"),
      () => start.fetch_news(start.c.xPlaylistVibesHTMLURL, "Good Vibes Music"),
      () => start.scroll_links(),
      () => start.fetch_news(start.c.summariesURL, "Summaries"),
      () => start.fetch_news(start.c.youTubeWLURL, "Youtube Watch Later"),
      () => start.fetch_news(start.c.lemmyURL, "Lemmy Inbox"),
    ],

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
      fetch('./conf-openai.json')
        .then(response => response.json())
        .then(conf => {
          if (conf) {
            // Store Config
            start.c.openai = conf;
            // Load Scripts Conditionally
            start.load_js("js/prism.js");
            start.load_js("js/marked.js");
          }
        });
    },

    // Init
    init: function () {
      this.detect_section_hash();     // Detect Page (Routing)
      this.key_listener();            // Key Listeners
      this.change_search();           // Search Change Handler
      this.timer_media_toggle();      // Add Event Listeners
      this.focus_search();            // Focus on Search
      this.marquee_title(this.title); // Marquee Title
      this.steam_links();             // Launch Games on Windows Handler
      this.menu_clicks();             // Menu Click Handler
      this.video_click();             // Video Click Handler
      this.read_summaries();          // Read Summaries
      this.scroll_top_on_click();     // Scroll to Top of Feed on Click
      this.scroll_links_on_scroll();  // Scroll Feed Links on Scroll
      this.rerun_functions();         // Cron Functions
      this.the_time();                // Clock
      this.bye();                     // Run Before Leaving Page
      this.log();                     // Output into Console
      // Play Audio
      this.play_music_on_click();
      this.play_audio_on_click();
      // Background Art Number
      start.an = this.random_numb(1, start.ac).toString().padStart(4, "0");
      // Set Ding Volume
      start.ding.volume = 0.33;
      // External Request Based Functions
      this.external_requests();
    },

    // Function That Call Outside APIs
    external_requests: function () {
      this.version();                 // Version Number
      this.pageview_counter();        // Pageview Counter
      this.background();              // Background Image
      this.lastfm();                  // Get Last FM Now Playing
      this.ip();                      // IP
      this.help_toggle();             // Help Toggle
    },

    // Load Scripts Conditionally
    load_js: (url) => $.getScript(url),

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
    focus_search: () => {
      if ($("#search:focus").length > 0) return;
      $("#search").focus().addClass("focus");
    },

    _detect_section_hash: () => {
      const hash = window.location.pathname;
      const section = hash.replace("/", "");
      const km = {
        'instapaper': 0,
        'news': 1,
        'nyt': 2,
        'lemmy': 3,
        'pod': 4,
        'podcasts': 4,
        'lofi': 5,
        'yt': 6,
        'youtube': 6,
        'video': 6,
        'poe': 7,
        'web3': 8,
        'steam': 9,
        'games': 9,
        'nfts': 10,
        'ss': 11,
        'screenshots': 11,
        'tracks': 12,
        'songs': 12,
        'art': 20,
        'dev': 23,
        'info': 24,
        'metal': 25,
        'twitter': 26,
        'github': 28,
        'trakt': 29,
        'twitch': 30,
        'vibes': 31,
        'music': 31,
        'links': 32,
        'summaries': 33,
        'summary': 33,
        'watchlater': 34,
        'wl': 34,
        'lemmy': 35
      };
      if (section in km) {
        // Switch Feed Source
        const k = Object.keys(km).find(key => key === section);
        start.fc = k ? km[k] : start.fc;
        if (Number.isInteger(start.fc)) {
          start.mf[start.fc]();
          $('[data-id="' + km[k] + '"]').addClass(start.s);
        }
      } else {
        // Initial Feed
        start.init_fetch();
      }
    },

    get detect_section_hash() {
      return this._detect_section_hash;
    },

    set detect_section_hash(value) {
      this._detect_section_hash = value;
    },

    // Function Triggers by Keyboard Combos
    key_listener: () => {
      $(document).keydown(e => {
        // Key Down
        start.d[e.keyCode] = true;

        // Shift
        if (start.d[16]) {

          // Search GPT on Enter
          if (start.d[13]) {
            e.preventDefault();
            start.gpt();
          }

          // Switch Feed Source
          const shift_keys_map = {
            49: 26, // Twitter                              shift + 1️⃣
            50: 35, // Lemmy Inbox                          shift + 2️⃣
          };
          const kcc = Object.keys(shift_keys_map).find(key => start.d[key]);
          start.fc = shift_keys_map ? shift_keys_map[kcc] : start.fc;
          if (Number.isInteger(start.fc)) {
            e.preventDefault();
            start.mf[start.fc]();
          }

          // Functions Mapped to Keys
          const shift_functions_mapped = {
            39: start.audio_ff, // Fast Forward:            shift + ⏩
            37: start.audio_rewind, // Rewind:              shift + ⏪
            38: start.audio_more_speed, // Increase:        shift + ⏫
            40: start.audio_less_speed, // Decrease:        shift + ⏬
            32: start.media_toggle, // Play/Pause:          shift + "space"
            77: start.audio_mute, // Mute:                  shift + "m"
            70: start.fullscreen, // Fullscreen:            shift + "f"
            123: start.play_ambient_song, // Ambient Song:  shift + "f12"
            65: start.now_pass, // Load Now Pass:           shift + "a"
            67: () => {
              start.lastfm();
              start.notify("Fetched <span>Last.fm</span>");
            }, // Update LastFM:                            shift + "x"
            88: start.background, // Background Image:      shift + "c"
            86: start.audio_volume, // Volume:              shift + "v"
            66: start.blur, // Blur:                        shift + "b"
            72: start.shortcuts, // Help Shortcuts          shift + "h"
          };
          if (shift_functions_mapped[e.keyCode]) {
            e.preventDefault();
            shift_functions_mapped[e.keyCode]();
          }

        } else {
          // Links Toggle                                   ⏫ or ⏬
          if (start.d[40]) start.scroll_links();
          if (start.d[38] && start.fs > 0) start.scroll_links(start.fs - 1);
        }

        // Alt / Option
        if (start.d[18]) {
          e.preventDefault();

          // Switch Search Source
          const keys_mapped = {
            49: 0, // Path of Exile                         alt + 1️⃣
            50: 1, // YouTube                               alt + 2️⃣
            51: 2, // DuckDuckGo                            alt + 3️⃣
            52: 3, // Apple Music                           alt + 4️⃣
            53: 4, // LastFM                                alt + 5️⃣
            54: 5, // Twitter                               alt + 6️⃣
            55: 6, // Google News                           alt + 7️⃣
            56: 7, // Github                                alt + 8️⃣
            57: 8, // MidJourney                            alt + 9️⃣
            48: 9, // Google                                alt + 0️⃣
          };
          const kc = Object.keys(keys_mapped).find(key => start.d[key]);
          start.sc = kc ? keys_mapped[kc] : start.sc;
          if (!$(".feed-container").hasClass("fullscreen")) {
            if (Number.isInteger(start.sc)) start.search_switcher(start.searches[start.sc]);
          }
        }

        if (start.d[27]) { // Close Fullscreen Video:       esc
          if ($(".shortcuts").hasClass(start.s)) {
            start.shortcuts();
          } else {
            if ($(".feed-container").hasClass("fullscreen")) start.fullscreen();
          }
        }

      }).keyup(e => {
        // Reset Key on Key Up
        start.d[e.keyCode] = false;
      });
    },

    // Feed Menu Click Events
    menu_clicks: function () {
      $(document).on("click contextmenu", ".menu-links__toggle a.container__list", function (e) {
        e.preventDefault();
        start.fc = $(this).data("id");
        $(this).parent().addClass(start.s).siblings().removeClass(start.s);
        if (e.type === "contextmenu") start.f = true;
        if (Number.isInteger(start.fc)) start.mf[start.fc]();
        if ($(window).scrollTop() > $(".container__content").offset().top) {
          $("html, body").animate({
            scrollTop: $(".container__content").offset().top
          }, start.at * 2);
        }
      });
    },

    // Scroll Feed Links
    scroll_links: (slide) => {
      let l = $(".container__links--section").length - 3;
      const the_old_class = "link__" + start.fs;
      if (!slide && slide !== 0) {
        start.fs++;
        if (start.fs > l) start.fs = 0;
      } else {
        start.fs = slide;
      }
      const the_class = "link__" + start.fs;
      $(".container__links--overflow").removeClass(the_old_class).addClass(the_class);
    },

    // Scroll Links on Mouse Wheel
    scroll_links_on_scroll: () => {
      $(document).on("wheel", function (e) {
        if ($(e.target).closest(".container__links").length) return;
        if ($(e.target).closest(".shortcuts__inner").length) return;
        if (e.originalEvent.deltaY < 0) {
          if (start.fs > 0) start.scroll_links(start.fs - 1);
        } else {
          start.scroll_links();
        }
      });
    },

    // Toggle Help Menu
    help_toggle: () => {
      $(document).on(start.t, ".shortcuts", event => {
        if (!$(event.target).closest(".shortcuts__inner").length &&
          $(".shortcuts").hasClass(start.s)) {
          start.shortcuts();
        }
      });
    },

    // Toggle Video Fullscreen on Click
    fullscreen_toggle: () => {
      $(document).on(start.t, e => {
        const t = $(".feed-container.fullscreen .feed-list.fullscreen");
        if (t.length) {
          if (!t.is(e.target) && t.has(e.target).length === 0) start.fullscreen();
        }
      });
    },

    // Toggle Now Pass
    now_pass: () => {
      const num = start.random_numb(1, 2750).toString();
      const iframe = `<iframe class="nowpass hidden" src="https://viewer.nowpass.xyz/${num}.html" autoplay="" loop="" muted="" controls="false"></iframe>`;
      const status = !$(".nowpass").length ? " On" : " Off";
      if ($(".nowpass").length) {
        $(".nowpass").addClass(start.h)
        setTimeout(() => {
          $(".nowpass").remove();
        }, start.at * 2);
      } else {
        $("body").append(iframe);
        setTimeout(() => { $(".nowpass").removeClass(start.h) }, start.at * 2);
      }
      start.notify(`Now Pass <span>Toggled</span> ${status}`);
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
        start.an = start.random_numb(1, start.ac).toString().padStart(4, "0").toString();
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
              }, start.at * 2);
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
      container.addClass(start.h);
      setTimeout(() => {
        artist.text(data.artist).attr("title", `Artist: ${data.artist}`);
        song.text(data.name).attr("title", `Song: ${data.name}`);
        album.text(data.album ? `${data.album}` : "").attr("title", data.album ? `Album: ${data.album}` : "");
        image.attr("src", data.image ? data.image : "fallback.png");
        url.attr("href", data.link ? data.link : "#").addClass(start.s);
        // container.show();
        container.removeClass(start.h)
      }, start.at * 2);
      if (source) start.notify(`<span>Now Playing</span> ${source}`);
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
      start.scroll_links(0);
      $(".feed-links").replaceWith(html);
      setTimeout(() => {
        $(".feed-links").addClass(start.s);
        if (start.f) {
          start.fullscreen();
          start.f = !start.f;
        } else if ($(".gpt-links").length) {
          Prism.highlightAll();
          start.fullscreen();
        }
      }, start.at * 2);
      if (source) start.notify(`<span>Feed Switched to</span> ${source}`);
      $("body").removeClass("lock");
      if (!$(".container__links--overflow").hasClass("link__0")) {
        $(".container__links--overflow").addClass("link__0");
      }
    },

    // Init Fetch
    init_fetch: () => {
      // Reset URL
      if (window.location.pathname !== "/" &&
        window.location.pathname !== start.c.ignoreLocal) {
        window.history.replaceState({}, document.title, "/");
      }
      // Fetch Instapaper (Default Feed)
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
            $(".menu-links__toggle:first-of-type()").addClass(start.s);
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
        } catch {
          $(".feed-links").addClass(start.s);
        }
      }
      start.fc = false;
    },

    // Media: Is Any Media Playing?
    media_is_playing: () => {
      return !start.audio.paused ||
        start.video && start.video.getPlayerState() === 1 ||
        start.vaa && start.vaa.getPlayerState() === 1;
    },

    // Finished Playing with Song Title
    media_finished_text: () => {
      let title = $(".nowplaying__song").text();
      if (title.length > (start.nl + 3)) title = title.trim().slice(0, start.nl) + "...";
      start.notify(`${title} <span>Finished</span>`);
    },

    // Media Based Event Listeners
    media_events: () => {
      // Audio Events
      start.audio.addEventListener("play", () => {
        if (start.video && start.video.pauseVideo && start.video === YT.PlayerState.PLAYING) start.video.pauseVideo();
        if (start.vaa && start.vaa.pauseVideo && start.vaa === YT.PlayerState.PLAYING) start.vaa.pauseVideo();
      });
      start.audio.addEventListener("ended", () => {
        start.media_finished_text();
        start.media_ended();
      } );
      // Video Events
      if (start.video) {
        start.video.addEventListener('onStateChange', event => {
          switch (event.data) {
            case YT.PlayerState.ENDED:
              start.media_stop();
              start.media_finished_text();
              break;
            case YT.PlayerState.PAUSED:
              start.notify("Paused");
              $(".media-toggle img").attr("src", "icons/icon__pause.svg");
              $(".feed-links .menu-links__item-pause img").attr("src", "icons/icon__play.svg");
              break;
            case YT.PlayerState.PLAYING:
              start.notify("<span>Now</span> Playing");
              $(".media-toggle img").attr("src", "icons/icon__play.svg");
              $(".feed-links .menu-links__item-pause img").attr("src", "icons/icon__pause.svg");
              break;
            default:
              break;
          }
        });
      }
      // Video as Audio
      if (start.vaa) {
        start.vaa.addEventListener('onStateChange', event => {
          switch (event.data) {
            case YT.PlayerState.ENDED:
              start.media_stop();
              start.media_finished_text();
              break;
            case YT.PlayerState.PAUSED:
              start.notify("Paused");
              $(".media-toggle img").attr("src", "icons/icon__pause.svg");
              $(".feed-links .menu-links__item-pause img").attr("src", "icons/icon__play.svg");
              break;
            case YT.PlayerState.PLAYING:
              start.notify("<span>Now</span> Playing");
              $(".media-toggle img").attr("src", "icons/icon__play.svg");
              $(".feed-links .menu-links__item-pause img").attr("src", "icons/icon__pause.svg");
              break;
            default:
              break;
          }
        });
      }
    },

    // Media: Stop
    media_stop: () => {
      start.media_ended();
      if (start.audio) {
        start.audio.pause();
        start.audio.src = '';
        start.audio.load();
      }
      if (start.vaa) start.vaa.destroy();
      if (start.video) start.video.destroy();
    },

    // Media: Reset Timer & Progress Bar
    media_ended: () => {
      start.title = "Startpage";
      start.marquee_title(start.title);
      const wait = (ms) => new Promise(resolve => setTimeout(resolve, ms)),
        first = () => {
          clearInterval(start.timer.interval);
          $(".media-toggle").removeClass(start.s);
          $(".progress").addClass(start.h);
          $("#search").removeClass("full");
        },
        last = async () => {
          await wait(start.at * 2);
          $(".media-toggle-replace").text('0:00');
          $(".progress").css('width', '0%');
        };
      first();
      last();
    },

    // Media: Determine Timer & Progress Bar
    media_timer_determine: () => {
      let elapsed = 0;
      let tr = 0;
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
      } catch {
        tr = 0;
        start.pb = 1;
      };
      start.timer = {
        minutes: Math.floor(tr / 60),
        seconds: Math.floor(tr % 60),
        padded_time: Math.floor(tr % 60) < 10 ? '0' + Math.floor(tr % 60).toString() : Math.floor(tr % 60),
        interval: start.timer.interval
      };
    },

    // Media: Timer
    media_timer: () => {
      // Start Events
      start.media_events();
      // Set Timer
      start.media_timer_determine();
      // Update Timer Every 1/4 Second
      start.timer.interval = setInterval(() => {
        let last_second = start.timer.seconds;
        try {
          start.media_timer_determine();
          if (start.timer.seconds && last_second > start.timer.seconds) {
            if (start.media_is_playing()) {
              if (!$(".media-toggle").hasClass(start.s) && start.timer.seconds > 0 && $(".media-toggle-replace").text() !== "0:00") $(".media-toggle").addClass(start.s);
              $(".media-toggle-replace").text(start.timer.minutes + ':' + start.timer.padded_time);
              start.pb = Math.min(Math.max((start.pb * 100).toFixed(3), 1), 100);
              if ($(".progress").hasClass(start.h)) $(".progress").removeClass(start.h);
              $(".progress").css('width', start.pb + '%');
              last_second = start.timer.seconds;
            } else {
              start.media_ended();
            }
          }
        } catch (e) {
          clearInterval(start.timer.interval);
        }
      }, 250);
    },

    // Media: Play / Pause
    media_toggle: () => {
      start.audio_toggle();
      start.video_toggle();
    },

    // Start YouTube Video
    video_start: video_id => {
      if (start.video) start.video.destroy();
      if (start.vaa) start.vaa.destroy();
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
      $("#video-container").toggleClass("grid-padding-x");
    },

    // Start YouTube Video as Audio
    video_as_audio_start: video_id => {
      if (start.vaa) start.vaa.destroy();
      if (start.video) start.video.destroy();
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

    // Hide Background Elements in Fullscreen Mode
    hide_background_elements: () => {
      const divs = [
        $(".container__list--menu"),
        $(".container__list.container__list--title"),
        $(".search__wrapper"),
        $(".details"),
      ];
      for (let div of divs) {
        div.toggleClass(start.h);
      }
    },

    // Fullscreen Toggle
    fullscreen: () => {
      const v = $(".feed-links .feed-list, .feed-container, .container__overflow"),
        vl = $(".feed-links");
      vl.removeClass(start.s);
      setTimeout(() => {
        v.toggleClass("fullscreen");
      }, start.at * 2);
      setTimeout(() => {
        start.hide_background_elements();
        vl.addClass(start.s);
      }, start.at * 3);
      start.fullscreen_toggle();
      if (!$(".container__links--overflow").hasClass("link__0")) {
        $(".container__links--overflow").addClass("link__0");
      }
      $(".container__links--overflow").removeClass("link__1 link__2");
      $("body").toggleClass("lock");
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
      start.notify(`<span>Now Playing</span> ${song_data.name}`);
    },

    // Video: Play Youtube Video in Modal
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
        start.title = vid_data.artist + ": " + vid_data.name + ", " + vid_data.album;
        start.marquee_title(start.title);
        if (vid_data.name.length > start.nl) vid_data.name = vid_data.name.slice(0, start.nl) + "...";
        if (start.d[16]) start.fullscreen();
        start.now_playing(vid_data, vid_data.name);
      });
    },

    // Audio: Play Music on Click using YT Player
    play_music_on_click: function () {
      $(document).on(start.t, ".music-links li a", function (e) {
        e.preventDefault();
        const a = $(this);
        start.media_stop();
        start.video_as_audio_start(a.data("id"));
        const song_data = {
          id: a.data("id"),
          name: a.data("title"),
          album: "",
          artist: a.data("feed"),
          image: a.find("img").attr("src"),
          link: a.attr("href")
        };
        start.title = song_data.artist + ": " + song_data.name + ", " + song_data.album;
        start.marquee_title(start.title);
        const sn = song_data.name.length > start.nl ? song_data.name.trim().slice(0, start.nl) + "..." : song_data.name;
        start.now_playing(song_data, `${sn}`);
        if (!$("#search").hasClass("full")) $("#search").addClass("full");
      });
    },

    // Audio: Play
    play_audio_on_click: async function () {
      $(document).on(start.t, ".podcast-links li a", async function (e) {
        e.preventDefault();
        if ($(".podcast-links").hasClass("video-links")) return;
        const a = $(this);
        start.media_stop();
        start.audio.src = a.attr("href");
        await start.audio.load();
        start.audio.playbackRate = 1.3;
        start.audio.play();
        start.media_timer();
        const song_data = {
          id: "",
          name: a.data("title"),
          album: "",
          artist: a.data("feed"),
          image: a.find("img").attr("src"),
          link: a.attr("href")
        };
        start.title = song_data.artist + ": " + song_data.name + ", " + song_data.album;
        start.marquee_title(start.title);
        const sn = song_data.name.length > start.nl ? song_data.name.trim().slice(0, start.nl) + "..." : song_data.name;
        start.now_playing(song_data, `${sn}`);
        if (!$("#search").hasClass("full")) $("#search").addClass("full");
      });
    },

    // Audio: Pause on Click of Timer
    timer_media_toggle: () => {
      $(document).on(start.t, ".media-toggle", e => {
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
          if (start.vaa && start.vaa.getPlayerState() === 1) {
            start.vaa.setVolume(vol.val());
            vol.value = start.vaa.getVolume();
          } else if (start.video && start.video.getPlayerState() === 1) {
            start.video.setVolume(vol.val());
            vol.value = start.video.getVolume();
          } else if (!start.audio.paused) {
            start.audio.volume = vol.val() / 100;
            vol.value = start.audio.volume * 100;
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
        $(".media-toggle img").attr("src", "icons/icon__play.svg");
        $(".feed-links .menu-links__item-pause img").attr("src", "icons/icon__pause.svg");
        start.notify("<span>Now</span> Playing");
        start.audio.play();
      } else {
        start.audio.pause();
        $(".media-toggle img").attr("src", "icons/icon__pause.svg");
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

    // Read Summaries with Speech Synthesis
    read_summaries: () => {
      $(document).on(start.t, ".feed-list li p", function (e) {
        $(this).toggleClass(start.s);
        // Stop on Repeat Click
        if (window.speechSynthesis.speaking) {
          window.speechSynthesis.cancel();
          start.notify("Speaking Paragraph <span>Stopped</span>");
        } else {
          const fl = $(".feed-list");
          var message = new SpeechSynthesisUtterance();
          message.text = $(this).text();
          window.speechSynthesis.speak(message);
          fl.animate({
            scrollTop: $(this).offset().top - fl.offset().top + fl.scrollTop()
          }, start.at * 2);
          start.notify("Speaking Paragraph <span>Started</span>");
          message.onend = () => $(".feed-list li p.shown").removeClass(start.s);
        }
      });
    },

    // Scroll to Top on Click
    scroll_top_on_click: () => {
      $(document).on(start.t, ".feed-links .container__list--title", (e) => {
        e.preventDefault();
        $(".feed-list").animate({
          scrollTop: 0
        }, start.at * 2);
      });
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

    // Change Search on Click
    change_search: () => {
      $("#searchform label").on(start.t, () => {
        start.sc = start.sc < start.searches.length - 1 ? start.sc + 1 : 0;
        start.search_switcher(start.searches[start.sc]);
      });
    },

    // Help Shortcuts
    shortcuts: async () => {
      const shortcuts_toggle = html => {
        if ($(".shortcuts").hasClass(start.s)) html = "";
        $(".shortcuts").html(html).toggleClass(start.s);
        $("body").toggleClass("lock");
        if ($(".shortcuts").hasClass(start.s)) start.notify("<span>Shortcuts</span> Menu");
        start.shortcuts_slider();
      };
      if (start.cache['shortcuts']) {
        const sc = start.cache['shortcuts'];
        shortcuts_toggle(sc.html);
      } else {
        try {
          const response = await fetch(`${start.c.shortcutsURL}?t=${start.timestamp()}`);
          const html = await response.text();
          if (html) {
            shortcuts_toggle(html);
            start.cache['shortcuts'] = {
              html,
              time: new Date().getTime()
            };
          }
        } catch (err) {
          $(".shortcuts").html("").addClass(start.s);
        }
      }
    },

    // Shortcuts Slider
    shortcuts_slider: () => {
      $(document).on(start.t, ".shortcuts__menu li", function (e) {
        e.preventDefault();
        const target = $(this);
        target.addClass(start.s).siblings().removeClass(start.s);
        $(".shortcuts__feed-container").css("transform", `translateX(-${target.data("id") * (100 / $(".shortcuts__feed").length)}%`);
      });
    },

    // Marquee Title Animation
    marquee_title: (string) => {
      let title = $("title");
      let text = string ? string + " " : "Startpage ";
      clearInterval(start.ti);
      start.ti = setInterval( () => {
        text = text.substring(1) + text.charAt(0);
        title.text("⭐ " + text.toUpperCase());
      }, start.at);
    },

    // Launch Steam Games
    steam_links: () => {
      $(document).on(start.t, ".feed-links a", function (e) {
        if (e.shiftKey && $(this).attr("data-launcher")) {
          e.preventDefault();
          const game_name = $(this).find(".container__list--item-title").html();
          $("<iframe></iframe>")
            .css("display", "none")
            .css("visibility", "hidden")
            .attr("src", $(this).attr("data-launcher"))
            .appendTo("body");
          start.notify(`<span>Launching</span> ${game_name}`);
        }
      });
    },

    // GPT
    gpt: () => {
      if (start.c.openai) {
        const sv = $("#search").val();
        let artprompt = sv.charAt(0) === "?";
        artprompt = artprompt ? sv.replace('?', '') : false;
        const prompt = artprompt ? start.c.openai.artprompt + artprompt : start.c.openai.prompt + sv;
        $(".feed-links").addClass("loading").html('<span class="loader"></span>');
        let data = {
          "model": start.c.openai.model,
          "messages": [{
            "role": "user",
            "content": `${prompt}\n\n ${sv}`
          }],
          "temperature": 0.7
        };
        fetch('https://api.openai.com/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Authorization': 'Bearer ' + start.c.openai.key,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data),
        }).then(response => response.json())
          .then(data => {
            const t = start.format_numb(data.usage.total_tokens);
            let d = marked.parse(data.choices[0].message.content);
            if (artprompt) {
              d = `<pre class="language-markdown">
                    <code class="language-markdown">${d}</code>
                   </pre>`;
            }
            let html = `<div class="feed-links gpt-links">
                          <ul class="grid-x container__list--title-list">
                            <li class="cell">
                              <span class="container__list container__list--title">
                                <span>GPT</span>
                                <span title="Tokens Used">${t}</span>
                              </span>
                            </li>
                          </ul>
                          <div class="feed-container">
                            <div class="grid-x feed-list">
                              <div class="cell">
                                <h2 class="gpt-links__prompt">${prompt}</h2>
                                <div class="grid-x container__list--title-list">
                                  <div class="cell">
                                    <span class="container__list--title container__list--title-reponse">
                                      <span>Response</span>
                                    </span>
                                  </div>
                                </div>
                                ${d}
                              </div>
                            </div>
                          </div>
                        </div>
                        `;
            start.feed_toggle(html, "Code");
            $("#search").val("");
            start.ding.play();
          })
          .catch(error => console.error('Error:', error));
        $(document).on(start.t, ".gpt-links__prompt", (e) => {
          e.preventDefault();
          $(".gpt-links__prompt").toggleClass(start.s);
        });
      }
    },

    // Animation on Leave & Alert Check if Media is Playing
    bye: () => {
      $(window).on("beforeunload", () => {
        if (start.media_is_playing()) {
          const result = window.confirm("Media is playing; sure you want to leave?");
          if (!result) return false;
        }
        $("body").addClass(start.h);
      });
    },

    // Clock
    the_time: () => {
      const now = new Date();
      const date_options = { weekday: "long", month: "long", day: "numeric" };
      const time_options = { hour: "2-digit", minute: "2-digit", second: "2-digit" };
      const time = now.toLocaleTimeString([], { ...time_options }).replace(/^0| /g, "");
      const date = now.toLocaleDateString("en-US", date_options);
      const datetime = `${date} ${time}`;
      const hour_hand = $(".hour-hand"),
            minute_hand = $(".minute-hand"),
            second_hand = $(".second-hand");
      const hours = now.getHours() % 12,
            minutes = now.getMinutes(),
            seconds = now.getSeconds();
      const h_angle = (hours + minutes / 60) / 12 * 360,
            m_angle = minutes / 60 * 360,
            s_angle = seconds / 60 * 360;
      hour_hand.attr('transform', 'rotate(' + h_angle + ', 50, 50)');
      minute_hand.attr('transform', 'rotate(' + m_angle + ', 50, 50)');
      second_hand.attr('transform', 'rotate(' + s_angle + ', 50, 50)');
      $(".menu-links__toggle--clock").attr("title", datetime);
    },

    // "Cron" Functions
    rerun_functions: () => {
      // Update LastFM Now Playing Every 3 Minutes
      setInterval(start.lastfm, 1000 * 60 * 3)
      // Change Background Every 5 Minutes
      setInterval(start.background, 1000 * 60 * 5);
      // Update Clock Every 1 Seconds
      setInterval(start.the_time, 1000);
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
