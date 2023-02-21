<script setup>
useHead({
  title: 'Chat GPTom'
})

definePageMeta({
  layout: 'lab'
})

</script>

<template>
  <div class="page lab-page chat-page">
    <lab-chat-gptom />
    <lab-eccomi />
  </div>
</template>

<style lang="stylus">

@import "../../stylus/_variables"

.chat-page {
  h1 {
    fs(mp(0))
    color $dgry
    font-weight 600
    mgn(2, 0, 1)
  }

  .content {
    max-width $pwidth * 1.382rem
    pad(1, 1)
  }

  .credit {
    color $blk
    fs(mp(-4))
    pad(1, 0)

    a {
      border-bottom 1px solid
    }

    svg {
      display inline-block
      fill $blk
      height 1rem
      width 1rem
      vertical-align middle
      margin-right 1em
    }

    +below($mobile) {
      display block
      white-space wrap
    }
  }

  .eccomi {
    +above($tablet) {
      position absolute
      left -25%
      top 0
      width 50%
      z-index 0
    }
  }

  .chat-gptom {
    +above($tablet) {
      left 38%
      width 62%
      position relative
      z-index 1
    }
  }
}

</style>
