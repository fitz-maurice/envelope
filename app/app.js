import Vue from 'nativescript-vue';
import { appRater } from 'nativescript-rater';
import NSVueShadow from 'nativescript-vue-shadow';
// import VueDevtools from 'nativescript-vue-devtools';
import RadListView from 'nativescript-ui-listview/vue';
import BottomSheetPlugin from 'nativescript-material-bottomsheet/vue';
import { install } from 'nativescript-material-bottomsheet';

// Application Services;
import BaseService from './services/base';
import AdService from './services/ads';
import AuthService from './services/auth';
import UserService from './services/user';
import IAPService from './services/iap';

// Directives
import { tapped, feedback } from '@/directives';

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

// Vue DevTools
// Vue.use(VueDevtools);

// Vue Shadows
// https://github.com/jawa-the-hutt/nativescript-vue-shadow
Vue.use(NSVueShadow);

// RadListView - Core {N} UI Module
Vue.use(RadListView);

// Vue Material Bottomsheet
// https://market.nativescript.org/plugins/nativescript-material-bottomsheet
install();
Vue.use(BottomSheetPlugin);

// https://github.com/manijak/nativescript-carousel/tree/master/demo-vue
Vue.registerElement(
  'Carousel',
  () => require('nativescript-carousel').Carousel,
);
Vue.registerElement(
  'CarouselItem',
  () => require('nativescript-carousel').CarouselItem,
);

// Directives
Vue.use(tapped);
Vue.use(feedback);

// Services Initialization
export const baseService = new BaseService();
export const authService = new AuthService();
export const userService = new UserService();
export const adService = new AdService();
export const iapService = new IAPService();
Vue.prototype.$baseService = baseService;
Vue.prototype.$authService = authService;
Vue.prototype.$userService = userService;
Vue.prototype.$adService = adService;
Vue.prototype.$iapService = iapService;

// Configs
Vue.config.silent = true;

// The Vue Application Instance
new Vue({
  render: h => h('frame', { attrs: { id: 'main' } }, [h(routes.loading)]),
  store,
  data() {
    return {
      darkMode: null,
    };
  },
}).$start();
