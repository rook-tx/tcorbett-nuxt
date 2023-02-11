<script setup>
definePageMeta({
  layout: 'lab'
})
const { client } = usePrismic()
const { results } = await client.getByType('lab')
const { data: labs } = await useLazyAsyncData(async () => {
  return results
}, {
  default: () => []
})
</script>

<template>
  <div class="labs-list">
    <div class="content">
      <h1>labs</h1>
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
  background #0c0911
  color $bg
  pad(4, 0)
  min-height 100%
  overflow hidden

  .content {
    max-width: $pwidth * .618rem;
  }
}

</style>
