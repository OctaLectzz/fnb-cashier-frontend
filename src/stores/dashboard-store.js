import { defineStore } from 'pinia'
import { server, headers } from '/src/boot/axios'

export const useDashboardStore = defineStore('dashboard', {
  actions: {
    async main() {
      return await server.get('api/main', { headers })
    }
  }
})
