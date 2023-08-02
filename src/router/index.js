import { createRouter, createWebHistory } from 'vue-router'
import { isAuthenticateUser } from '../helpers/authentication'

import decoRouter from '../modules/deco/router'

const routes = [
  {
    path: '/login',
    name: 'login',
    component: () => import('../modules/auth/views/LoginView.vue')
  },
  {
    path: '/deco',
    ...decoRouter
  }
]

const router = createRouter({
  routes,
  history: createWebHistory(import.meta.env.BASE_URL)
})

router.beforeEach(async (to, from, next) => {
  const requireAuth = to.matched.some((record) => record.meta.requiresAuth)

  if (!requireAuth) return next()

  try {
    await isAuthenticateUser()
    next()
  } catch (error) {
    console.log(error)
    next({ name: 'login' })
  }
})

export default router
