<script setup>
const links = [
  {
    id: 'tcorb',
    label: 'T Corbett',
  },
  {
    id: 'labs',
    label: 'Labs',
  }
]
</script>

<template>
  <div class="layout lab-layout">
    <!-- <lab-ext-header v-if="ext" /> -->
    <app-header
      :links="links"
    />
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
