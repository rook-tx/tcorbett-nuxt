<script setup>
import { isFilled } from '@prismicio/client'
useHead({
  title: 'Linktree'
})
definePageMeta({
  layout: 'linktree',
})
const { client } = usePrismic()
const { data: doc } = await useLazyAsyncData('linktree', () => client.getSingle('linktree'))
</script>

<template>
  <div class="linktree-page">
    <div class="content">
      <div class="profile">
        <prismic-image
          v-if="isFilled.image(doc.data.image)"
          :field="doc.data?.image"
          width="120"
          height="120"
        />
      </div>

      <prismic-rich-text :field="doc.data.title" />

      <ul>
        <modules-tree-link
          v-for="(link, idx) in doc.data.links"
          :key="idx"
          :link="link"
        />
      </ul>
    </div>
  </div>
</template>

<style lang="stylus">

@import "../stylus/_variables"

.linktree-page {
  height 100%
  overflow-y scroll
  overflow-x hidden
  position relative
  z-index 1

  .content {
    overflow hidden
    mgn(2, auto)
    min-height 100%
    max-width $pwidth * 1rem
    text-align center
    width 100%
  }

  h1 {
    fs(mp(3))
    font-weight 400
    mgn(2, 0)
  }

  .profile {
    overflow hidden
    border-radius 5em
    height 6em
    mgn(1, auto)
    width 6em

    img {
      object-fit cover
      height 100%
      width 100%
    }
  }
}

</style>

