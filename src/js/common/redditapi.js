class RedditPosts {
  constructor() {
    // subreddit we want to get posts from
    this.redditApiUrl = `pokemongo`;

    this.postsPerPage = 25;
    this.currentPage = 0;
    this.currentLastPost = null;
    this.curPosts = [];

    riot.observable(this);

    this.getPosts();
    riot.mount('reddit-posts', { app: this });
  }

  // retreive the posts from the specified subreddit
  getPosts() {
    fetch(`https://www.reddit.com/r/${this.redditApiUrl}.json` +
      `?limit=${this.postsPerPage - 2}&after=${this.currentLastPost}`)
      .then(resp => {
        return resp.json();
      }).then(json => {
        this.curPosts = json.data.children;
        this.trigger('postsLoaded');
      });
  }

  nextPage(lastPostName) {
    this.currentPage++;
    this.currentLastPost = lastPostName;
    this.getPosts();
  }

  prevPage(firstPostName) {
    this.currentPage--;
    if(this.currentPage <= 0) {
      this.currentPage = 0;
      this.currentLastPost = null;
    } else {
      this.currentLastPost = firstPostName;
    }
    this.getPosts();
  }
}
