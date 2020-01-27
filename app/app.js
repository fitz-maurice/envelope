import Vue from 'nativescript-vue';
import routes from './router';
import AuthService from './services/authService';
import { appRater } from 'nativescript-rater';

// App Rater
// https://github.com/gogoout/nativescript-rater
appRater.init({
  showNeverButton: false,
  debugMode: true,
});

// Styles
import './app.scss';

export const authService = new AuthService();
Vue.prototype.$authService = authService;

Vue.config.silent = true;

new Vue({
  render: h => h('frame', [h(routes.loading)]),
}).$start();
