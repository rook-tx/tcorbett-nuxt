<script setup>

const links = [
  {
    id: 'tcorb',
    label: 'T Corbett',
  },
  {
    id: 'about',
    label: 'About',
  },
  {
    id: 'projects',
    label: 'Projects',
  },
  {
    id: 'labs',
    label: 'Labs',
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

  methods: {
    ...mapActions(useAppStore, [
      'toggleTldr'
    ]),
  },
}

</script>
