<template>
  <div class="banner-image">
    <div :class="[ 'content', { 'full-content': slice.primary.full }]">
      <prismic-rich-text
        :field="slice.primary.image_title"
      />

      <div
        v-for="(item, idx) in slice.items"
        :key="idx"
      >
        <prismic-image
          :field="item.image"
        />
        <div class="content caption">
          <prismic-rich-text
            :field="item.caption"
          />
        </div>
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
    .caption {
      pad(0, 0, 1)
    }
  }

  .full-content {
    padding 0
    max-width: $pwidth * 1.618rem;

    .caption {
      pad(0, 1, 1)
    }
  }

  .caption {
    mgn(0, auto)
    text-align right

    p {
      font-family $lato
      fs(mp(-1))
      max-width 100%
    }
  }
}

</style>
