<template>
  <div class="banner-image">
    <div class="content">
      <prismic-rich-text
        :field="slice.primary.image_title"
      />

      <div
        v-for="(item, idx) in slice.items"
        :key="idx"
      >
        <prismic-rich-text
          :field="item.caption"
        />
        <prismic-image
          :field="item.image"
        />
      </div>
    </div>
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

.banner-image {
  .content {
    mgn(1, auto)
    padding: 0;
    max-width: $pwidth * 1.618rem;
    width: 100%;
  }
}

</style>
