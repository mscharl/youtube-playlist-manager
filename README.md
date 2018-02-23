# youtube-playlist-manager

I wanted to split a playlist with 300+ videos. I couldn't find an easy way on
Youtube, so I created this tool.

You can select multiple videos of a playlist and move them into another
playlist or delete them. Videos inside a playlist can be filtered by
multiple parameters to simplify the video selection.

## Todo

- [x] ~~__Login with Google__:
Use OAuth to connect with the users Youtube account~~

- [x] ~~__List all user-created playlists__:
Show all playlists with title, thumbnail, description and item count. At first,
50 playlists will be loaded. If the user owns more playlists than currently
shown a button is displayed to load 50 more playlists.~~

- [ ] __Show videos of a playlist__:
When a playlist is selected the videos are shown

- [ ] __Move videos__:
Videos of a playlist can be moved to another playlist by selecting one or more
videos and using a button to move them to the desired playlist.

- [ ] __Delete videos__:
Videos of a playlist can be deleted by selecting one or more videos and using a
button to delete them from the playlist.

- [ ] __Filter videos__:
To simplify selecting multiple videos a filterbar is available to filter videos
by the uploaded time, inserted time or name of the video.

- [ ] __Implement Caching__:
Items of a playlist should be cached locally. Invalidation should be done by
checking the e-tag that is given by the `list` method of the playlists.

## Build Setup

``` bash
# install dependencies
yarn install

# serve with hot reload at localhost:8080
yarn run dev

# build for production with minification
yarn run build
```
