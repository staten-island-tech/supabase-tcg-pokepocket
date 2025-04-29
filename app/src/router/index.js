import { createRouter, createWebHistory } from 'vue-router'

// Import your views
import HomePage from '@/views/HomePage.vue'
import AboutPage from '@/views/AboutPage.vue'
import LoginPage from '@/views/LoginPage.vue'
import SignupPage from '@/views/SignupPage.vue'
import InventoryPage from '@/views/InventoryPage.vue'
import PackOpeningPage from '@/views/PackOpeningPage.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomePage,
  },
  {
    path: '/about',
    name: 'About',
    component: AboutPage,
  },
  {
    path: '/login',
    name: 'Login',
    component: LoginPage,
  },
  {
    path: '/signup',
    name: 'Signup',
    component: SignupPage,
  },
  {
    path: '/inventory',
    name: 'Inventory',
    component: InventoryPage,
  },
  {
    path: '/pack-opening',
    name: 'PackOpening',
    component: PackOpeningPage,
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router
