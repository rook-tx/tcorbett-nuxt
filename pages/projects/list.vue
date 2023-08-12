<script setup>
definePageMeta({
  layout: 'project'
})
const { client } = usePrismic()
const { data: projects } = await useLazyAsyncData('project-list', async () => {
  const { results } = await client.getByType('project')
  return results
})
</script>

<template>
  <div class="projects-list">
    <div class="content">
      <h1>Projects</h1>
      <ul>
        <li
          v-for="project in projects"
          :key="project.uid"
        >
          <NuxtLink :to="`/projects/${project.uid}`">
            <prismic-text
              :field="project.data.title"
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
