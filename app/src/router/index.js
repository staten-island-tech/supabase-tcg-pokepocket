import { createRouter, createWebHistory } from 'vue-router';
import PackOpening from '../components/PackOpening.vue';
import SignupPage from '../views/SignupPage.vue';

const routes = [
  {
    path: '/',
    name: 'PackOpening',
    component: PackOpening,
  },
  {
    path: '/SignUp',
    name: 'SignUp',
    component: SignupPage, 
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
