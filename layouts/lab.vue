<template>
  <div class="lab-layout">
    <lab-header />
    <slot />
    <app-tldr />
  </div>
</template>

<style lang="stylus">

@import "../stylus/_variables"

.lab-layout {
  height 100%
  overflow auto
}

.lab-page {
  background #0c0911
  color $bg
  pad(2, 0)
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
