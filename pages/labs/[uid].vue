<script setup>
import { asText, isFilled } from '@prismicio/client'
import { components } from '~/slices'

definePageMeta({
  layout: 'lab',
})

const route = useRoute()
const uid = route.params.uid

const { client } = usePrismic()

const { data: labs } = await useAsyncData(uid, () => client.getAllByType('lab'))
const lab = labs.value.find((p) => p.uid === uid)

useHead({
  title: isFilled.keyText(lab.meta_title) ? lab.meta_title : asText(lab?.data.title),
  meta: [
    {
      name: 'description',
      content: lab.meta_description,
    },
    {
      hid: 'og:image',
      property: 'og:image',
      content: isFilled.image(lab?.data.image) ? lab.data.image.url : '/apple-touch-icon.png'
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
      v-if="lab.data.slices"
      wrapper="main"
      :slices="lab.data.slices"
      :components="components"
    />
    <slices-lab-pagination
      :labs="labs"
    />
  </div>
</template>
