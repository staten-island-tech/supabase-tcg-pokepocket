import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '@/views/HomePage.vue'
import AboutPage from '@/views/AboutPage.vue'
import SignUpPage from '@/views/SignUpPage.vue'  // Import the signup page
import InventoryPage from '@/views/InventoryPage.vue'  // Import the inventory page

const routes = [
  { path: '/', component: HomePage },
  { path: '/about', component: AboutPage },
  { path: '/signup', component: SignUpPage },
  { path: '/inventory', component: InventoryPage }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
