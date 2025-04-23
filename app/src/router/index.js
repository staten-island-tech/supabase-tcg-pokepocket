import { createRouter, createWebHistory } from 'vue-router';
import SignupPage from '../views/SignupPage.vue';
import Login from '@/components/Login.vue';

const routes = [
  {
    path: '/',
    name: 'SignUp',
    component: SignupPage,
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
