<script setup lang="ts">
defineProps({
  error: Object as () => NuxtError
})

useHead({
  htmlAttrs: {
    class: 'desktop-app'
  }
})

</script>

<template>
  <div class="desktop-layout">
    <app-header />
    <app-tldr />
    <app-pool />
    <div class="error-message">
      <h1>{{ error.statusCode }}</h1>
      <h2>Sorry about that 😬</h2>
      <NuxtLink to="/">Try again?</NuxtLink>
    </div>
    <app-footer />
  </div>  
</template>

<style lang="stylus">

@import "../stylus/_variables"

.error-message {
  position absolute
  pad(2, 1, 3)
  text-align right
  bottom 0
  right 0

  a {
    text-decoration underline
  }
}

</style>
