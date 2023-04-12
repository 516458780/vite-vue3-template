import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'IndexView',
      meta: {
        title: 'Index',
        keepAlive: false
      },
      component: () => import('@/views/IndexView.vue')
    },
    {
      path: '/customer-service',
      name: 'CustomerServiceView',
      meta: {
        title: 'CustomerService',
        keepAlive: true
      },
      component: () => import('@/views/CustomerService/CustomerServiceView.vue')
    },
    {
      path: '/login',
      name: 'LoginView',
      component: () => import('@/views/LoginView.vue')
    }
  ]
})

export default router
