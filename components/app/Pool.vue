<template>
  <div class="pool" />
</template>

<script>

import { multipleSplats, update, playPause } from '../../js/pool'

export default {

  data() {
    return {
      init: false,
      playing: true
    }
  },

  watch: {
    $route: {
      immediate: true,
      handler({ name }) {
        if ([ 'labs', 'linktree' ].includes(name)) {
          if (this.playing) {
            playPause()
            this.playing = false
          }
        } else {
          if (!this.playing) {
            playPause()
            this.playing = true
          }
        }

        if (this.init) {return}
        this.init = true
        multipleSplats(parseInt(Math.random() * 20, 10) + 5)
        update()
      }
    }
  },

  methods: {
    toggleCanvas() {
      playPause()
    }
  }
}

</script>
