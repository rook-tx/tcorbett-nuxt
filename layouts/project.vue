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
  overflow-y auto
  overflow-x hidden
}

.project-page {
  min-height 100%
  position relative
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

    a {
      border-bottom 1px solid $prpl
    }
  }
}

.full-content {
  pad(1, 0)
  max-width: $pwidth * 1.618rem;
}

</style>
