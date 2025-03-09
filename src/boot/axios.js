import { boot } from 'quasar/wrappers'
import axios from 'axios'

// URL Server
const url = 'http://localhost:8000'
const server = axios.create({ baseURL: url })

// Get Token
const token = localStorage.getItem('token')
const employeetoken = localStorage.getItem('employeetoken')
const currentbranch = parseInt(localStorage.getItem('branch'))

// Headers
const headers = {
  Authorization: `Bearer ${token}`
}
const employeeHeaders = {
  Authorization: `Bearer ${employeetoken}`
}
const headersImage = {
  Authorization: `Bearer ${token}`,
  'Content-Type': 'multipart/form-data'
}

// Cookie
axios.defaults.withCredentials = true
axios.interceptors.request.use(async function (config) {
  if (!config.url.includes('/sanctum/csrf-cookie')) {
    await server.get('/sanctum/csrf-cookie')
  }
  return config
})

export default boot(({ app }) => {
  app.config.globalProperties.$axios = axios

  app.config.globalProperties.$server = server
})

export { axios, server, url, token, employeetoken, currentbranch, headers, employeeHeaders, headersImage }
