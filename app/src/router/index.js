import { createRouter, createWebHistory } from 'vue-router'
import Login from '../components/Login.vue'
import Signup from '../components/Signup.vue'
import Inventory from '../components/Inventory.vue'

const routes = [
  { path: '/login', component: Login },
  { path: '/signup', component: Signup },
  { path: '/inventory', component: Inventory, meta: { requiresAuth: true } },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
