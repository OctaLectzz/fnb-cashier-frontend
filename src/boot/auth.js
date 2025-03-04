import { token } from '/src/boot/axios'

export default ({ router }) => {
  router.beforeEach((to, from, next) => {
    // Check if the route requires authentication
    if (to.meta.requiresAuth) {
      if (!token) {
        // Redirect to login page if no token
        next({ name: 'home.login' })
      } else {
        // Continue navigation if token exists
        next()
      }
    } else if (to.name === 'home.login' && token) {
      // If the user already has a token, redirect from the login page
      next({ name: 'main.home' })
    } else {
      // If the route does not require authentication, continue navigating
      next()
    }
  })
}
