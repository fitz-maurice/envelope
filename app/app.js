import Vue from 'nativescript-vue';
import routes from './router';
import AuthService from './services/authService';

// require('nativescript-plugin-firebase');
export const authService = new AuthService();
Vue.prototype.$authService = authService;

Vue.config.silent = true;

new Vue({
  render: h => h('frame', [h(routes.loading)]),
}).$start();
