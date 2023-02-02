<template>
  <div class="ui">
    <app-header />

    <slot />

    <div
      :class="[ 'desktop', { dragging: draggingWindow }, { open: activeWindow }]"
      @touchend.passive="draggingWindow = false"
      @touchmove.passive="shouldTouchMove"
      @mouseup.passive="draggingWindow = false"
      @mousemove.passive="shouldMove"
    >
      <modules-window
        v-for="(win, idx) in windows"
        :key="idx"
        :data="win"
        :active="idx === activeWindowIdx"
        :z="latestZ[idx].index"
        @dragging="dragWindow(idx, $event)"
      />
    </div>

    <transition appear>
      <div
        v-show="tldr"
        class="tldr"
      >
        <slices-tldr />
        <button
          type="button"
          class="tldr-close"
          title="Close TL;DR panel"
          @click.left.prevent="toggleTldr(false)"
        >
          Close
        </button>
      </div>
    </transition>

    <canvas />

    <app-footer />
  </div>
</template>

<script>

import { mapActions, mapState } from 'pinia'
import { useAppStore } from '~~/stores/app'
import { useDeviceStore } from '~~/stores/device'

export default {

  data() {
    return {
      windows: [
        {
          id: 'about',
          title: 'About',
          pos: {
            x: 0,
            y: 0
          }
        },
        {
          id: 'projects',
          title: 'Projects',
          pos: {
            x: 0,
            y: 0
          }
        },
        {
          id: 'labs',
          title: 'Labs',
          pos: {
            x: 0,
            y: 0,
          }
        }
      ],
      lastTouch: {
        x: 0,
        y: 0,
        t: 0
      },
      draggingWindow: false,
      draggingWindowIdx: -1,
      activeWindow: false,
      activeWindowIdx: -1,
      latestZ: [ {
        index: 3
      }, {
        index: 2
      }, {
        index: 1
      } ]
    }
  },

  computed: {
    ...mapState(useDeviceStore, [
      'device',
      'winWidth',
      'winHeight'
    ]),
    ...mapState(useAppStore, [
      'tldr'
    ])
  },

  watch: {
    $route: {
      immediate: true,
      handler({ params }) {

        const { slug } = params

        this.activeWindowIdx = this.windows.findIndex((win) => win.id === slug)

        this.activeWindow = this.activeWindowIdx > -1

        if (this.activeWindow) {
          const updateZ = this.latestZ

          for (let i = 0; i < this.windows.length; i++) {
            updateZ[i].index = i === this.activeWindowIdx ? this.windows.length : Math.max(0, updateZ[i].index - 1)
          }

          this.latestZ = updateZ
        }
      }
    },

    winHeight: {
      handler() {
        this.layoutWindows()
      }
    },

    winWidth: {
      immediate: true,
      handler() {
        this.layoutWindows()
      }
    }
  },

  methods: {
    ...mapActions(useAppStore, [
      'toggleTldr'
    ]),

    layoutWindows() {
      const laywindows = this.windows.map((win) => ({
        ...win,
        pos: {
          x: Math.round(Math.random() * (this.winWidth * 0.4)),
          y: Math.round(this.winHeight * 0.1 + Math.random() * (this.winHeight * 0.4))
        }
      }))

      this.windows = laywindows

      this.lastTouch = {
        x: this.winWidth / 2,
        y: this.winHeight / 2,
        t: performance.now()
      }
    },

    dragWindow(idx, e) {

      if (this.device.touch && e.type === 'mousedown') { return }

      this.lastTouch.x = (e.type === 'touchstart' ? e.changedTouches[0].clientX : e.clientX) - this.windows[idx].pos.x
      this.lastTouch.y = (e.type === 'touchstart' ? e.changedTouches[0].clientX : e.clientY) - this.windows[idx].pos.y

      if (performance.now() - this.lastTouch.t < 300) {
        this.$router.push(`/${this.windows[idx].id}`)
      } else {
        this.draggingWindow = true
      }

      this.draggingWindowIdx = idx
      this.lastTouch.t = performance.now()

      const updateZ = this.latestZ

      for (let i = 0; i < this.windows.length; i++) {
        updateZ[i].index = i === idx ? this.windows.length : Math.max(0, updateZ[i].index - 1)
      }

      this.latestZ = updateZ

    },

    shouldTouchMove(e) {
      if (!this.draggingWindow) { return }
      this.windows[this.draggingWindowIdx].pos.x = e.changedTouches[0].clientX - this.lastTouch.x
      this.windows[this.draggingWindowIdx].pos.y = e.changedTouches[0].clientY - this.lastTouch.y
    },

    shouldMove(e) {
      if (!this.draggingWindow || this.device.mobile) { return }
      this.windows[this.draggingWindowIdx].pos.x = e.clientX - this.lastTouch.x
      this.windows[this.draggingWindowIdx].pos.y = e.clientY - this.lastTouch.y
    }
  },
}

</script>

<style lang="stylus">

@import "../stylus/_variables"

.header, .footer {
  position fixed
  z-index 2
}

</style>
