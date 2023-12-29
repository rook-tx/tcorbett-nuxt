<script setup>
import { asText, isFilled } from '@prismicio/client'
import { components } from '~/slices'

definePageMeta({
  layout: 'lab',
})

const route = useRoute()
const uid = route.params.uid

const { client } = usePrismic()

const { data } = await useLazyAsyncData(uid, async () => {
  const labs = await client.getAllByType('lab')
  return {
    labs,
    lab: labs.find((p) => p.uid === uid)
  }
})

useHead({
  title: isFilled.keyText(data.value?.lab.meta_title) ? data.value?.lab.meta_title : asText(data?.value?.lab?.data.title),
  meta: [
    {
      name: 'description',
      content: data.value?.lab.meta_description,
    },
    {
      hid: 'og:image',
      property: 'og:image',
      content: isFilled.image(data?.value?.lab?.data.image) ? data.value.lab.data.image.url : '/apple-touch-icon.png'
    }
  ]
})

</script>

<template>
  <div
    :key="uid"
    :class="[ 'page', 'lab-page', `${uid}-page` ]"
  >
    <slice-zone
      wrapper="main"
      :slices="data?.lab.data.slices ?? []"
      :components="components"
    />
    <slices-lab-pagination
      :labs="data?.labs"
    />
  </div>
</template>
