<script setup>
import { asText } from '@prismicio/helpers'

defineProps({
  lab: {
    type: Object,
    default: () => ({
      data: {
        vimeo_src: 'https://player.vimeo.com/video/796342528?h=10d005b017&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479',
        lab_title: 'glowh'
      }
    })
  }
})
</script>

<template>
  <div class="lab-vimeo">
    <div class="content full-content">
      <div style="padding:56.18% 0 0 0;position:relative;">
        <iframe
          :src="lab?.data?.vimeo_src"
          frameborder="0"
          allow="autoplay; fullscreen; picture-in-picture"
          allowfullscreen
          style="position:absolute;top:0;left:0;width:100%;height:100%;"
          :title="asText(lab?.data?.lab_title)"
        />
      </div>
    </div>
  </div>
</template>
