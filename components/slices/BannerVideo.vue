<script setup>
import { asText, isFilled } from '@prismicio/client'

defineProps({
  slice: {
    type: Object,
    default: () => ({
      primary: {
        video_asset: null,
        video_src: '',
      }
    })
  }
})
</script>

<template>
  <div class="banner-video">
    <div :class="[ 'content', { 'full-content': slice.primary.full }]">
      <div
        v-if="isFilled.linkToMedia(slice.primary.video_asset)"
        class="video"
      >
        <div class="video-wrap">
          <video
            :src="slice.primary.video_asset.url"
            autoplay
            playsinline
            muted
            controls
            loop
          />
        </div>
      </div>

      <div
        v-else-if="isFilled.keyText(slice.primary.vimeo_src)"
        style="padding:56.18% 0 0 0;position:relative;"
      >
        <iframe
          :src="slice.primary.vimeo_src"
          frameborder="0"
          allow="autoplay; fullscreen; picture-in-picture"
          allowfullscreen
          style="position:absolute;top:0;left:0;width:100%;height:100%;"
          :title="asText(slice?.primary?.lab_title)"
        />
      </div>
    </div>
  </div>
</template>

<style lang="stylus">

@import "../../stylus/_variables"

.banner-video {
  video {
    max-height 100vh
    object-fit contain
    width 100%
  }
}

</style>
