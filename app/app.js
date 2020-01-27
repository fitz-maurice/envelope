import Vue from 'nativescript-vue';
import routes from './router';
import AuthService from './services/authService';
import UserService from './services/userService';
import { appRater } from 'nativescript-rater';
import DateTimePicker from 'nativescript-datetimepicker/vue';

// App Rater
// https://github.com/gogoout/nativescript-rater
appRater.init({
  showNeverButton: false,
  debugMode: true,
});

// DateTime Picker
// https://github.com/NativeScript/nativescript-datetimepicker
Vue.use(DateTimePicker);

// Styles
import './app.scss';

// Services
export const authService = new AuthService();
export const userService = new UserService();
Vue.prototype.$authService = authService;
Vue.prototype.$userService = userService;

Vue.config.silent = true;

new Vue({
  render: h => h('frame', [h(routes.loading)]),
}).$start();
