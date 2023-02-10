<template>
  <div class="desktop-layout">
    <app-header />

    <slot />

    <app-desktop />

    <app-tldr />

    <app-pool />

    <app-footer />
  </div>
</template>

<style lang="stylus">

@import "../stylus/_variables"

.header, .footer {
  position fixed
  z-index 2
}

.desktop-layout {
  height 100%
}

</style>
