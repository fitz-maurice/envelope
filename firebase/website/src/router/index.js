import Vue from 'vue';
import VueRouter from 'vue-router';
// import Home from '@/views/Home.vue';
import Landing from '@/views/Landing.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'home',
    component: Landing,
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
    name: 'privacy',
    component: () =>
      import(/* webpackChunkName: "privacy" */ '@/views/Static/Privacy.vue'),
    props: true,
  },
  {
    path: '/terms',
    name: 'terms',
    component: () =>
      import(/* webpackChunkName: "terms" */ '@/views/Static/Terms.vue'),
    props: true,
  },
  {
    path: '/help-center',
    name: 'help',
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
