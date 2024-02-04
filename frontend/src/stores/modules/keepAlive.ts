import { defineStore } from 'pinia'

export const useKeepAliveStore = defineStore('keepAlive', {
  state: () => {
    return {
      refresh: false, // 用于控制所有页面的缓存刷新
      keepAliveName: [] as string[],
    }
  },

  actions: {
    async addKeepAliveName(name: string) {
      !this.keepAliveName.includes(name) && this.keepAliveName.push(name)
    },
    async removeKeepAliveName(name: string) {
      this.keepAliveName = this.keepAliveName.filter(item => item !== name)
    },
    async setKeepAliveName(keepAliveName: string[] = []) {
      this.keepAliveName = keepAliveName
    },
  },
})
