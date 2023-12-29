<script setup>
import { asText, isFilled } from '@prismicio/client'

const { client } = usePrismic()
const { data } = await useAsyncData('chat', () => client.getByUID('lab', 'chat'))

useHead({
  title: asText(data?.value?.data?.lab_title),
  meta: { hid: 'og:image', property: 'og:image', content: isFilled.image(data?.value?.data.lab_thumb) ? data.value.data.lab_thumb.url : '/apple-touch-icon.png' }
})

definePageMeta({
  layout: 'lab'
})

</script>

<template>
  <div class="page lab-page chat-page">
    <lab-gpt-four />
    <lab-eccomi />
  </div>
</template>

<style lang="stylus">

@import "../../stylus/_variables"

.chat-page {

  +above($tablet) {
    display flex
    align-items flex-end
  }

  .content {
    max-width $pwidth * 1rem
    pad(1, 1, 1, 1)
  }

  .eccomi {
    +above($tablet) {
      position fixed
      left -25%
      top 0
      width 50%
      z-index 0
    }
  }

  .chat-gptom {
    +above($tablet) {
      left 38%
      width 62%
      position relative
      top 0
      height 100%
      overflow scroll
      z-index 1
    }
  }
}

</style>
