import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => {
      return import('../views/HomeView.vue');
    }
  },
  {
    path: '/checker/:event',
    name: 'booth-selector',
    title: 'Events Handler',
    component: () => {
      return import('../views/BoothSelectorView.vue');
    }
  },
  {
    path: '/checker/:event/:boothId',
    name: 'booth',
    component: () => {
      return import('../views/BoothView.vue');
    }
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;
