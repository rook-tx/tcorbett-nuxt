<script setup>
definePageMeta({ // eslint-disable-line no-undef
  layout: 'project',
})
const { client } = usePrismic() // eslint-disable-line no-undef
const route = useRoute() // eslint-disable-line no-undef
const { data: doc } = await useAsyncData('project', async () => { // eslint-disable-line no-undef
  const projects = await client.getAllByType('project')
  return {
    projects,
    project: projects.find((p) => p.uid === route.params.slug)
  }
})

function getComponent(type) {
  return `${type.replaceAll('_', '-')}`
}

</script>

<template>
  <div :class="$route.params.slug">
    <slices-project-hero
      :project="doc?.project?.data"
    />

    <component
      :is="getComponent(slice.slice_type)"
      v-for="(slice, idx) in doc?.project?.data?.body"
      :key="idx"
      :slice="slice"
    />

    <slices-project-footer />
  </div>
</template>

<script>

import BannerCopy from '@/components/slices/BannerCopy.vue'
import BannerImage from '@/components/slices/BannerImage.vue'

export default {
  components: {
    BannerCopy,
    BannerImage
  },
}

</script>
