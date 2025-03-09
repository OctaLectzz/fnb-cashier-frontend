import { defineStore } from 'pinia'
import { server, headers, employeeHeaders, headersImage } from '/src/boot/axios'

export const useEmployeeStore = defineStore('employee', {
  actions: {
    async all() {
      return await server.get('api/employee', { headers })
    },

    async profile() {
      return await server.get('api/employee/profile', { headers: employeeHeaders })
    },

    async show(id) {
      return await server.get(`api/employee/${id}`, { headers })
    },

    async create(data) {
      return await server.post('api/employee', data, { headers: headersImage })
    },

    async edit(data) {
      return await server.post(`api/employee/${data.id}`, data, { headers: headersImage })
    },

    async delete(data) {
      return await server.delete(`api/employee/${data}`, { headers })
    }
  }
})
