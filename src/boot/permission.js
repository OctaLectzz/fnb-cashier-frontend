import { useAuthStore } from '/src/stores/auth-store'

export default ({ router }) => {
  router.beforeEach((to, from, next) => {
    const employeePermissions = useAuthStore().permissions

    if (to.meta.permission && !employeePermissions.includes(to.meta.permission)) {
      next('/403') // Redirect to “Access Denied” page if you do not have permission
    } else {
      next()
    }
  })
}
