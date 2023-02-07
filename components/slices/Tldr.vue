<script setup>
const { client } = usePrismic() // eslint-disable-line no-undef
const { data: home } = await useLazyAsyncData('home', () => client.getSingle('home')) // eslint-disable-line no-undef
</script>

<template>
  <div
    v-if="home"
    class="tldr-content"
  >
    <h2 class="tldr-title">
      <span>TL;DR</span>
    </h2>

    <h3 class="tldr-subtitle">
      Projects
    </h3>

    <ol>
      <li
        v-for="link in home.data.project"
        :key="link.project_url.url"
      >
        <a
          :href="link.project_url.url"
          target="_blank"
          rel="noopener"
        >
          <span
            class="url"
          >{{ $prismic.asText(link.project_title) }}</span>
          <span
            class="info"
          >&mdash; {{ $prismic.asText(link.role) }}</span>
        </a>
      </li>
    </ol>

    <prismic-rich-text
      class="tldr-skills"
      :field="home.data.skills"
    />

    <div class="email-icon">
      <h6>Get in touch</h6>
      <a
        href="mailto:twcorb@gmail.com"
        target="_blank"
        rel="noopener"
      >twcorb@gmail.com</a>
    </div>
  </div>
</template>

<style lang="stylus">

@import "../../stylus/_variables"

// ----------
// TLDR
// ----------

.tldr
  &, &-switch-wrap
    position fixed

    +above($mobile)
      left 50%
      right $gut*1em
      top ($lh*2.5)*1px

  background $b
  border-radius 6px
  background linear-gradient(-45deg, $prpl, $blu, $blk)
  transition opacity .3s linear, transform .3s $easeInExpo
  opacity 1
  transform scale(1)
  max-width $pwidth * 1.618 * 1rem
  z-index 10

  &.v-enter-from,
  &.v-leave-to
    opacity 0
    transform scale(1.05)

  // &.tldr-open
  &.v-enter-active
    transition opacity .4s linear, transform .5s $easeOutBack

  +above($mobile)
    bottom $let * 2.25em

    &.tldr-open
      z-index 2

  +below($mobile)
    bottom $p * .5px
    left $p * .5px
    right $p * .5px
    top $p * .5px

    &.tldr-open
      z-index 2000

  &-content
    .tldr &
      background $w
      border-radius 4px
      bottom 2px
      left 2px
      overflow hidden
      overflow-y auto
      pad(1, 2)
      position absolute
      right 2px
      top 2px
      z-index 0

      +below($mobile)
        overflow-y scroll
        overflow-scrolling touch
        pad(1, 1)

    .one-col &
      mgn(10,0,0)

    ol
      mgn(0, 0, 4)

      li
        mgn(0, 0, .5)

        +below($mobile)
          mgn(0, 0, 1)

    ul
      list-style disc
      pad(0, 0, 0, 1)

      li
        pad(0, 0, 0, .5)

    li
      a
        +below($mobile)
          align-items flex-start
          display flex
          justify-content space-between

          .info
            text-align right

        &:hover, &:focus
          .url
            border-bottom-color $blk
            color $blu

          .info
            color darken($bgry,20%)

    .url
      border-bottom 1px solid $blu
      font-weight 400
      line-height $let
      transition border .2s, color .2s

    .info
      color $bgry
      fs(mp(-3))
      font-style italic
      font-weight 300
      transition color .2s

    .email-icon
      border 1px solid $gry
      border-radius 2px
      mgn(2, auto)
      pad(2, .5)
      text-align center

      h6
        margin 0

      a
        border-bottom 1px solid $blu
        color $blk
        transition all .2s

        &:hover, &:focus
          border-color $blk
          color $blu

  &-title,
  &-subtitle,
  &-skills p
    font-family $lato
    fs(mp(-3))
    font-weight 700
    letter-spacing .2em
    max-width 100%
    mgn(1, 0)
    text-transform uppercase

  &-title
    mgn(0, 0, 2)
    text-align center

    span
      border 1px solid
      border-radius 3px
      display inline-block
      pad(0,.5)

  &-subtitle
    color $prpl

  &-skills p
    color $blu

  &-close
    color lighten($bgry,20%)
    cursor pointer
    font-family $lato
    fs(mp(-3))
    font-weight 700
    letter-spacing .2em
    mgn(1,0)
    pad(0,2)
    padding-top 2px
    padding-bottom 2px
    position absolute
    right 0
    text-transform uppercase
    top 2px
    transition color .2s

    &::before, &::after
      background $blk
      content ''
      display block
      height 3px
      position absolute
      transition background .2s
      transform-origin right center
      right $lh*1px
      width $lh*1px

      +below($mobile)
        height 2px
        right 16px
        width 16px

    &::before
      top 3px
      transform rotate(-45deg)

    &::after
      bottom 3px
      transform rotate(45deg)

      +below($mobile)
        bottom 4px

    &:hover, &:focus
      color $blk

      &::before, &::after
        background rgb(red($prpl),0,0)

  &-switch
    background none
    border 1px solid
    cursor pointer
    font-family $lato
    // font-size ($pc/$p)*1em
    fs(mp(-3))
    font-weight 700
    letter-spacing .2em
    // line-height $letc
    max-width 100%
    mgn(1,0)
    outline 0
    pad(0,.5)
    position absolute
    text-transform uppercase
    transition border .2s, opacity .2s linear
    z-index 1

    +above($mobile)
      left 50%
      top 2px
      transform translate3d(-50%,0,0)

    +below($mobile)
      margin 0
      top 12px
      right $gut*1rem

    &:hover
      border-color $prpl
      opacity 1 !important

    &:focus
      border-color $blu
      opacity 1 !important

    .tldr-hidden &
      opacity .05

    &-wrap
      z-index 1

      +below($mobile)
        left 0
        right 0
        top 0
        z-index 1000

</style>
