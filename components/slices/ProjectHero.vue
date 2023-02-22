<script setup>

import dayjs from 'dayjs'

defineProps({
  project: {
    type: Object,
    default: () => ({
      headline: []
    })
  }
})

</script>

<template>
  <div class="project-hero">
    <div class="content">
      <prismic-rich-text
        class="title"
        :field="project.project_title"
      />
      <h2
        v-if="project.launch_date"
        class="date caption"
      >
        {{ dayjs(project.launch_date).format('MMMM') }}
        <span>{{ dayjs(project.launch_date).format('YY') }}</span>
      </h2>
    </div>
  </div>
</template>

<style lang="stylus">

@import "../../stylus/_variables"

.project-hero {
  pad(4, 0, 0)

  .title {
    border-bottom: 1px solid $prpl
    pad(1, 0)

    h1 {
      fs(mp(7), $lh * 4)
      font-weight 100
      margin: 0
    }
  }

  .date {
    text-align right
    mgn(1, 0, 2)
    max-width 100%
    color $nblk

    span {
      color $prpl
    }
  }
}

</style>
