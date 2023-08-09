<script setup>
import { asText, isFilled } from '@prismicio/client'

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

useHead({
  title: asText(data?.value?.lab?.data.lab_title),
  meta: { hid: 'og:image', property: 'og:image', content: isFilled.image(data?.value?.lab?.data.lab_thumb) ? data.value.lab.data.lab_thumb.url : '/apple-touch-icon.png' }
})

function getComponent(type) {
  return `${type.replaceAll('_', '-')}`
}

</script>

<template>
  <div
    :key="slug"
    :class="[ 'page', 'lab-page', `${slug}-page` ]"
  >
    <component
      :is="getComponent(slice.slice_type)"
      v-for="(slice, idx) in data?.lab?.data?.body"
      :key="idx"
      :slice="slice"
    />
    <slices-lab-pagination
      :labs="data?.labs"
    />
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
