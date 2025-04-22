import { createRouter, createWebHistory } from 'vue-router';
import SignupPage from '../views/SignupPage.vue';
import LoginPage from '../views/LoginPage'; 

const routes = [
  {
    path: '/',
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
