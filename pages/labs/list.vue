<script setup>
definePageMeta({
  layout: 'lab'
})
</script>

<template>
  <div class="labs-list-page">
    <modules-list
      type="lab"
    />
  </div>
</template>

<style lang="stylus">

@import "../stylus/_variables"

.labs-list-page {
  color $bg
}

</style>
