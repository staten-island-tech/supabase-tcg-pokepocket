// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router';
import SignupPage from '../views/SignUp.vue';
import LoginPage from '../views/Login.vue';

const routes = [
  {
    path: '/',
    redirect: '/login',  // Redirect to login page
  },
  {
    path: '/signup',
    name: 'SignUp',
    component: SignupPage,
  },
  {
    path: '/login',
    name: 'Login',
    component: LoginPage,
  },
  // Add other routes if necessary (like /about or /inventory)
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
