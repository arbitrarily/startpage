![image](https://user-images.githubusercontent.com/899183/202928236-68d0a79f-3395-4afd-8346-6fd4bd25a01f.png)

[Preview: Startpage & New Tab Page](https://abstracted-war.surge.sh/)

*** Note

There's a file JSON file named `conf.json` in the root of the project. The params `instapaperURL`, `techmemeURL`, `nytURL`, `redditURL` are websites where I render the html/rss into an HTML column.

`counterURL` is an endpoint I use to track pageviews. `ethplorerURL` gives wallet stats. `lastFMURL` gives my last played song and total count of scrobbles.

It should look like this:

```
{
  "ethplorerURL": "https://api.ethplorer.io/getAddressInfo/X?apiKey=Y&showETHTotals=true",
  "techmemeURL": "X",
  "nytURL": "X",
  "redditURL": "X",
  "instapaperURL": "X",
  "counterURL": "X",
  "lastFMURL": "https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=X&api_key=X&format=json&limit=1"
}
```
