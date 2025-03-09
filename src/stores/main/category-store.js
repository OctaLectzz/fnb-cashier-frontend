import { defineStore } from 'pinia'
import { server, headers } from '/src/boot/axios'

export const useCategoryStore = defineStore('category', {
  actions: {
    async all() {
      return await server.get('api/category', { headers })
    },

    async branch(id) {
      return await server.get(`api/category/branch/${id}`, { headers })
    },

    async show(id) {
      return await server.get(`api/category/${id}`, { headers })
    },

    async create(data) {
      return await server.post('api/category', data, { headers })
    },

    async edit(data) {
      return await server.put(`api/category/${data.id}`, data, { headers })
    },

    async delete(data) {
      return await server.delete(`api/category/${data}`, { headers })
    }
  }
})
