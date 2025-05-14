import { createRouter, createWebHistory } from 'vue-router';
import SignupPage from '../views/SignupPage.vue';
import Login from '../views/LoginPage.vue';
import Dashboard from '../views/DashboardPage.vue'; 

const routes = [
  {
    path: '/',
    name: 'SignUp',
    component: SignupPage,
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
  },
  {
    path: '/Dashboard',
    name: 'DashBoard',
    component: Dashboard,
  }
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
