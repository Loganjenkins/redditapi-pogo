## redditapi-pogo
Using the Reddit API to display posts from the specified subreddit.

## Prerequisites
- Node version: v10.13.0
- Gulp v3.9.0
- Gulp CLI v2.0.1
- Nodemon v1.18.7
- NPM version: v6.4.1

## Installation Steps
- Run `npm install`

## Development
- Run `gulp dev`
- In a seperate terminal window, Run `nodemon app.js`


## Notes about structure
Nodemon runs the project locally while gulp watches and compiles the files.
- /static holds compiled JS and CSS
- /src holds all the working files
    - /js/common
      // holds JS and riot tags. Currently, since there is only 1 view, /common is the only dir in /js.
      - /tags contains each component as an individual riot tag.
        - reddit-posts.tag grabs the posts from app (in this case, redditapi.js)
          and then iterates through them and uses riot's each functionality
          to make one reddit-post-single for each post.
        - reddit-post-single.tag lays out a single post given the data from just that post.
    - redditapi.js has all the code to access a subreddit's JSON.
    - utils.js contains useful methods that don't fit in redditapi.js
  - /styles contains all of the scss files.
    - all.scss compiles all the others into one css document.
    - base.scss is some basic beginning css
    - columns.scss contains the column structure of the site
    - helpers.scss are things like group as a clearfix method
    - posts.scss contain the stylings for the individual posts
    - vars.scss contains all the color and size sass variables
- /views contains any base html files.
