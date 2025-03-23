import { defineStore } from 'pinia'
import { server, headers, employeeHeaders, headersImage } from '/src/boot/axios'

export const useProfileStore = defineStore('profile', {
  actions: {
    async profile() {
      return await server.get('api/profile', { headers })
    },

    async employeeprofile() {
      return await server.get('api/profile/employee', { headers: employeeHeaders })
    },

    async editprofile(data) {
      return await server.post('api/profile', data, { headers: headersImage })
    },

    async changepassword(data) {
      return await server.post('api/profile/change-password', data, { headers })
    }
  }
})
