import { createRouter, createWebHistory } from '@ionic/vue-router'
import { RouteRecordRaw } from 'vue-router'
import { last, includes } from 'lodash'
import store from '../store'
import publicRoute from './public'
import privateRoute from './private'

const routes: Array<RouteRecordRaw> = [...publicRoute, ...privateRoute]

const router = createRouter({
   history: createWebHistory(),
   routes,
})

router.beforeEach(async (to, from, next) => {
   let isAuthenticated = false
   let role = ''
   let isPublic = last(to.matched)!.meta.public
   let allowedRoles = last(to.matched)!.meta.role

   await store
      .dispatch('auth/getAccess', localStorage.getItem('token'))
      .then(() => {
         isAuthenticated = true
         role = store.getters['auth/admin'].role
      })
      .catch(() => {
         isAuthenticated = false
      })
   //if not public
   if (!isPublic) {
      // if not authenticated
      if (!isAuthenticated) {
         next({ path: '/login' })
      } else {
         // if authenticated but role not allowed
         if (!includes(allowedRoles, role)) {
            next({ path: '/home' })
         } else {
            next()
         }
      }
      //   //check if authenticated, direct to private route
   } else {
      if (isAuthenticated) {
         next({ path: '/home' })
      } else {
         next()
      }
   }
})

export default router
