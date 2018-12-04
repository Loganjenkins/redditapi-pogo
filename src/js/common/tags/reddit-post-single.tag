<!-- A single post. The post comes from the each block in reddit-posts.tag -->
<reddit-post-single>
  <div class="post-single group">
    <div class="row row--2">
      <div if={hasImage} class="col col--1-4 post-image">
        <img src="{imageUrl}" />
      </div>
      <div class="col {col--3-4: hasImage}">
        <h3 class="h3">{postData.title}</h3>
        <p><a href="https://www.reddit.com{ postData.permalink }"
          target="_blank">Comments</a> <a class="left-pad-link" if={!utils.isNullOrUndefined(externalUrl)}
          href="{ externalUrl }" target="_blank">External Link</a></p>
        <p class="text-small">posted by: {postData.author} on {createdOnFormatted}</p>
      </div>
    </div>
  </div>
  <script>
    this.app = opts.app;
    this.postData = opts.post.data;
    this.index = opts.index;
    this.preview = this.postData.preview;
    this.externalUrl = null;

    let createdOn = new Date(this.postData.created_utc*1000);
    // format the UTC date into DD/MM/YY HH:MM
    this.createdOnFormatted =
      `${createdOn.getDate()}/${createdOn.getMonth()}/${createdOn.getFullYear()}` +
      ` at ${createdOn.getHours()}:${('0' + createdOn.getMinutes()).slice(-2)}`;

    // check if the post has an image
    if(!utils.isNullOrUndefined(this.preview)) {
      if(this.preview.images.length) {
        // get the Url from the first image
        this.imageUrl = this.preview.images[0].source.url;
        // &amp; in the url needs to just be &
        this.imageUrl = this.imageUrl.replace('amp;s', 's');
        this.hasImage = true;
      }
    }

    // check if the post is a link to an external site.
    if(this.postData.post_hint == 'link') {
      this.externalUrl = this.postData.url;
    }
  </script>
</reddit-post-single>
