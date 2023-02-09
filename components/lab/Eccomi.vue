<script setup>

import { init } from '../../js/fbx'

// eslint-disable-next-line no-undef
onMounted(() => {
  // eslint-disable-next-line no-undef
  nextTick(() => {
    init()
  })
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
