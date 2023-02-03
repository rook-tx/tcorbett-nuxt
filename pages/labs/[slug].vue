<script setup>
definePageMeta({ // eslint-disable-line no-undef
  layout: 'lab',
})
</script>

<template>
  <div :class="$route.params.slug" />
</template>
