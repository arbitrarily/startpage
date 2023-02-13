![image](https://user-images.githubusercontent.com/899183/218524120-80c1a1bf-27ac-4459-953a-f8abb433fa57.png)

[Preview: Startpage & New Tab Page](https://abstracted-war.surge.sh/)

*** Note

There's a file JSON file named `conf.json` in the root of the project. The params `instapaperURL`, `techmemeURL`, `nytURL`, `redditURL` are websites where I render the html/rss into an HTML column.

`counterURL` is an endpoint I use to track pageviews. `ethplorerURL` gives wallet stats. `lastFMURL` gives my last played song and total count of scrobbles. `ipKey` is a free key you get for IP checks from [https://ipinfo.io](https://ipinfo.io).

It should look like this:

```
{
  "ethplorerURL": "https://api.ethplorer.io/getAddressInfo/X?apiKey=Y&showETHTotals=true",
  "techmemeURL": "X",
  "nytURL": "X",
  "redditURL": "X",
  "instapaperURL": "X",
  "counterURL": "X",
  "lastFMURL": "https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=X&api_key=X&format=json&limit=1",
  "ipKey" : "X"
}
```

The background images are randomly chosen from a series of images I serve on my own website.

Publishing to Surge

```
surge . abstracted-war.surge.sh
```
