import { createApp } from 'vue'
import Toastify, { toast } from 'vue3-toastify'
import 'vue3-toastify/dist/index.css'

export default async ({ app }) => {
  const darkmode = localStorage.getItem('darkmode') || 'false'
  const theme = darkmode === 'true' ? 'dark' : 'light'

  const options = {
    autoClose: 3000,
    position: toast.POSITION.TOP_RIGHT,
    theme: theme
  }

  app.use(Toastify, options)
}
