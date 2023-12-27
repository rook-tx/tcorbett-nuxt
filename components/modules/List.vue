<script setup>
const props = defineProps({
  type: {
    type: String,
    default: 'project',
    validator: (prop) => {
      return [ 'project', 'lab' ].includes(prop)
    }
  }
})
const { client } = usePrismic()
const { data: items } = await useAsyncData(`${props.type}-list`, async () => {
  const { results } = await client.getByType(props.type)
  return results
})
</script>

<template>
  <div :class="[ 'items-list', `${type}s-list` ]">
    <div class="content">
      <h1>{{ `${type}s` }}</h1>
      <ul>
        <li
          v-for="item in items"
          :key="item.uid"
        >
          <nuxt-link :to="`/${type}s/${item.uid}`">
            <prismic-text
              :field="item.data.title"
            />
          </nuxt-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<style lang="stylus">

@import "../stylus/_variables"

.items-list {
  pad(4, 0)
  min-height 100%
  overflow hidden

  .content {
    max-width: $pwidth * .618rem;
  }
}

</style>
