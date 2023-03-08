import { RouteRecordRaw } from 'vue-router'

declare module 'vue-router' {
  interface RouteMeta {
    public?: boolean
    role?: Array<string>
  }
}
const routes: Array<RouteRecordRaw> = [
  {
    path: '/home',
    component: () => import('../pages/Home.vue'),
    meta: {
      public: false,
      role: ['super', 'admin'],
    },
  },
  {
    path: '/customers',
    component: () => import('../pages/customers/BaseCustomer.vue'),
    meta: {
      public: false,
      role: ['super', 'admin'],
    },
    children: [
      {
        path: '',
        component: () => import('../pages/customers/CustomerList.vue'),
        meta: {
          public: false,
          role: ['super', 'admin'],
        },
      },
      {
        path: 'add',
        component: () => import('../pages/customers/CustomerAdd.vue'),
        meta: {
          public: false,
          role: ['super', 'admin'],
        },
      },
      {
        path: ':id',
        component: () => import('../pages/customers/CustomerDetail.vue'),
        meta: {
          public: false,
          role: ['super', 'admin'],
        },
      },
      {
        path: 'edit/:id',
        component: () => import('../pages/customers/CustomerEdit.vue'),
        meta: {
          public: false,
          role: ['super', 'admin'],
        },
      },
    ],
  },
  {
    path: '/orders',
    component: () => import('../pages/Orders.vue'),
    meta: {
      public: false,
      role: ['super', 'admin'],
    },
  },
  {
    path: '/bills',
    component: () => import('../pages/Bills.vue'),
    meta: {
      public: false,
      role: ['super', 'admin'],
    },
  },
]

// export default routes.map((route) => {
//    return {
//       ...route,
//       meta: { public: false, role: ['super', 'admin', 'content writer'] },
//       children: route.children?.map((childrens) => {
//          return {
//             ...childrens,
//             meta: { public: false, role: ['super', 'admin', 'content writer'] },
//          }
//       }),
//    }
// })
//
export default routes
