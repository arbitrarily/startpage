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
  "counterURL": "X",
  "lastFMURL": "https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=X&api_key=X&format=json&limit=1",
  "ipKey" : "X"
}
```

The params `instapaperURL`, `techmemeURL`, `nytURL`, `redditURL`, `alchemyURL` are websites where I render the html/rss into an HTML column.

`counterURL` is an endpoint I use to track pageviews. `ethplorerURL` gives wallet stats. `etherscanURL` is unused currently. `lastFMURL` gives my last played song and total count of scrobbles. `ipKey` is a free key you get for IP checks from [https://ipinfo.io](https://ipinfo.io).

The background images are randomly chosen from a series of images I serve on my own website.

---

### Publishing

Publishing to Surge

```
surge . abstracted-war.surge.sh
```
