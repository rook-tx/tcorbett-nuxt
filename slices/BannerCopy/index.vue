<script setup lang="ts">
defineProps(getSliceComponentProps([ 'slice', 'index', 'slices', 'context' ]))
</script>

<template>
  <div class="banner-copy">
    <prismic-rich-text
      class="content"
      :field="slice.primary.content"
    />
  </div>
</template>
