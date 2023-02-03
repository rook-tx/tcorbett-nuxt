<template>
  <div class="pool">
    <canvas
      ref="canvas"
      class="pool-canvas"
    />
  </div>
</template>

<script>

import { init, update } from '@/js/pool'

export default {

  mounted() {
    init(this.$refs.canvas)
    update()
  }

}

</script>

<style lang="stylus">

@import "../../stylus/_variables"

.pool {
  abs()
  overflow hidden
  pointer-events none
  z-index 0
}

.pool-canvas {
  height 104%
  width 104%
  left -2%
  top -2%
  overflow hidden
  position absolute
}

</style>
