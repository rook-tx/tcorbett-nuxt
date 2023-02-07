<script setup>
definePageMeta({ // eslint-disable-line no-undef
  layout: 'project',
})
const { client } = usePrismic() // eslint-disable-line no-undef
const route = useRoute() // eslint-disable-line no-undef

const slug = route.params.slug

const { data } = await useLazyAsyncData(slug, async () => { // eslint-disable-line no-undef
  const projects = await client.getAllByType('project')
  return {
    projects,
    project: projects.find((p) => p.uid === slug)
  }
})

function getComponent(type) {
  console.log(type)
  return `${type.replaceAll('_', '-')}`
}

</script>

<template>
  <div
    :key="slug"
    :class="[ 'project-page', `${slug}-page` ]"
  >
    <slices-project-hero
      :project="data?.project?.data"
    />

    <component
      :is="getComponent(slice.slice_type)"
      v-for="(slice, idx) in data?.project?.data?.body"
      :key="idx"
      :slice="slice"
    />

    <slices-project-pagination
      :current="slug"
      :projects="data?.projects"
    />

    <project-footer />
  </div>
</template>

<script>

import BannerCopy from '@/components/slices/BannerCopy.vue'
import BannerImage from '@/components/slices/BannerImage.vue'
import BannerVideo from '@/components/slices/BannerVideo.vue'

export default {
  components: {
    BannerCopy,
    BannerImage,
    BannerVideo
  },
}

</script>
