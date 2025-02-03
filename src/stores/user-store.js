import { defineStore } from 'pinia'
import { server, headers, headersImage } from '/src/boot/axios'

export const useUserStore = defineStore('user', {
  actions: {
    async all() {
      return await server.get('api/user', { headers })
    },

    async show(id) {
      return await server.get(`api/user/${id}`, { headers })
    },

    async create(data) {
      return await server.post('api/user', data, { headers: headersImage })
    },

    async edit(data) {
      return await server.post(`api/user/${data.id}`, data, { headers: headersImage })
    },

    async delete(data) {
      return await server.delete(`api/user/${data}`, { headers })
    }
  }
})
