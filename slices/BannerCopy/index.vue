<script setup lang="ts">
import { Content } from '@prismicio/client'

defineProps(getSliceComponentProps<Content.BannerCopySlice>([]))
</script>

<template>
  <div class="banner-copy">
    <prismic-rich-text
      class="content"
      :field="slice.primary.content"
    />
  </div>
</template>
