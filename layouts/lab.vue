<script setup>
const route = useRoute()

const ext = [ 'labs-chat' ].includes(route.name)

</script>

<template>
  <div class="layout lab-layout">
    <lab-ext-header v-if="ext" />
    <lab-header v-else />
    <slot class="page lab-page" />
    <app-tldr />
  </div>
</template>

<style lang="stylus">

@import "../stylus/_variables"

.lab-page {
  background #0c0911
  color $bg
  pad(2, 0)
}

</style>
