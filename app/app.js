import Vue from 'nativescript-vue';
import { appRater } from 'nativescript-rater';
import NSVueShadow from 'nativescript-vue-shadow';
import VueDevtools from 'nativescript-vue-devtools';
import DateTimePicker from 'nativescript-datetimepicker/vue';

// Application Services
import AdService from './services/adService';
import AuthService from './services/authService';
import UserService from './services/userService';
import CardService from './services/cardService';
import StorageService from './services/storageService';
import IAPService from './services/iap';

// Styles
import './app.scss';

// Routes
import routes from './router';

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

// Vue Shadows
// https://github.com/jawa-the-hutt/nativescript-vue-shadow
Vue.use(NSVueShadow);

// Styles
import './app.scss';

// Services Initialization
export const authService = new AuthService();
export const userService = new UserService();
export const adService = new AdService();
export const cardService = new CardService();
export const storageService = new StorageService();
export const iapService = new IAPService();
Vue.prototype.$authService = authService;
Vue.prototype.$userService = userService;
Vue.prototype.$adService = adService;
Vue.prototype.$cardService = cardService;
Vue.prototype.$storageService = storageService;
Vue.prototype.$iapService = iapService;

// Configs
Vue.config.silent = false;

// The Vue Application Instance
new Vue({
  render: h => h('frame', [h(routes.loading)]),
}).$start();
