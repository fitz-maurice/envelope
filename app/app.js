import Vue from 'nativescript-vue';
import { appRater } from 'nativescript-rater';
import NSVueShadow from 'nativescript-vue-shadow';
// import VueDevtools from 'nativescript-vue-devtools';
import DateTimePicker from 'nativescript-datetimepicker/vue';
import * as imageCache from 'tns-core-modules/ui/image-cache';

// Application Services;
import BaseService from './services/base';
import AdService from './services/ads';
import AuthService from './services/auth';
import UserService from './services/user';
import StorageService from './services/storage';
import IAPService from './services/iap';

// Styles
import './app.scss';

// Routes
import routes from './router';

// VueX Store
import store from './store';

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
// Vue.use(VueDevtools);

// Vue Shadows
// https://github.com/jawa-the-hutt/nativescript-vue-shadow
Vue.use(NSVueShadow);

// Services Initialization
export const baseService = new BaseService();
export const authService = new AuthService();
export const userService = new UserService();
export const adService = new AdService();
export const storageService = new StorageService();
export const iapService = new IAPService();
export const cache = new imageCache.Cache();
Vue.prototype.$baseService = baseService;
Vue.prototype.$authService = authService;
Vue.prototype.$userService = userService;
Vue.prototype.$adService = adService;
Vue.prototype.$storageService = storageService;
Vue.prototype.$iapService = iapService;
Vue.prototype.$cache = cache;

// Configs
Vue.config.silent = false;

// The Vue Application Instance
new Vue({
  render: h => h('frame', { attrs: { id: 'main' } }, [h(routes.loading)]),
  store,
}).$start();
