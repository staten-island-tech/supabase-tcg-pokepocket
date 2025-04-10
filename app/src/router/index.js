// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router';
<<<<<<< HEAD
import SignupPage from '../views/SignUp.vue';
import LoginPage from '../views/Login.vue';
=======
import HomeView from '../views/HomeView.vue';
import SignupPage from '../views/SignupPage.vue';
>>>>>>> 7aa9eb5b18ea9eafa84bee2ae8ec4e4cf252f221

const routes = [
  {
    path: '/',
<<<<<<< HEAD
    redirect: '/login',  // Redirect to login page
=======
    name: 'HomeView',
    component: HomeView,
>>>>>>> 7aa9eb5b18ea9eafa84bee2ae8ec4e4cf252f221
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
