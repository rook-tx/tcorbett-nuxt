<template>
  <div class="banner-copy">
    <prismic-rich-text
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
