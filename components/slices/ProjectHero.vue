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
    <prismic-rich-text
      :field="project.project_title"
    />
    <span>
      {{ dayjs(project.launch_date).format('MMMM YY') }}
    </span>
    <prismic-image
      v-if="project?.project_image"
      :field="project.project_image"
    />
  </div>
</template>
