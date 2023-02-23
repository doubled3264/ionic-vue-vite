import { createRouter, createWebHistory } from '@ionic/vue-router'
import { RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/home',
  },
  {
    path: '/home',
    component: () => import('../pages/Home.vue'),
  },
  {
    path: '/customers',
    component: () => import('../pages/Customers.vue'),
  },
  {
    path: '/orders',
    component: () => import('../pages/Orders.vue'),
  },
  {
    path: '/bills',
    component: () => import('../pages/Bills.vue'),
  },
  {
    path: '/test',
    component: () => import('../pages/Test.vue'),
  },
  //
  // {
  //    path: '/',
  //    redirect: '/dashboard',
  // },
  // {
  //    path: '/',
  //    component: BasePages,
  //    children: [
  //       {
  //          path: '',
  //          redirect: '/dashboard',
  //       },
  //       {
  //          path: 'dashboard',
  //          component: () => import('../pages/Dashboard.vue'),
  //       },
  //       {
  //          path: 'customers',
  //          component: () => import('../pages/Customers.vue'),
  //       },
  //       {
  //          path: 'orders',
  //          component: () => import('../pages/Orders.vue'),
  //       },
  //       {
  //          path: 'Bills',
  //          component: () => import('../pages/Bills.vue'),
  //       },
  //    ],
  // },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
