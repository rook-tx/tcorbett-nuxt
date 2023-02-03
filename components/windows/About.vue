<script setup>
const { client } = usePrismic() // eslint-disable-line no-undef
const { data: home } = await useAsyncData('home', () => client.getSingle('home')) // eslint-disable-line no-undef
</script>

<template>
  <div
    class="body-about"
    @scroll.passive="frameScroll"
  >
    <div class="wrap">
      <div class="slide">
        <h1 class="title">
          <span>Hi, I&#8217;m Tom.</span>
        </h1>
      </div>

      <div
        v-for="(slide, idx) in home.data.slide"
        :key="idx"
        ref="slides"
        :class="[ 'slide', { active: sidx === idx }]"
      >
        <prismic-rich-text
          :field="slide.slide_copy"
        />
        <img
          :src="slide.slide_image.url"
          :alt="slide.slide_image.alt"
          class="intro-img"
        >
      </div>

      <slices-tldr />

      <div
        v-if="active"
        class="intro-frame"
      >
        <div
          class="frame-display"
          :style="{ backgroundImage: `url(${frameSrc})` }"
        />
        <div class="frame-credit" />
      </div>
    </div>
  </div>
</template>

<script>

import { mapState } from 'pinia'
import { useDeviceStore } from '@/stores/device'

import cushions from '/images/cushions.jpg'

export default {

  props: {
    active: {
      type: Boolean,
      default: false
    }
  },

  data() {
    return {
      // progress: 0,
      full: false,
      pageData: {},
      frameSrc: cushions,
      sidx: -1
    }
  },

  computed: {
    ...mapState(useDeviceStore, [
      'win'
    ]),

    thumbnail() {
      return this.win.x < 600
    },

    halfHeight() {
      return this.win.y / 2
    },

    slideTops() {
      return this.$refs.slides ? this.$refs.slides.map((slide) => slide.offsetTop) : []
    }
  },

  watch: {
    sidx: {
      handler(sidx) {
        const newSrc = this.thumbnail ?
          this.pageData.slide[sidx].slide_image.Tablet.url :
          this.pageData.slide[sidx].slide_image.url

        if (newSrc && this.frameSrc !== newSrc) {
          this.frameSrc = newSrc
        }
      }
    }
  },

  mounted() {
    this.getContent()
  },

  methods: {
    getContent() {
      this.$prismic.client.getSingle('home')
        .then((document) => {
          this.pageData = document.data
        })
    },

    frameScroll(e) {
      const scroll = e.target.scrollTop

      // this.$emit('progress', scroll / (this.$el.scrollHeight - this.halfHeight * 2))

      const imSelected = this.slideTops.findIndex((slideTop) => scroll + this.halfHeight < slideTop) - 1

      if (imSelected !== this.sidx) {
        this.sidx = imSelected
      }
    }
  }
}

</script>

<style lang="stylus">

@import "../../stylus/_variables"

.body-about
  &.body-about
    .wrap
      pad(0, 1)

      +above($laptop)
        pad(0, 1.5)

    .active &
      +below($mobile)
        padding-top 50%

.slide
  mgn(4, 0)

  h1
    letter-spacing -.04em

    +below($mobile)
      fs(mp(6))

  h2
    fs(mp(3) - 4, 40)
    letter-spacing -.01em

  h3
    fs(mp(2), 40)
    mgn(0, 0, 2)

  p
    mgn(4, 0)

    strong
      font-weight 400

.intro-frame
  +above($mobile)
    display block

// ----------
// Frame
// ----------

.intro-img.intro-img
  border-top 1px solid lighten($bgry,65%)
  display block
  font-style italic
  height 0
  margin 0 auto
  max-width 100%
  width 100%

.trigger
  border-bottom 1px solid lighten($bgry,60%)
  color $dblk
  font-weight 400
  position relative
  white-space nowrap

  h3 &
    color $blk

  &::after
    border-bottom 2px solid darken($prpl,10%)
    bottom -1px
    content ''
    left 0
    position absolute
    width 100%
    transform scaleX(0)
    transition transform 300ms $easeOutQuint
    transform-origin left

  .slide.active &
    &::after
      transform scaleX(1)
      transition-duration 1s

.slide
  a
    position relative
    white-space nowrap

    &::before
      border-bottom 1px solid $blu
      bottom 0
      left 0
      content ''
      position absolute
      width 100%

.intro-frame
  position fixed
  pointer-events none

  +above($tablet)
    top $let * 4em
    bottom $let * 4em
    left $gut * 2em
    right 52%

  +below($tablet)
    position absolute
    height 38%
    left -1px
    right -1px
    top -1px

.frame-display
  background url(/images/cushions.jpg) no-repeat center
  background-size cover
  bottom 0
  transition background .2s, transform 1s $easeOutCubic
  position absolute
  left 0
  right 0
  top 0

  +above($tablet)
    background-size contain
    left $gut * 0em
    right $gut * 0em
    top $let * 0em
    bottom $let * 0em

.frame-credit
  background rgba($w,.5)
  bottom (-($let*.5em))
  left 0
  position absolute
  width 100%

  +above($tablet)
    left (-($gut*1em))

  +below($mobile)
    display none

  span
    color $bgry
    display block
    font-family $lato
    fs(mp(-3))
    font-weight 400
    letter-spacing $ls
    line-height $letc
    text-transform uppercase
    white-space nowrap

  a
    border-bottom 1px solid $bdr
    color darken($bgry,8%)
    transition color .2s

    &:hover, &:focus, &:active
      color $nblk

</style>
