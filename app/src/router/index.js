import { createRouter, createWebHistory } from 'vue-router';
import SignupPage from '../views/SignupPage.vue';
import Login from '../views/LoginPage.vue';
<<<<<<< HEAD
import PackOpening from '../components/PackOpening.vue';
=======
import Dashboard from '../views/DashboardPage.vue'; 
>>>>>>> d9ff4d8fdc590e7066a487d9a24ff42336e1ff3e

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
<<<<<<< HEAD
    path: '/pack-opening',
    name: 'PackOpening',
    component: PackOpening
  },
=======
    path: '/Dashboard',
    name: 'DashBoard',
    component: Dashboard,
  }
>>>>>>> d9ff4d8fdc590e7066a487d9a24ff42336e1ff3e
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
