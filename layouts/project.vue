<script setup>

const links = [
  {
    id: 'tcorb',
    label: 'T Corbett',
  },
  {
    id: 'projects',
    label: 'Projects',
  }
]

const progress = ref(0)
let height = 800

function handleScroll(e) {
  progress.value = e.target.scrollingElement.scrollTop / height
}

function resize() {
  height = document.scrollingElement.scrollHeight - window.innerHeight
}

onMounted(() => {
  resize()
  window.addEventListener('resize', resize, { passive: true })
  window.addEventListener('scroll', handleScroll, { passive: true })
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', resize, { passive: true })
  window.removeEventListener('scroll', handleScroll, { passive: true })
})

</script>

<template>
  <div class="project-layout">
    <app-header
      :line="true"
      :progress="progress"
      :links="links"
    />
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
