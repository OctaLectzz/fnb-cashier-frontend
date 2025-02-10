const routes = [
  // Home
  {
    path: '/',
    component: () => import('/src/layouts/MainLayout.vue'),
    children: [
      { path: '', name: 'home.login', component: () => import('/src/pages/auth/LoginPage.vue') },

      // Not Found
      { path: '/:catchAll(.*)*', component: () => import('/src/pages/ErrorNotFound.vue') }
    ]
  },

  // Dashboard
  {
    path: '/dashboard',
    component: () => import('/src/layouts/DashboardLayout.vue'),
    meta: { requiresAuth: true },
    children: [
      { path: 'home', name: 'dashboard.home', component: () => import('/src/pages/dashboard/IndexDashboard.vue') },
      { path: 'profile', name: 'dashboard.profile', component: () => import('/src/components/ProfileView.vue') },
      { path: 'changepassword', name: 'dashboard.changepassword', component: () => import('/src/components/ChangePasswordView.vue') },
      { path: 'branch', name: 'dashboard.branch', component: () => import('/src/pages/dashboard/branch/IndexBranch.vue') },
      { path: 'category', name: 'dashboard.category', component: () => import('/src/pages/dashboard/category/IndexCategory.vue') },
      { path: 'product', name: 'dashboard.product', component: () => import('/src/pages/dashboard/product/IndexProduct.vue') },
      { path: 'transaction', name: 'dashboard.transaction', component: () => import('/src/pages/dashboard/transaction/create/IndexCreate.vue') },
      { path: 'transaction-history', name: 'dashboard.transactionhistory', component: () => import('/src/pages/dashboard/transaction/history/IndexHistory.vue') },
      { path: 'setting', name: 'dashboard.setting', component: () => import('/src/pages/dashboard/setting/IndexSetting.vue') }
    ]
  }
]

export default routes
