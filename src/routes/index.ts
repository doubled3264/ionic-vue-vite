import { createRouter, createWebHistory } from '@ionic/vue-router'
import { RouteRecordRaw } from 'vue-router'
import publicRoute from './public'
import privateRoute from './private'

const routes: Array<RouteRecordRaw> = [...publicRoute, ...privateRoute]

const router = createRouter({
   history: createWebHistory(),
   routes,
})

export default router
