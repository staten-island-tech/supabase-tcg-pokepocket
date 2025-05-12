import { createRouter, createWebHistory } from 'vue-router'

import HomePage from '@/views/HomePage.vue'
import AboutPage from '@/views/AboutPage.vue'
import SignupPage from '@/views/SignupPage.vue'
import InventoryPage from '@/views/InventoryPage.vue'
import PackOpeningPage from '@/views/PackOpeningPage.vue'

const routes = [
  { path: '/', name: 'Home', component: HomePage },
  { path: '/about', name: 'About', component: AboutPage },
  { path: '/signup', name: 'Signup', component: SignupPage },
  { path: '/inventory', name: 'Inventory', component: InventoryPage },
  { path: '/pack-opening', name: 'PackOpening', component: PackOpeningPage }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
