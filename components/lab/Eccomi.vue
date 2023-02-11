<script setup>

import { init, animate, pause } from '../../js/fbx'

onMounted(() => {
  init()
  animate()
})

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
