<template>
  <div class="banner-copy">
    <prismic-rich-text
      class="content"
      :field="slice.primary.content"
    />
  </div>
</template>

<script>

export default {
  props: {
    slice: {
      type: Object,
      default: null
    }
  }
}

</script>

<style lang="stylus">

@import "../../stylus/_variables"

.banner-copy {
}

</style>

