<template>
  <div class="banner-image">
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
