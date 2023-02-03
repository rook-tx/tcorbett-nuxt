<script setup>
definePageMeta({ // eslint-disable-line no-undef
  layout: 'project',
})
const { client } = usePrismic() // eslint-disable-line no-undef
const route = useRoute() // eslint-disable-line no-undef
const { data: doc } = await useAsyncData('project', () => client.getByUID('project', route.params.slug)) // eslint-disable-line no-undef

function getComponent(type) {
  return `${type.replaceAll('_', '-')}`
}

</script>

<template>
  <div :class="$route.params.slug">
    <component
      :is="getComponent(slice.slice_type)"
      v-for="(slice, idx) in doc?.data?.body"
      :key="idx"
      :slice="slice"
    />
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
