<script setup>

defineProps({
  slice: {
    type: Object,
    default: null
  }
})

</script>

<template>
  <div class="banner-copy">
    <prismic-rich-text
      class="content"
      :field="slice.primary.content"
    />
  </div>
</template>

<style lang="stylus">

@import "../../stylus/_variables"

.banner-copy {
}

</style>

