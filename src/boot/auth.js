import { token, employeetoken } from '/src/boot/axios'

export default ({ router }) => {
  router.beforeEach((to, from, next) => {
    // Check if the route requires authentication
    if (to.meta.requiresAuth) {
      if (!token) {
        // Redirect to login page if no token
        next({ name: 'home.login' })
      } else if (!employeetoken && token) {
        next({ name: 'home.employeelogin' })
      } else {
        // Continue navigation if token exists
        next()
      }
    } else if (to.name === 'home.employeelogin' && !token) {
      next({ name: 'home.login' })
    } else if (to.name === 'home.login' && token) {
      // If the user already has a token, redirect from the login page
      next({ name: 'main.home' })
    } else if (to.name === 'home.employeelogin' && employeetoken) {
      // If the user already has a employeetoken, redirect from the employeelogin page
      next({ name: 'main.home' })
    } else {
      // If the route does not require authentication, continue navigating
      next()
    }
  })
}
