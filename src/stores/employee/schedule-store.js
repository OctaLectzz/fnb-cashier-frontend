import { defineStore } from 'pinia'
import { server, headers } from '/src/boot/axios'

export const useScheduleStore = defineStore('schedule', {
  actions: {
    async all() {
      return await server.get('api/schedule', { headers })
    },

    async show(id) {
      return await server.get(`api/schedule/${id}`, { headers })
    },

    async create(data) {
      return await server.post('api/schedule', data, { headers })
    },

    async edit(data) {
      return await server.put(`api/schedule/${data.id}`, data, { headers })
    },

    async delete(data) {
      return await server.delete(`api/schedule/${data}`, { headers })
    }
  }
})
