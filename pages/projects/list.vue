<script setup>
definePageMeta({ // eslint-disable-line no-undef
  layout: 'project'
})
const { client } = usePrismic() // eslint-disable-line no-undef
const { results } = await client.getByType('project')
const { data: projects } = await useLazyAsyncData(async () => { // eslint-disable-line no-undef
  return results
}, {
  default: () => []
})
</script>

<template>
  <div class="projects-list">
    <div class="content">
      <ul>
        <li
          v-for="project in projects"
          :key="project.uid"
        >
          <NuxtLink :to="`/projects/${project.uid}`">
            <prismic-text
              :field="project.data.project_title"
            />
          </NuxtLink>
        </li>
      </ul>
    </div>
  </div>
</template>

<style lang="stylus">

@import "../stylus/_variables"

.projects-list {
  pad(4, 0)
  min-height 100%
  overflow hidden

  .content {
    max-width: $pwidth * .618rem;
  }
}

</style>
