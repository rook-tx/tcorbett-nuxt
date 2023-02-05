<template>
  <transition appear>
    <div
      v-show="tldr"
      class="tldr"
    >
      <slices-tldr />
      <button
        type="button"
        class="tldr-close"
        title="Close TL;DR panel"
        @click.left.prevent="toggleTldr(false)"
      >
        Close
      </button>
    </div>
  </transition>
</template>

<script>

import { mapActions, mapState } from 'pinia'
import { useAppStore } from '@/stores/app'

export default {

  computed: {
    ...mapState(useAppStore, [
      'tldr'
    ])
  },

  methods: {
    ...mapActions(useAppStore, [
      'toggleTldr'
    ]),
  }
}

</script>
