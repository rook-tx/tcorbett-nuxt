import { defineStore } from 'pinia'

export const useDeviceStore = defineStore('device', {

  state: () => ({
    device: {
      win: {
        x: 1440,
        y: 800
      },
      portrait: 1440 < 800,
      keys: null,
      mouse: null,
      touch: null
    }
  }),

  getters: {
    win: (state) => state.device.win,
    winWidth: (state) => state.device.win.x,
    winHeight: (state) => state.device.win.y,

    mobile: (state) => state.device.win.x < 768
  },

  actions: {
    updateDevice(device) {
      this.device = device
    }
  }

})
