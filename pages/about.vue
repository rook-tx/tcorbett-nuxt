<script setup>

definePageMeta({
  layout: 'desktop'
})
</script>

<template>
  <div :class="$route.params.slug" />
</template>
