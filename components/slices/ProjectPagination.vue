<script setup>

const props = defineProps({
  current: {
    type: String,
    default: ''
  },
  projects: {
    type: Array,
    default: () => []
  }
})

const idx = computed(() => props.projects.findIndex((project) => props.current === project.uid))

const prev = computed(() => idx.value > 0 && idx.value < props.projects.length  ? props.projects[idx.value - 1] : props.projects[props.projects.length - 1])

const next = computed(() => idx.value > -1 && idx.value < props.projects.length - 1 ? props.projects[idx.value + 1] : props.projects[0])

</script>

<template>
  <div class="project-footer">
    <section class="sec pagination">
      <div class="pag-wrap">
        <nuxt-link
          v-if="prev"
          :to="`/projects/${prev.uid}`"
          class="pag prev"
        >
          <span class="pag-arrow">&laquo;</span><br>
          Previous:<br>
          <strong>
            <prismic-text :field="prev.data.project_title" />
          </strong>
        </nuxt-link>
      </div>

      <div class="pag-wrap index-pag">
        <a
          href="/projects/list"
          class="pag"
        >All projects</a>
      </div>

      <div class="pag-wrap">
        <nuxt-link
          v-if="next"
          :to="`/projects/${next.uid}`"
          class="pag next"
        >
          <span class="pag-arrow">&raquo;</span><br>
          Next:<br>
          <strong>
            <prismic-text :field="next.data.project_title" />
          </strong>
        </nuxt-link>
      </div>
    </section>
  </div>
</template>

<style lang="stylus">

@import "../../stylus/_variables"

.pagination
  border-top: 1px solid $nw
  padding: 0
  display flex
  mgn(0, 0, 3)

.pag-wrap
  width: 40%
  min-height: 1em

.index-pag
  width: 20%
  border-left: 1px solid $nw
  border-right: 1px solid $nw

.pag-wrap
  +above($mobile)
    width: 100%
    border-bottom: 1px solid $nw
    border-width: 0 0 1px

.pag
  width: 100%
  height: 100%
  text-align: center
  display: block
  padding: $let*1em 0
  background: rgba($nw,.1)
  transition .5s all ease-out

  &:hover
    box-shadow: inset 0 3px 13px rgba($blk,.05)
    background: rgba($blk,.03)
    transition .2s all ease-out

  .index-pag &
    padding: $let*2em 0

    +above($mobile)
      padding: $let*1em 0

// .pag-arrow
//   font-size: ($h2/$p)*1em
//   line-height: ($p/$h2)

</style>
