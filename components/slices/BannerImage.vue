<script setup>

import { isFilled } from '@prismicio/helpers'

defineProps( {
  slice: {
    type: Object,
    default: null
  }
})

function showCaption(item) {
  return isFilled.richText(item.caption)
}

</script>

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
        <div
          v-if="showCaption(item)"
          class="content caption"
        >
          <prismic-rich-text
            :field="item.caption"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="stylus">

@import "../../stylus/_variables"

.banner-image {

  .content {
    .caption {
      pad(0, 0, 1)
    }
  }

  .full-content {
    pad(1, 0)
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
