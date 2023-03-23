![preview](https://user-images.githubusercontent.com/899183/224763555-049e5f8f-50a1-4366-aab4-ddef66e2febe.png)

### Live Preview

[Preview: Startpage & New Tab Page](https://arbitrarily.me)

This is the page I use on every new window/tab load in my browsers. It's personalized for me, but of course I invite forks and mods. Enjoy.

Some of the features:
* Quick access links to my most used websites.
* Background image is randomly chosen from a series of images I serve on my own website.
* Background image is blurred to better view the content.
* Background image resolution can be changed.
* Background animation with CSS/SVG.
* Background image can be refreshed.
* Click anywhere on page (except links) to focus search.
* Rapidly search the web with a search bar.
* Search bar can be toggled to different search engines.
* News feed can be toggled to different up-to-date feeds.
* News feed can be resized.
* View my roster of Path of Exile characters sorted by League.
* View owned NFTs.
* View my twitter feed.
* Listen to podcasts.
* Listen to music.
* Listen to shuffled music playlist.
* Listen to shuffled music playlist with a set limit.
* Watch subscribed YouTube Videos in line without leaving the site.
* Fullscreen video toggle.
* Media control (mute/unmute, play/pause, fast foward, rewind, faster/slower playback).
* See what music I'm currently listening to.
* See how my MetaMask wallet is doing.
* See my public IP address.
* See current total play count on LastFM.
* See pageviews.
* See version number & commit count for this repo.
* Responsive design.
* Resize images.
* Mobile ready toggle menu.
* Shortcuts help menu.

---

### Notes

There's a file JSON file named `conf.json` in the root of the project.

It should look like this or similar, keeping what you want and removing what you don't:

```
{
  "alchemyURL": "<https://website.domain>",
  "ambientSongID": "youtubeID",
  "artThumbURL": "<https://website.domain/media/thumb/>",
  "artURL": "<https://website.domain/media/art/>",
  "counterURL": "<https://website.domain>",
  "devURL": "<https://website.domain>",
  "etherscanURL": "https://api.etherscan.io/api?module=account&action=balance&address=<address>&tag=latest&apikey=<api_key>",
  "ethplorerURL": "https://api.ethplorer.io/getAddressInfo/<address>?apiKey=<api_key>&showETHTotals=true",
  "gameURL": "<https://website.domain>",
  "githubURL": "https://api.github.com/repos/<username>/<repo>/contributors?page=1&per_page=1&anon=true",
  "instapaperURL": "<https://website.domain>",
  "ipKey": "<api_key>",
  "ipRemove": "<ip_address>",
  "lastFMAPIKey": "<api_key>",
  "lastFMAPISecret": "<api_secret>",
  "lastFMURL": "<https://website.com/2.0/?method=user.getrecenttracks&user=x&api_key=<api_key>&format=json&limit=1>",
  "lexiURL": "<https://website.domain>",
  "nftNewsURL": "<https://website.domain>",
  "nytURL": "<https://website.domain>",
  "poeURL": "<https://website.domain>",
  "podURL": "<https://website.domain>",
  "redditURL": "<https://website.domain>",
  "techmemeURL": "<https://website.domain>",
  "twitterURL": "<https://website.domain>",
  "xPlaylistHTMLURL": "<https://website.domain>",
  "xPlaylistJSONURL": "<https://website.domain/x.json>",
  "xPlaylistMetalHTMLURL": "<https://website.domain>",
  "youTubeURL": "<https://website.domain>"
}
```

The params `instapaperURL`, `techmemeURL`, `nytURL`, `redditURL`, `alchemyURL`, `lexiURL`, `poeURL`, `podURL` are websites where I render the html/rss into an HTML column. There are others not mentioned above.

`counterURL` is an endpoint I use to track pageviews. `ethplorerURL` gives wallet stats. `etherscanURL` is unused currently. `lastFMURL` gives my last played song and total count of scrobbles. `ipKey` is a free key you get for IP checks from [https://ipinfo.io](https://ipinfo.io).

The background images are randomly chosen from a series of images I serve on my own website.

---

## Keyboard Commands

There's some 'hidden power user' features in here in the form of keyboard commands:
- Use <kbd>shift</kbd> + <kbd>h</kbd> which brings up the Shortcuts Help <kbd>M</kbd>enu to display all keyboard commands.

### Publishing

Publishing to Surge for public viewing:

```
surge . arbitrarily.me
```
