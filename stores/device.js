import { defineStore } from 'pinia'

export const useDeviceStore = defineStore('device', {

  state: () => ({
    device: {
      win: {
        x: window.innerWidth,
        y: window.innerHeight
      },
      portrait: window.innerWidth < window.innerHeight,
      keys: null,
      mouse: null,
      touch: null
    }
  }),

  getters: {
    win: (state) => state.device.win,
    winWidth: (state) => state.device.win.x,
    winHeight: (state) => state.device.win.y,
  },

  actions: {
    updateDevice(device) {
      this.device = device
    }
  }

})
