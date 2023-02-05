<script setup>

defineProps({
  project: {
    type: Object,
    default: () => ({
      headline: []
    })
  }
})

</script>

<template>
  <div class="project-footer">
    <section class="sec share">
      <h2>Share this project:</h2>
      <p class="noPad">
        <a
          href="https://www.facebook.com/sharer.php?u=http%3A%2F%2Ftcorbett.co.uk%2Fprojects%2Fmusic-artwork%2FWintermachine%2FArchaeology.html"
          target="_blank"
          onclick="return !window.open(this.href, 'Share on Facebook', 'width=640,height=300')"
          title="Share this page on Facebook"
        >Facebook</a> &middot;
        <a
          href="https://twitter.com/share?text=The best music-artwork project I've seen today is&url=http%3A%2F%2Ftcorbett.co.uk%2Fprojects%2Fmusic-artwork%2FWintermachine%2FArchaeology.html&via=rook_tx"
          onclick="return !window.open(this.href, 'Share on Twitter', 'width=640,height=300')"
          target="_blank"
          title="Tell your followers about this page"
        >Twitter</a> &middot;
        <a
          href="http://www.tumblr.com/share/link?url=http%3A%2F%2Ftcorbett.co.uk%2Fprojects%2Fmusic-artwork%2FWintermachine%2FArchaeology.html&name=Wintermachine%20-%20Archaeology%20by%20Tom%20Corbett"
          onclick="return !window.open(this.href, 'Share on Tumblr', 'width=550,height=550')"
          target="_blank"
          title="Tell Tumblr about this page"
        >Tumblr</a> &middot;
        <a
          href="http://www.linkedin.com/shareArticle?mini=true&url=http%3A%2F%2Ftcorbett.co.uk%2Fprojects%2Fmusic-artwork%2FWintermachine%2FArchaeology.html&title=Wintermachine%20-%20Archaeology%20by%20Tom%20Corbett"
          onclick="return !window.open(this.href, 'Share on LinkedIn', 'width=870,height=600')"
          target="_blank"
          title="Share this page on LinkedIn"
        >LinkedIn</a>
      </p>
    </section>
  </div>
</template>
