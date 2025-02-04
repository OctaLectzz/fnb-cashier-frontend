import { defineStore } from 'pinia'
import { server, headers, headersImage } from '/src/boot/axios'

export const useBranchStore = defineStore('branch', {
  actions: {
    async all() {
      return await server.get('api/branch', { headers })
    },

    async show(id) {
      return await server.get(`api/branch/${id}`, { headers })
    },

    async create(data) {
      return await server.post('api/branch', data, { headers: headersImage })
    },

    async edit(data) {
      return await server.post(`api/branch/${data.id}`, data, { headers: headersImage })
    },

    async delete(data) {
      return await server.delete(`api/branch/${data}`, { headers })
    }
  }
})
