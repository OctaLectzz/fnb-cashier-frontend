import { defineStore } from 'pinia'
import { server, headers } from '/src/boot/axios'

export const useAuthStore = defineStore('auth', {
  actions: {
    async register(name, email, password, phone_number, avatar) {
      return await server.post('api/auth/register', { name, email, password, phone_number, avatar })
    },

    async login(email, password) {
      const res = await server.post('api/auth/login', { email, password })

      localStorage.setItem('token', res.data.data.token)
      return res
    },

    async logout() {
      localStorage.removeItem('token')
      window.location.reload()

      return await server.get('api/auth/logout', { headers })
    }
  }
})
