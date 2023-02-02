import { defineStore } from 'pinia'

export const useAppStore = defineStore('app', {

  state: () => ({
    tldr: false
  }),

  actions: {
    toggleTldr(open = !this.tldr) {
      this.tldr = open
    }
  }

})
