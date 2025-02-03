import { defineStore } from 'pinia'
import { server, headers, headersImage } from '/src/boot/axios'

export const useSettingStore = defineStore('setting', {
  actions: {
    async all() {
      return await server.get('api/setting')
    },

    async show(id) {
      return await server.get(`api/setting/${id}`)
    },

    async create(data) {
      return await server.post('api/setting', data, { headers: headersImage })
    },

    async edit(data) {
      return await server.post(`api/setting/${data.id}`, data, { headers: headersImage })
    },

    async delete(data) {
      return await server.delete(`api/setting/${data}`, { headers })
    }
  }
})
