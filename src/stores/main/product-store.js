import { defineStore } from 'pinia'
import { server, headers, headersImage } from '/src/boot/axios'

export const useProductStore = defineStore('product', {
  actions: {
    async all() {
      return await server.get('api/product', { headers })
    },

    async branch(id) {
      return await server.get(`api/product/branch/${id}`, { headers })
    },

    async show(id) {
      return await server.get(`api/product/${id}`, { headers })
    },

    async create(data) {
      return await server.post('api/product', data, { headers: headersImage })
    },

    async edit(data) {
      return await server.post(`api/product/${data.id}`, data, { headers: headersImage })
    },

    async delete(data) {
      return await server.delete(`api/product/${data}`, { headers })
    }
  }
})
