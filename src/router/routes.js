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
      { path: 'branch', name: 'main.branch', component: () => import('/src/pages/dashboard/main/branch/IndexBranch.vue'), meta: { permission: 'view branches' } },
      { path: 'category', name: 'main.category', component: () => import('/src/pages/dashboard/main/category/IndexCategory.vue'), meta: { permission: 'view categories' } },
      { path: 'product', name: 'main.product', component: () => import('/src/pages/dashboard/main/product/IndexProduct.vue'), meta: { permission: 'view products' } },
      { path: 'transaction', name: 'main.transaction', component: () => import('/src/pages/dashboard/main/transaction/create/IndexCreate.vue'), meta: { permission: 'create transactions' } },
      {
        path: 'transaction-history',
        name: 'main.transactionhistory',
        component: () => import('/src/pages/dashboard/main/transaction/history/IndexHistory.vue'),
        meta: { permission: 'view transactions' }
      }
    ]
  },

  // Employee
  {
    path: '/employee',
    component: () => import('/src/layouts/EmployeeLayout.vue'),
    meta: { requiresAuth: true },
    children: [
      { path: 'home', name: 'employee.home', component: () => import('/src/pages/dashboard/employee/IndexEmployee.vue') },
      { path: 'role', name: 'employee.role', component: () => import('/src/pages/dashboard/employee/role/IndexRole.vue'), meta: { permission: 'view roles' } },
      { path: 'schedule', name: 'employee.schedule', component: () => import('/src/pages/dashboard/employee/schedule/IndexSchedule.vue'), meta: { permission: 'view schedules' } },
      { path: 'employee', name: 'employee.employee', component: () => import('/src/pages/dashboard/employee/employee/IndexEmployee.vue'), meta: { permission: 'view employees' } }
    ]
  }
]

export default routes
