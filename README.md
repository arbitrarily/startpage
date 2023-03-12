![image](https://user-images.githubusercontent.com/899183/218527249-4ac6aa50-e1bc-4bde-b072-96a5306eea1b.png)

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
* Listen to shuffled music playlist from Lofi Girl.
* Watch subscribed YouTube Videos in line without leaving the site.
* Fullscreen video toggle.
* Media control (mute/unmute, play/pause, fast foward, rewind, faster/slower playback).
* See what music I'm currently listening to.
* See how my MetaMask wallet is doing.
* See my public IP address.
* See current total play count on LastFM.
* See pageviews.
* See commit count for this repo.
* Responsive design.
* Mobile ready toggle menu.

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

`Option` (KeyCode 18)
`Shift `  (KeyCode 16)

#### *<kbd>Option</kbd>* Settings (reset on page refresh)
- Use <kbd>option</kbd> + <kbd>z</kbd> to bring up the `Main Menu` toggles.
- Use <kbd>option</kbd> + <kbd>x</kbd> to fetch the `latest Now Playing` song data from LastFM.
- Use <kbd>option</kbd> + <kbd>c</kbd> to (<kbd>C</kbd>hange) the `Background Resolution` resolution (quality).
- Use <kbd>option</kbd> + <kbd>v</kbd> to get a refresh (<kbd>V</kbd>iew) of the `background wallpaper`.
- Use <kbd>option</kbd> + <kbd>b</kbd> to toggle (<kbd>B</kbd>lur) to better view the background image.
- Use <kbd>option</kbd> + <kbd>n</kbd> to (co<kbd>N</kbd>sole.log) `Wallet` stats.
- Use <kbd>option</kbd> + <kbd>m</kbd> help (<kbd>M</kbd>enu.
- Use <kbd>option</kbd> + <kbd>Backspace</kbd> to toggle the custom `mouse cursor` on/off.

### *<kbd>Option</kbd>* Search Toggles
- Use <kbd>option</kbd> + <kbd>1</kbd> to toggle search bar to `PoE Wiki`.
- Use <kbd>option</kbd> + <kbd>2</kbd> to toggle search bar to `YouTube`.
- Use <kbd>option</kbd> + <kbd>3</kbd> to toggle search bar to `DuckDuckGo`.
- Use <kbd>option</kbd> + <kbd>4</kbd> to toggle search bar to `Apple Music`.
- Use <kbd>option</kbd> + <kbd>5</kbd> to toggle search bar to `LastFM`.
- Use <kbd>option</kbd> + <kbd>6</kbd> to toggle search bar to `Twitter`.
- Use <kbd>option</kbd> + <kbd>7</kbd> to toggle search bar to `Google News`.
- Use <kbd>option</kbd> + <kbd>8</kbd> to toggle search bar to `Github`.
- Use <kbd>option</kbd> + <kbd>9</kbd> to toggle search bar to `Google`.
- Use <kbd>option</kbd> + <kbd>0</kbd> to toggle search bar to `MidJourney`.

### *<kbd>Shift</kbd>* News Feed
- Use <kbd>left arrow</kbd> to toggle feed view.
- Use <kbd>right arrow</kbd> to toggle feed view.
- Use <kbd>shift</kbd> + <kbd>1</kbd> to toggle my `Instapaper` bookmarks.
- Use <kbd>shift</kbd> + <kbd>2</kbd> to toggle the `News` feed (aggregated news feed).
- Use <kbd>shift</kbd> + <kbd>3</kbd> to toggle the `New York Times` news feed.
- Use <kbd>shift</kbd> + <kbd>4</kbd> to toggle the `Reddit` news feed.
- Use <kbd>shift</kbd> + <kbd>5</kbd> to toggle the `Podcasts` feed.
- Use <kbd>shift</kbd> + <kbd>6</kbd> to toggle the `Music` feed.
- Use <kbd>shift</kbd> + <kbd>7</kbd> to toggle the `YouTube` latest videos feed.
- Use <kbd>shift</kbd> + <kbd>8</kbd> to toggle my `Path of Exile` characters feed.
- Use <kbd>shift</kbd> + <kbd>9</kbd> to toggle the `Crypto & NFT` news feed.
- Use <kbd>shift</kbd> + <kbd>0</kbd> to toggle the `NFT collection` feed (imperfect at the moment).
- Use <kbd>shift</kbd> + <kbd>-</kbd> to toggle the `Lexichronic` news feed.

### *<kbd>Shift</kbd>* Media Controls
- Use <kbd>shift</kbd> + <kbd>Up</kbd> to `increase` audio playback speed.
- Use <kbd>shift</kbd> + <kbd>Down</kbd> to `decrease` audio playback speed.
- Use <kbd>shift</kbd> + <kbd>Right</kbd> to `fast forward` audio playback 15 seconds.
- Use <kbd>shift</kbd> + <kbd>Left</kbd> to `rewind` audio playback 5 seconds.
- Use <kbd>shift</kbd> + <kbd>space</kbd> to `play/pause` audio. (clicking timer also does this)
- Use <kbd>shift</kbd> + <kbd>m</kbd> to toggle (<kbd>M</kbd>ute) for audio.
- Use <kbd>shift</kbd> + <kbd>f</kbd> to toggle (<kbd>F</kbd>ullscreen) for video.
- Use <kbd>esc</kbd> to exit `fullscreen` for fullscreen video.
- Use <kbd>shift</kbd> + <kbd>F12</kbd> to `play a single random song` from [@LofiGirl](https://www.youtube.com/@LofiGirl).
- Use <kbd>shift</kbd> + <kbd>F11</kbd> to `play a shuffled playlist` (songs from Music feed).
- Use <kbd>shift</kbd> + <kbd>F10</kbd> to `play a shuffled playlist` set max playlist length (songs from Music feed).
- Use <kbd>shift</kbd> + <kbd>s</kbd> if a playlist is playing, (<kbd>S</kbd>kip) to the next song.

### Publishing

Publishing to Surge for public viewing:

```
surge . abstracted-war.surge.sh
```
