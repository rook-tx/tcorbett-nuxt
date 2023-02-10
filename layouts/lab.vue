<template>
  <div class="layout lab-layout">
    <lab-header />
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
