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
      <div class="pag-wrap index-pag">
        <h3>Projects</h3>
        <ul>
          <li
            v-for="project in projects"
            :key="project.uid"
          >
            <nuxt-link :to="`/projects/${project.uid}`">
              <prismic-text
                :field="project.data.project_title"
              />
            </nuxt-link>
          </li>
        </ul>
        <a
          href="/projects/list"
          class="pag"
        >All projects</a>
      </div>

      <div class="pag-wrap prev-wrap">
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

      <div class="pag-wrap next-wrap">
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
  width: 30%
  min-height: 1em

  +above($mobile)
    border-bottom: 1px solid $nw

.index-pag {
  width: 40%
  border-left: 1px solid $nw
  border-right: 1px solid $nw

  +above($tablet) {
    order 2
  }
}

.prev-wrap {
  +above($tablet) {
    order 1
  }
}

.next-wrap {
  +above($tablet) {
    order 3
  }
}

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
