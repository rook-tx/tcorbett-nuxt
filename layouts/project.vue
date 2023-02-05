<template>
  <div class="project-layout">
    <project-header />
    <slot />
    <app-tldr />
  </div>
</template>

<style lang="stylus">

@import "../stylus/_variables"

.project-layout {
  height 100%
}

.project-page {
  min-height 100%
  overflow hidden
}

.content {
  pad(1, 1)
  mgn(1, auto)
  max-width ($pwidth + $gut * 2) * 1rem
  width 100%

  p {
    mgn(1, 0)

    strong {
      font-weight 400
    }
  }
}

</style>
