<script setup>
import { isFilled } from '@prismicio/helpers'

definePageMeta({
  layout: 'lab',
})
const { client } = usePrismic()
const route = useRoute()

const slug = route.params.slug

const { data } = await useLazyAsyncData(slug, async () => {
  const labs = await client.getAllByType('lab')
  return {
    labs,
    lab: labs.find((p) => p.uid === slug)
  }
}, {
  default: () => ({
    labs: [],
    lab: null
  })
})

</script>

<template>
  <div
    :key="slug"
    :class="[ 'page', 'lab-page', `${slug}-page` ]"
  >
    <SlicesLabVimeo
      v-if="isFilled.keyText(data?.lab?.data?.vimeo_src)"
      :lab="data.lab"
    />
    <SlicesLabVideo
      v-if="isFilled.linkToMedia(data?.lab?.data?.video)"
      :lab="data.lab"
    />
  </div>
</template>
