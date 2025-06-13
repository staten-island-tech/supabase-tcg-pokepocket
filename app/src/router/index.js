import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

import SignupPage from '@/views/SignupPage.vue'
import LoginPage from '@/views/LoginPage.vue'
import InventoryPage from '@/views/InventoryPage.vue'
import PackOpening   from '@/components/PackOpening.vue'

const routes = [
  { path: '/', name: 'SignUp', component: SignupPage },
  { path: '/login', name: 'Login', component: LoginPage },
  {
    path: '/pack-opening',
    name: 'PackOpening',
    component: PackOpening,
    meta: { requiresAuth: true }
  },
  {
    path: '/inventory',
    name: 'Inventory',
    component: InventoryPage,
    meta: { requiresAuth: true }
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()
  const isAuthenticated = !!authStore.user

  if (to.meta.requiresAuth && !isAuthenticated) {
    return next({ name: 'Login' })
  }

  if ((to.name === 'Login' || to.name === 'SignUp') && isAuthenticated) {
    return next({ name: 'Inventory' })
  }

  next()
})

export default router
