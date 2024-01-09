<script setup>
useHead({
  htmlAttrs: {
    class: 'lab-app'
  }
})
</script>

<template>
  <div class="layout lab-layout">
    <app-header />
    <slot class="page lab-page" />
    <app-tldr />
  </div>
</template>

<style lang="stylus">

@import "../stylus/_variables"

.lab-app {
  background $lab-bg
}

.lab-page {
  font-family $lato
  color $gry
  pad(2, 0)

  p {
    letter-spacing $ls * 0.1
  }

  strong {
    font-weight 700
  }
}

</style>
