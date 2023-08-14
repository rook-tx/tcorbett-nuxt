<script setup>
import { asText, isFilled } from '@prismicio/client'
import { components } from '~/slices'

definePageMeta({
  layout: 'project',
})

const route = useRoute()
const uid = route.params.uid

const { client } = usePrismic()

const { data } = await useLazyAsyncData(uid, async () => {
  const projects = await client.getAllByType('project')
  return {
    projects,
    project: projects.find((p) => p.uid === uid)
  }
})

useHead({
  title: isFilled.keyText(data.value?.project.meta_title) ? data.value?.project.meta_title : asText(data?.value?.project?.data.title),
  meta: [
    {
      name: 'description',
      content: data.value?.project.meta_description,
    },
    {
      hid: 'og:image', property: 'og:image', content: isFilled.image(data?.value?.project?.data.image) ? data.value.project.data.image.url : '/apple-touch-icon.png'
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
      :project="data.project?.data"
    />

    <slice-zone
      :slices="data.project?.data.slices"
      :components="components"
    />

    <slices-project-pagination
      :current="uid"
      :projects="data.projects"
    />

    <project-footer />
  </div>
</template>
