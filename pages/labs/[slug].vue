<script setup>
// import { isFilled } from '@prismicio/helpers'

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

function getComponent(type) {
  console.log(type)
  return `${type.replaceAll('_', '-')}`
}

</script>

<template>
  <div
    :key="slug"
    :class="[ 'page', 'lab-page', `${slug}-page` ]"
  >
    <!-- <SlicesLabVimeo
      v-if="isFilled.keyText(data?.lab?.data?.vimeo_src)"
      :lab="data.lab"
    />
    <SlicesLabVideo
      v-if="isFilled.linkToMedia(data?.lab?.data?.video)"
      :lab="data.lab"
    /> -->

    <component
      :is="getComponent(slice.slice_type)"
      v-for="(slice, idx) in data?.lab?.data?.body"
      :key="idx"
      :slice="slice"
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
