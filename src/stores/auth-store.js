import { defineStore } from 'pinia'
import { server, headers } from '/src/boot/axios'

export const useAuthStore = defineStore('auth', {
  actions: {
    async register(name, email, password, phone_number) {
      return await server.post('api/auth/register', { name, email, password, phone_number })
    },

    async login(email, password) {
      const res = await server.post('api/auth/login', { email, password })

      localStorage.setItem('token', res.data.data.token)
      return res
    },

    async employee(nip, pin) {
      console.log(nip, pin);

      const res = await server.post('api/auth/employee', { nip, pin }, { headers })

      localStorage.setItem('employeetoken', res.data.data.token)
      localStorage.setItem('branch', res.data.data.employee.branch.id)
      return res
    },

    async logout() {
      localStorage.removeItem('token')
      localStorage.removeItem('employeetoken')
      localStorage.removeItem('branch')
      window.location.reload()

      return await server.get('api/auth/logout', { headers })
    }
  }
})
