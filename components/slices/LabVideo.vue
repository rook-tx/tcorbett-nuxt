<script setup>
defineProps({
  lab: {
    type: Object,
    default: () => ({
      data: {}
    })
  }
})
</script>

<template>
  <div class="lab-video">
    <div class="content full-content">
      <div
        v-if="lab?.data?.video?.url"
        class="video"
      >
        <div class="video-wrap">
          <video
            :src="lab.data.video.url"
            autoplay
            playsinline
            muted
            controls
            loop
          />
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="stylus">

@import "../../stylus/_variables"

.lab-video {
  video {
    max-height 100vh
    object-fit contain
    width 100%
  }
}

</style>
