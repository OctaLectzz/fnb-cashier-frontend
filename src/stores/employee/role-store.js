import { defineStore } from 'pinia'
import { server, headers } from '/src/boot/axios'

export const useRoleStore = defineStore('role', {
  actions: {
    async all() {
      return await server.get('api/role', { headers })
    },

    async show(id) {
      return await server.get(`api/role/${id}`, { headers })
    },

    async create(data) {
      return await server.post('api/role', data, { headers })
    },

    async edit(data) {
      return await server.put(`api/role/${data.id}`, data, { headers })
    },

    async delete(data) {
      return await server.delete(`api/role/${data}`, { headers })
    }
  }
})
