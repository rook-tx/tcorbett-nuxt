<script setup lang="ts">
import { SliceSimulator } from '@slicemachine/adapter-nuxt/simulator'
import { components } from '~/slices'
</script>

<template>
  <slice-simulator v-slot="{ slices }">
    <SliceZone
      :slices="slices"
      :components="components"
    />
  </slice-simulator>
</template>
