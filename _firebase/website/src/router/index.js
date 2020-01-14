import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '@/views/Home.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
    props: true,
  },
  {
    path: '/login',
    name: 'login',
    component: () =>
      import(/* webpackChunkName: "login" */ '@/views/Auth/Login.vue'),
    props: true,
  },
  {
    path: '/auth/action',
    name: 'actions',
    component: () =>
      import(/* webpackChunkName: "actions" */ '@/views/Auth/Actions.vue'),
    props: true,
  },
  {
    path: '/privacy',
    name: 'actions',
    component: () =>
      import(/* webpackChunkName: "privacy" */ '@/views/Static/Privacy.vue'),
    props: true,
  },
  {
    path: '/terms',
    name: 'actions',
    component: () =>
      import(/* webpackChunkName: "terms" */ '@/views/Static/Terms.vue'),
    props: true,
  },
  {
    path: '/help-center',
    name: 'actions',
    component: () =>
      import(/* webpackChunkName: "help" */ '@/views/Static/HelpCenter.vue'),
    props: true,
  },
];

const router = new VueRouter({
  mode: 'history',
  routes,
});

export default router;
