<script setup>

import { init, animate, pause } from '../../js/fbx'

// eslint-disable-next-line no-undef
onMounted(() => {
  init()
  animate()
})

// eslint-disable-next-line no-undef
onUnmounted(() => {
  pause()
})
</script>

<template>
  <div class="eccomi" />
</template>

<style lang="stylus">

.test, .eccomi, canvas {
  height 100%
  position relative
  width 100%
}

</style>
