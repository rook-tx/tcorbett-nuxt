<template>
  <div
    :class="[ 'window', { active: active }]"
    :style="pos"
  >
    <div class="window-header">
      <h2
        class="window-label caption"
        v-html="data.title"
      />

      <div class="icons">
        <div
          v-if="active"
          class="close"
        >
          <nuxt-link
            to="/"
            @click.stop=""
          >
            <svg
              focusable="false"
              xmlns="http://www.w3.org/2000/svg"
              width="30"
              height="30"
              fill="none"
              viewBox="0 0 30 30"
            >
              <path d="M1 1l28 28" />
              <path d="M29 1L1 29" />
            </svg>
          </nuxt-link>
        </div>
        <div
          v-else
          class="expand"
        >
          <nuxt-link
            :to="`/${data.id}`"
            @click.stop=""
          >
            <svg
              focusable="false"
              xmlns="http://www.w3.org/2000/svg"
              width="30"
              height="30"
              fill="none"
              viewBox="0 0 400 400"
            >
              <path d="M68.5 76l7.6-7.6 92.3 92.3-7.6 7.6z" />
              <path d="M77.6 132.2H67V66.8h65.3v10.7H77.6v54.7zM68.6 324.1l92.3-92.3 7.6 7.5L76 331.7z" />
              <path d="M132.3 333.2H67v-65.4h10.6v54.7h54.8v10.7zM231.6 160.7l92.3-92.3 7.6 7.6-92.4 92.3z" />
              <path d="M333 132.2h-10.6V77.5h-54.8V66.8H333v65.4zM231.6 239.3l7.6-7.6 92.3 92.4-7.6 7.6z" />
              <path d="M333 333.2h-65.4v-10.7h54.8v-54.7H333v65.4z" />
            </svg>
          </nuxt-link>
        </div>
      </div>
    </div>

    <div :class="[ 'window-body', `window-${data.id}` ]">
      <component
        :is="data.id"
        :active="active"
      />
    </div>
  </div>
</template>

<script>

import { mapState } from 'pinia'
import { useDeviceStore } from '@/stores/device'

import About from '../windows/About.vue'
import Projects from '../windows/Projects.vue'
import Labs from '../windows/Labs.vue'

export default {

  components: {
    About,
    Projects,
    Labs
  },

  props: {
    data: {
      type: Object,
      default: () => ({
        id: '',
        title: '',
        pos: {
          x: 720,
          y: 400
        }
      })
    },

    z: {
      type: Number,
      default: 0
    },

    active: {
      type: Boolean,
      default: false
    }
  },

  computed: {
    ...mapState(useDeviceStore, [
      'win',
      'mobile'
    ]),

    pos() {
      if (this.active) {
        return this.data.id === 'about' ? {
          left: `${this.mobile ? 10 : (this.win.x * 0.5)}px`,
          top: '50px',
          zIndex: this.z
        } : {
          left: 0,
          top: 0,
          transform: `translateX(${this.mobile ? 10 : this.win.x * 0.382}px) translateY(50px) translateZ(0)`,
          zIndex: this.z
        }
      } else if (this.data.pos) {
        const { x, y } = this.data.pos

        return this.data.id === 'about' ? {
          left: `${x}px`,
          top: `${y}px`,
          zIndex: this.z
        } : {
          left: 0,
          top: 0,
          transform: `translateX(${x}px) translateY(${y}px) translateZ(0)`,
          zIndex: this.z
        }
      }

      return {
        left: 0,
        top: 0,
        zIndex: this.z
      }
    }
  }
}

</script>

<style lang="stylus">

@import "../../stylus/_variables"

.window
  background $prpl
  background linear-gradient(135deg,$prpl,$blu,$blk)
  border-radius 10px
  box-shadow 1vh 1vh rgba($blk,.038)
  height 85%
  max-height 0.618 * 61.8vw
  display flex
  flex-direction column
  opacity .98
  position absolute
  transition max-height 500ms $easeInOutQuint 0ms
  transition-property left, right, top, width, max-height, opacity
  transition-property left, top, transform, width, max-height, opacity
  max-width $pwidth * 1.618 * 1rem
  width 61.8vw
  z-index 0

  +above($tablet)
    height 90%
    max-height 21vw
    width 33vw

  +above($laptop)
    min-height 13.5em
    min-width 24em

  .dragging &
    transition-duration 0ms

  &-header
    align-items center
    display flex
    cursor grab
    pad(0, .5)
    height $let * 2rem

  &-body
    overflow hidden
    position absolute
    left 2px
    right 2px
    bottom 2px
    top $let * 2rem
    border-radius 9px

    ::-webkit-scrollbar
      width 16px

    ::-webkit-scrollbar-track
      background $w

    ::-webkit-scrollbar-thumb
      border-radius 7px
      background $blu
      opacity 1
      border 6px solid $w

    &.window-labs
      ::-webkit-scrollbar-track
        background $b

      ::-webkit-scrollbar-thumb
        background $prpl
        border-color $b

    >
      div
        background $w
        height 100%
        overflow-y scroll
        overflow-x hidden

        > div
          pad(0, 1, 4)
          width 100%

  &-label
    color $w
    font-weight 600
    text-shadow 0 0 1px rgba($b, .4)
    mgn(.25, .5)

  &.active
    bottom $let * 2em
    box-shadow $let * 1vh $let * 1vh rgba($blk,.08)
    max-height 85%
    opacity 1
    right $gut * 1em
    top $let * 2em
    max-width 37rem
    transition-delay 300ms

    +above($tablet)
      bottom $let * 2.5em
      max-height 90%
      width 48vw

    +below($tablet)
      right $gut * .5em
      left $gut * 2em // !important
      width auto

  .open &
    &:not(.active)
      opacity .2
      transition-timing-function $easeOutQuint

      &:hover
        opacity .85

    &.active
      opacity 1

  .icons
    margin-left auto

    a
      pad(.5, .5)

    svg
      stroke $w
      stroke-width 5

  .expand, .close
    a, svg
      display block

  .expand
    svg
      height 1em
      stroke-width 12
      width 1em

  .close
    svg
      height 14px
      width 14px

</style>
