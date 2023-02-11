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
  background $lab-bg
  color $bg
  pad(2, 0)
}

</style>
