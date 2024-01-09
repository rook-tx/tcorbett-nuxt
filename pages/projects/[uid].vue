<script setup>
import { asText, isFilled } from '@prismicio/client'
import { components } from '~/slices'

definePageMeta({
  layout: 'project',
})

const route = useRoute()
const uid = route.params.uid

const { client } = usePrismic()
const { data: projects } = await useAsyncData(uid, () => client.getAllByType('project'))
const project = projects.value.find((p) => p.uid === uid)

useHead({
  title: isFilled.keyText(project?.meta_title) ? project.meta_title : asText(project?.data.title),
  meta: [
    {
      name: 'description',
      content: project.meta_description,
    },
    {
      hid: 'og:image', property: 'og:image', content: isFilled.image(project?.data.image) ? project.data.image.url : '/apple-touch-icon.png'
    }
  ]
})

</script>

<template>
  <div
    :key="uid"
    :class="[ 'project-page', `${uid}-page` ]"
  >
    <slices-project-hero
      :project="project?.data"
    />

    <slice-zone
      v-if="project?.data.slices"
      :slices="project.data.slices"
      :components="components"
    />

    <slices-project-pagination
      :current="uid"
      :projects="projects"
    />

    <project-footer />
  </div>
</template>
