<script setup lang="ts">

definePageMeta({
  layout: 'desktop'
})

</script>

<template>
  <div :class="$route.params.uid" />
</template>
