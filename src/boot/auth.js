import { token } from '/src/boot/axios'

export default ({ router }) => {
  router.beforeEach((to, from, next) => {
    // Check if the route requires authentication
    if (to.meta.requiresAuth) {
      if (!token) {
        // Redirect to login page if no token
        next({ name: 'home' })
      } else {
        // Continue navigation if token exists
        next()
      }
    } else {
      // If the route does not require authentication, continue navigating
      next()
    }
  })
}
