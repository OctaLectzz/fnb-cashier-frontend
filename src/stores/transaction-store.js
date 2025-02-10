import { defineStore } from 'pinia'
import { server, headers } from '/src/boot/axios'

export const useTransactionStore = defineStore('transaction', {
  actions: {
    async all() {
      return await server.get('api/transaction', { headers })
    },

    async show(id) {
      return await server.get(`api/transaction/${id}`, { headers })
    },

    async create(data) {
      return await server.post('api/transaction', data, { headers })
    },

    async edit(data) {
      return await server.put(`api/transaction/${data.id}`, data, { headers })
    },

    async delete(data) {
      return await server.delete(`api/transaction/${data}`, { headers })
    }
  }
})
