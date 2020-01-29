import Vue from 'nativescript-vue';
import VueDevtools from 'nativescript-vue-devtools';
import routes from './router';
import AdService from './services/adService';
import AuthService from './services/authService';
import UserService from './services/userService';
import { appRater } from 'nativescript-rater';
import DateTimePicker from 'nativescript-datetimepicker/vue';

// Styles
import './app.scss';

// App Rater
// https://github.com/gogoout/nativescript-rater
appRater.init({
  showNeverButton: false,
  debugMode: true,
});

// DateTime Picker
// https://github.com/NativeScript/nativescript-datetimepicker
Vue.use(DateTimePicker);

// Vue DevTools
Vue.use(VueDevtools);

// Services
export const authService = new AuthService();
export const userService = new UserService();
export const adService = new AdService();
Vue.prototype.$authService = authService;
Vue.prototype.$userService = userService;
Vue.prototype.$adService = adService;

// Configs
Vue.config.silent = true;

// The Vue Application Instance
new Vue({
  render: h => h('frame', [h(routes.loading)]),
}).$start();
