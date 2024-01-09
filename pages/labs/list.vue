<script setup>
definePageMeta({
  layout: 'lab'
})
</script>

<template>
  <div class="labs-list-page">
    <div class="content">
      <h1>l a b s</h1>
    </div>
    <modules-list type="lab" />
  </div>
</template>

<style lang="stylus">

@import "../stylus/_variables"

.labs-list-page {
  color $bg
}

</style>
