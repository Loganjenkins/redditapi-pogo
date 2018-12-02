<!-- A collection of posts. parses out the posts to reddit-post-single.tags -->
<reddit-posts>
  <reddit-post-single each={post, i in curPosts} post={post} app={app} index={i}></reddit-post-single>
  <div class="next-prev group">
    <button class="prev-page" click={prevPage}>Prev Page</button>
    <div class="page-indication">page {app.currentPage + 1}</div>
    <button class="next-page" click={nextPage}>Next Page</button>
  </div>
  <script>
    this.app = opts.app;
    this.curPosts = this.app.curPosts;

    this.nextPage = () => {
      let currentLastPost = this.curPosts[(this.curPosts.length - 1)];
      this.app.nextPage(currentLastPost.data.name);
    }

    this.prevPage = () => {
      let currentLastPost = this.curPosts[0];
      this.app.prevPage(currentLastPost.data.name);
    }

    this.postsLoaded = () => {
      this.curPosts = this.app.curPosts;
      this.update();
    }

    this.on('mount', () => {
      this.app.on('postsLoaded', this.postsLoaded);
    });

    this.on('unmount', () => {
      this.app.off('postsLoaded', this.postsLoaded);
    });
  </script>
</reddit-posts>
