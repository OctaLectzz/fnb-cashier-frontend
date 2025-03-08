const routes = [
  // Home
  {
    path: '/',
    component: () => import('/src/layouts/LandingLayout.vue'),
    children: [
      { path: '', name: 'home', component: () => import('/src/pages/landing/IndexPage.vue') },
      { path: '/login', name: 'home.login', component: () => import('/src/pages/auth/LoginPage.vue') },
      { path: '/employeelogin', name: 'home.employeelogin', component: () => import('/src/pages/auth/EmployeeLoginPage.vue') },

      // Not Found
      { path: '/:catchAll(.*)*', component: () => import('/src/pages/ErrorNotFound.vue') }
    ]
  },

  // Main
  {
    path: '/main',
    component: () => import('/src/layouts/MainLayout.vue'),
    meta: { requiresAuth: true },
    children: [
      { path: 'home', name: 'main.home', component: () => import('/src/pages/dashboard/main/IndexMain.vue') },
      { path: 'profile', name: 'main.profile', component: () => import('/src/pages/dashboard/ProfilePage.vue') },
      { path: 'changepassword', name: 'main.changepassword', component: () => import('/src/pages/dashboard/ChangePasswordPage.vue') },
      { path: 'branch', name: 'main.branch', component: () => import('/src/pages/dashboard/main/branch/IndexBranch.vue') },
      { path: 'category', name: 'main.category', component: () => import('/src/pages/dashboard/main/category/IndexCategory.vue') },
      { path: 'product', name: 'main.product', component: () => import('/src/pages/dashboard/main/product/IndexProduct.vue') },
      { path: 'transaction', name: 'main.transaction', component: () => import('/src/pages/dashboard/main/transaction/create/IndexCreate.vue') },
      { path: 'transaction-history', name: 'main.transactionhistory', component: () => import('/src/pages/dashboard/main/transaction/history/IndexHistory.vue') },
      { path: 'setting', name: 'main.setting', component: () => import('/src/pages/dashboard/main/setting/IndexSetting.vue') }
    ]
  },

  // Employee
  {
    path: '/employee',
    component: () => import('/src/layouts/EmployeeLayout.vue'),
    meta: { requiresAuth: true },
    children: [
      { path: 'home', name: 'employee.home', component: () => import('/src/pages/dashboard/employee/IndexEmployee.vue') },
      { path: 'role', name: 'employee.role', component: () => import('/src/pages/dashboard/employee/role/IndexRole.vue') },
      { path: 'schedule', name: 'employee.schedule', component: () => import('/src/pages/dashboard/employee/schedule/IndexSchedule.vue') }
    ]
  }
]

export default routes
