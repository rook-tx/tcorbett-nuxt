<script setup>
import { isFilled } from '@prismicio/helpers'

const { client } = usePrismic()
const { data: labs } = await useLazyAsyncData('labs', () => client.getSingle('labs'))
</script>

<template>
  <div class="labs">
    <div
      class="wrap"
    >
      <prismic-rich-text
        v-if="isFilled.richText(labs.data.blurb)"
        :field="labs.data.blurb"
      />

      <ol v-if="labs?.data">
        <li
          v-for="lab in labs.data.labs"
          :key="lab.lab_id"
          class="lab"
        >
          <a
            v-if="lab.lab_link && lab.lab_link.link_type === 'Web'"
            :href="lab.lab_link.url"
            target="_blank"
            rel="noopener"
          >
            <prismic-text
              class="url"
              :field="lab.lab_title"
            />
            <div
              v-if="isFilled.image(lab.lab_thumb)"
              class="thumb"
            >
              <prismic-image :field="lab.lab_thumb" />
            </div>
          </a>

          <a
            v-else-if="!lab.lab_id && isFilled.linkToMedia(lab.video)"
            :href="lab.video.url"
            target="_blank"
            rel="noopener"
          >
            <prismic-text
              class="url"
              :field="lab.lab_title"
            />
            <div
              v-if="isFilled.image(lab.lab_thumb)"
              class="thumb"
            >
              <prismic-image :field="lab.lab_thumb" />
            </div>
          </a>

          <a
            v-else
            :href="`/labs/${lab.lab_id}/`"
            target="_blank"
            rel="noopener"
          >
            <prismic-text
              class="url"
              :field="lab.lab_title"
            />

            <div
              v-if="isFilled.linkToMedia(lab.video)"
              class="video"
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
              v-else-if="isFilled.image(lab.lab_thumb)"
              class="thumb"
            >
              <prismic-image :field="lab.lab_thumb" />
            </div>
          </a>

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
  background $b
  color $w

  ::selection
    background $b
    color $w

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
      font-family $lato
      font-weight 400
      letter-spacing ($ls / 3)
      margin 0
      text-transform lowercase

  .video
    max-width 100%

    video
      display block
      max-width 100%
      width 100%

</style>
