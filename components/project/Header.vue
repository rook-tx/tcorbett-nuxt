<script setup>

defineProps({
  progress: {
    type: Number,
    default: 0
  }
})

const links = [
  {
    id: 'tcorb',
    label: 'T Corbett',
  },
  {
    id: 'projects/list',
    label: 'Projects',
  }
]

</script>

<template>
  <header class="header">
    <div class="header-wrap">
      <nav class="mnav">
        <ul class="mnav-ul">
          <li
            v-for="link in links"
            :key="link.id"
            :class="['mnav-li', `mnav-${link.id}`]"
          >
            <nuxt-link
              class="mnav-a"
              :to="link.id === 'tcorb' ? '/' : `/${link.id}`"
              @click.left="toggleTldr(false)"
            >
              {{ link.label }}
            </nuxt-link>
          </li>
        </ul>
      </nav>

      <div
        class="header-line"
      >
        <div
          class="header-line-inner js-hline"
          :style="{ transform: `translate3d(${pct - 100}%,0,0)` }"
        >
          Progress - <span
            class="header-line-span js-hlspan"
            v-html="Math.round(pct)"
          />%
        </div>
      </div>

      <div class="mnav-li">
        <button
          type="button"
          class="mnav-a"
          @click.left="toggleTldr()"
        >
          TL; DR
        </button>
      </div>
    </div>
  </header>
</template>

<script>

import { mapActions } from 'pinia'
import { useAppStore } from '@/stores/app'

export default {

  computed: {
    pct() {
      return this.progress * 100
    }
  },

  methods: {
    ...mapActions(useAppStore, [
      'toggleTldr'
    ]),
  },
}

</script>
