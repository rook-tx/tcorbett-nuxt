<template>
  <div class="sniffer" />
</template>

<script>

import { mapActions } from 'pinia'
import { useDeviceStore } from '@/stores/device'

export default {

  data() {
    const device = {
      win: {
        x: 1440,
        y: 800,
      },
      mouse: false,
      touch: false
    }

    return {
      device
    }
  },

  watch: {
    device: {
      immediate: true,
      handler(device) {
        this.updateDevice(device)
      }
    }
  },

  mounted() {
    window.addEventListener('touchstart', this.touchstart, { passive: true })
    window.addEventListener('mousemove', this.mousestart, { passive: true })
    window.addEventListener('resize', this.resize, { passive: true })
    this.$nextTick(this.resize)
  },

  beforeUnmount() {
    window.removeEventListener('mousemove', this.mousestart, { passive: true })
    window.removeEventListener('resize', this.resize, { passive: true })
  },

  methods: {
    ...mapActions(useDeviceStore, [
      'updateDevice'
    ]),

    touchstart() {
      this.device.touch = true
      window.removeEventListener('touchmove', this.touchstart, { passive: true })
    },

    mousestart() {
      this.device.mouse = true
      window.removeEventListener('mousemove', this.mousestart, { passive: true })
    },

    resize() {
      this.device.win = {
        x: window.innerWidth,
        y: window.innerHeight
      }
      this.device.portrait = window.innerWidth < window.innerHeight
    }
  }
}

</script>

<style lang="stylus">

.sniffer {
  display none
  pointer-events none
}

</style>
