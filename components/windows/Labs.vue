<script setup>
const { client } = usePrismic() // eslint-disable-line no-undef
const { data: projects } = await useAsyncData('projects', () => client.getSingle('projects')) // eslint-disable-line no-undef
</script>

<template>
  <div class="labs">
    <div
      class="wrap"
    >
      <div>
        <p>Live. Lab. Love.<br>Creative coding for the interactive in-browser connoisseur.</p>
      </div>

      <ol v-if="projects?.data">
        <li
          v-for="lab in projects.data.labs"
          :key="lab.lab_id"
          class="lab"
        >
          <a
            v-if="lab.lab_link && lab.lab_link.link_type === 'Web' && lab.lab_link.target === '_blank'"
            :href="lab.lab_link.url"
            target="_blank"
            rel="noopener"
          >
            <div
              class="url"
              v-html="$prismic.asText(lab.lab_title)"
            />
            <div
              v-if="lab.lab_thumb && lab.lab_thumb.url"
              class="thumb"
            >
              <img :src="lab.lab_thumb.url">
            </div>
          </a>

          <a
            v-else-if="!lab.lab_id && lab.video && lab.video.url"
            :href="lab.video.url"
            target="_blank"
          >
            <div
              class="url"
              v-html="$prismic.asText(lab.lab_title)"
            />
            <div
              v-if="lab.lab_thumb && lab.lab_thumb.url"
              class="thumb"
            >
              <img :src="lab.lab_thumb.url">
            </div>
          </a>

          <a
            v-else
            :href="`/labs/${lab.lab_id}/`"
            target="_blank"
            rel="noopener"
          >
            <div
              class="url"
              v-html="$prismic.asText(lab.lab_title)"
            />
            <div
              v-if="lab.lab_thumb && lab.lab_thumb.url"
              class="thumb"
            >
              <img :src="lab.lab_thumb.url">
            </div>
          </a>

          <prismic-rich-text
            class="info"
            :field="lab.notes"
          />

          <div
            v-if="lab.video && lab.video.url"
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
