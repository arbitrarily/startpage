![image](https://user-images.githubusercontent.com/899183/218527249-4ac6aa50-e1bc-4bde-b072-96a5306eea1b.png)

### Live Preview

[Preview: Startpage & New Tab Page](https://abstracted-war.surge.sh/)

This is the page I use on every new window/tab load in my browsers. It's personalized for me, but of course I invite forks and mods. Enjoy.

---

### Notes

There's a file JSON file named `conf.json` in the root of the project.

It should look like this:

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
  "counterURL": "X",
  "lastFMURL": "https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=X&api_key=X&format=json&limit=1",
  "ipKey" : "X"
}
```

The params `instapaperURL`, `techmemeURL`, `nytURL`, `redditURL`, `alchemyURL`, `lexiURL`, `poeURL` are websites where I render the html/rss into an HTML column.

`counterURL` is an endpoint I use to track pageviews. `ethplorerURL` gives wallet stats. `etherscanURL` is unused currently. `lastFMURL` gives my last played song and total count of scrobbles. `ipKey` is a free key you get for IP checks from [https://ipinfo.io](https://ipinfo.io).

The background images are randomly chosen from a series of images I serve on my own website.

---

### Keyboard Commands

There's some 'hidden' power user features in here in the form of keyboard commands:

*<kbd>Left Option</kbd>* (KeyCode 18) - Settings (reset on page refresh)
- Use <kbd>loption</kbd> + <kbd>i</kbd> to toggle ("I"-nvert) `light / dark mode`.
- Use <kbd>loption</kbd> + <kbd>x</kbd> to get the `latest Now Playing` song.
- Use <kbd>loption</kbd> + <kbd>c</kbd> to toggle ("C"-olors) CSS/SVG based `background animation`.
- Use <kbd>loption</kbd> + <kbd>v</kbd> to get refresh ("V"-iew) `the background wallpaper`.
- Use <kbd>loption</kbd> + <kbd>b</kbd> to toggle ("B"-lur) `background blur` to better view the background image.
- Use <kbd>loption</kbd> + <kbd>]</kbd> to toggle `news feed resize` to get an alternative, larger news feed.
- Use <kbd>loption</kbd> + <kbd>Backspace</kbd> to toggle the `mouse cursor`.

*<kbd>Left Option</kbd>* (KeyCode 18) - Search Toggles
- Use <kbd>loption</kbd> + <kbd>1</kbd> to toggle search bar to `PoE Wiki`.
- Use <kbd>loption</kbd> + <kbd>2</kbd> to toggle search bar to `YouTube`.
- Use <kbd>loption</kbd> + <kbd>3</kbd> to toggle search bar to `DuckDuckGo`.
- Use <kbd>loption</kbd> + <kbd>4</kbd> to toggle search bar to `Google Translate` (imperfect at the moment).
- Use <kbd>loption</kbd> + <kbd>5</kbd> to toggle search bar to `Apple Music`.
- Use <kbd>loption</kbd> + <kbd>6</kbd> to toggle search bar to `LastFM`.
- Use <kbd>loption</kbd> + <kbd>7</kbd> to toggle search bar to `Twitter`.
- Use <kbd>loption</kbd> + <kbd>8</kbd> to toggle search bar to `Google News`.
- Use <kbd>loption</kbd> + <kbd>9</kbd> to toggle search bar to `Github`.
- Use <kbd>loption</kbd> + <kbd>0</kbd> to toggle search bar to `Google`.
- Use <kbd>loption</kbd> + <kbd>-</kbd> to toggle search bar to `MidJourney`.

*<kbd>Left Shift</kbd>* (KeyCode 16) - News Feed
- Use <kbd>lshift</kbd> + <kbd>1</kbd> to toggle my `Instapaper` bookmarks.
- Use <kbd>lshift</kbd> + <kbd>2</kbd> to toggle the `Techmeme` news feed.
- Use <kbd>lshift</kbd> + <kbd>3</kbd> to toggle the `New York Times` news feed.
- Use <kbd>lshift</kbd> + <kbd>4</kbd> to toggle the `Reddit` news feed.
- Use <kbd>lshift</kbd> + <kbd>5</kbd> to toggle the `NFT collection` feed (imperfect at the moment).
- Use <kbd>lshift</kbd> + <kbd>6</kbd> to toggle the `Lexichronic` news feed.
- Use <kbd>lshift</kbd> + <kbd>7</kbd> to toggle the `Path of Exile` character feed.

### Publishing

Publishing to Surge

```
surge . abstracted-war.surge.sh
```
