<script setup>
definePageMeta({ // eslint-disable-line no-undef
  layout: 'lab'
})
const { client } = usePrismic() // eslint-disable-line no-undef
const { results } = await client.getByType('lab')
const { data: labs } = await useLazyAsyncData(async () => { // eslint-disable-line no-undef
  return results
}, {
  default: () => []
})
</script>

<template>
  <div class="labs-list">
    <div class="content">
      <ul>
        <li
          v-for="lab in labs"
          :key="lab.uid"
        >
          <NuxtLink :to="`/labs/${lab.uid}`">
            <prismic-text
              :field="lab.data.lab_title"
            />
          </NuxtLink>
        </li>
      </ul>
    </div>
  </div>
</template>

<style lang="stylus">

@import "../stylus/_variables"

.labs-list {
  pad(4, 0)
  min-height 100%
  overflow hidden

  .content {
    max-width: $pwidth * .618rem;
  }
}

</style>
