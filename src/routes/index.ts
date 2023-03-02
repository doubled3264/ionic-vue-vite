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
  localStorage.setItem(
    'token',
    'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjAxR1RERVMwQ0FHWkhTV0NTOTRNMkJSUFo4IiwibmFtYSI6ImRlZGUgYWd1cyBzZXRpYXdhbiIsInJvbGUiOiJzdXBlciIsImlhdCI6MTY3NzcyMTAyMSwiZXhwIjoxNjc3ODA3NDIxfQ.KKo-48YWSKV_qBz6Y3wlljVqTmB5am_rgPkgtCeP7do'
  )
  const token = localStorage.getItem('token')
  let isAuthenticated = false
  let role = ''
  let isPublic = last(to.matched)!.meta.public
  let allowedRoles = last(to.matched)!.meta.role

  console.log(isPublic)
  await store
    .dispatch('auth/getAccess', token)
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
