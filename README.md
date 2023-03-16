![preview](https://user-images.githubusercontent.com/899183/224763555-049e5f8f-50a1-4366-aab4-ddef66e2febe.png)

### Live Preview

[Preview: Startpage & New Tab Page](https://abstracted-war.surge.sh/)

This is the page I use on every new window/tab load in my browsers. It's personalized for me, but of course I invite forks and mods. Enjoy.

Some of the features:
* Quick access links to my most used websites.
* Background image is randomly chosen from a series of images I serve on my own website.
* Background image is blurred to better view the content.
* Background image resolution can be changed.
* Background animation with CSS/SVG.
* Background image can be refreshed.
* Mouse cursor can be toggled on/off.
* Click anywhere on page (except links) to focus search.
* Rapidly search the web with a search bar.
* Search bar can be toggled to different search engines.
* News feed can be toggled to different up-to-date feeds.
* News feed can be resized.
* View my roster of Path of Exile characters sorted by League.
* View owned NFTs.
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
* Mobile ready toggle menu.
* Shortcuts help menu.

---

### Notes

There's a file JSON file named `conf.json` in the root of the project.

It should look like this or similar, keeping what you want and removing what you don't:

```
{
  "ethplorerURL": "https://api.ethplorer.io/getAddressInfo/X?apiKey=X&showETHTotals=true",
  "etherscanURL": "https://api.etherscan.io/api?module=account&action=balance&address=X&tag=latest&apikey=X",
  "alchemyURL": "X",
  "techmemeURL": "X",
  "nytURL": "X",
  "redditURL": "X",
  "instapaperURL": "X",
  "lexiURL": "X",
  "poeURL": "X",
  "podURL": "X",
  "counterURL": "X",
  "githubURL": "X",
  "artURL": "X",
  "artThumbURL": "X",
  "lastFMURL": "https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=X&api_key=X&format=json&limit=1",
  "ipKey" : "X",
  "x" : "X",
  "xURL" : "X",
  "xPlaylistJSONURL": "X/X.json",
  "xPlaylistHTMLURL": "X",
  "youTubeURL": "X",
}
```

The params `instapaperURL`, `techmemeURL`, `nytURL`, `redditURL`, `alchemyURL`, `lexiURL`, `poeURL`, `podURL` are websites where I render the html/rss into an HTML column.

`counterURL` is an endpoint I use to track pageviews. `ethplorerURL` gives wallet stats. `etherscanURL` is unused currently. `lastFMURL` gives my last played song and total count of scrobbles. `ipKey` is a free key you get for IP checks from [https://ipinfo.io](https://ipinfo.io).

The background images are randomly chosen from a series of images I serve on my own website.

---

## Keyboard Commands

There's some 'hidden power user' features in here in the form of keyboard commands:
- Use <kbd>shift</kbd> + <kbd>h</kbd> help (<kbd>M</kbd>enu to display all keyboard commands.

### Publishing

Publishing to Surge for public viewing:

```
surge . abstracted-war.surge.sh
```
