<script setup lang="ts">
import { Content } from '@prismicio/client'

// The array passed to `getSliceComponentProps` is purely optional.
// Consider it as a visual hint for you when templating your slice.
defineProps(
  getSliceComponentProps<Content.BannerCopySlice>([
    'slice',
    'index',
    'slices',
    'context',
  ])
)
</script>

<template>
  <div class="banner-copy">
    <prismic-rich-text
      class="content"
      :field="slice.primary.content"
    />
  </div>
</template>
