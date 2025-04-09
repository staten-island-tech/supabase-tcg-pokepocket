import { createRouter, createWebHistory } from 'vue-router';
import PackOpening from '../views/PackOpening.vue';

const routes = [
  {
    path: '/',
    name: 'PackOpening',
    component: PackOpening,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
