<script setup lang="ts">
import { isFilled } from '@prismicio/client'

const { client } = usePrismic()
const { data: labs } = await useLazyAsyncData('labs', () => client.getSingle('labs'))
</script>

<template>
  <div class="labs">
    <div
      v-if="labs"
      class="wrap"
    >
      <prismic-rich-text
        v-if="isFilled.richText(labs?.data?.blurb)"
        :field="labs.data.blurb"
        class="blurb"
      />

      <ol v-if="labs?.data?.labs">
        <li
          v-for="lab in labs.data.labs"
          :key="String(lab.lab_id)"
          class="lab"
        >
          <nuxt-link
            :to="isFilled.link(lab.link) ? lab.link.url :
              !lab.lab_id && isFilled.linkToMedia(lab.video) ? lab.video.url :
              `/labs/${lab.lab_id}/`"
            :target="isFilled.link(lab.link) ? '_blank' : ''"
            rel="noopener"
          >
            <prismic-text
              class="url"
              :field="lab.title"
            />

            <div
              v-if="isFilled.linkToMedia(lab.video)"
              class="video thumb"
            >
              <div class="video-wrap">
                <video
                  :src="lab.video.url"
                  autoplay
                  playsinline
                  muted
                  loop
                />
              </div>
            </div>

            <div
              v-else-if="isFilled.image(lab.image)"
              class="thumb"
            >
              <prismic-image :field="lab.image" />
            </div>
          </nuxt-link>

          <prismic-rich-text
            class="info"
            :field="lab.notes"
          />
        </li>
      </ol>
    </div>
  </div>
</template>

<style lang="stylus">

@import "../../stylus/_variables"

.labs.labs
  background $lab-bg
  font-family $lato
  color $gry

  ::selection
    background $blk
    color $w

  .blurb {
    pad(3, 0, 0)

    h2 {
      fs(mp(1))
      margin 0
    }

    p {
      fs(mp(-1))
      letter-spacing $ls * 0.1
      margin 0
    }
  }

  .sec
    height 100%

  .wrap
    pad(0, 1, 3)
    min-height 100%

  .one-col
    height 100%
    pad(2, 2, 4)
    overflow auto

    h1
      fs(mp(9))

  .blurb
    fs(mp(-2))
    font-family $lato

  .lab
    mgn(3, 0)

    &:nth-child(3n - 1)
      pad(0, 0, 0, 2)

    &:nth-child(3n)
      pad(0, 0, 0, 4)

  .url
    display inline-block
    letter-spacing ($ls / 4)
    position relative

    &::after
      border-bottom 2px solid $prpl
      content ''
      bottom .25em
      left 0
      position absolute
      width 100%

  .thumb
    mgn(.5, 0)

  .info
    pad(0, 0, 0, 1)

    p, li
      fs(mp(-3))
      font-weight 400
      letter-spacing $ls * 0.5
      margin 0
      text-transform lowercase

    a
      border-bottom 1px solid $prpl

      &:hover
        color $prpl

  .video
    max-width 100%

    video
      display block
      max-width 100%
      width 100%

</style>
