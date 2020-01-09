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
      import(/* webpackChunkName: "login" */ '@/views/Login.vue'),
    props: true,
  },
  {
    path: '/account',
    name: 'account',
    component: () =>
      import(/* webpackChunkName: "account" */ '@/views/Account.vue'),
    props: true,
  },
];

const router = new VueRouter({
  mode: 'history',
  routes,
});

export default router;
