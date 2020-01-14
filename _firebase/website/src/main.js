import Vue from 'vue';
import App from './App.vue';
import router from './router';
import PortalVue from 'portal-vue';
import { firestorePlugin } from 'vuefire';
import fire from '@/firebase';
import moment from 'moment';

// Styles
import './assets/styles/index.css';

Vue.config.productionTip = false;

// Firebase
Vue.use(firestorePlugin);

// Vue Portal
Vue.use(PortalVue);

// Click Outside Directive
let handleOutsideClick;

Vue.directive('closable', {
  bind(el, binding, vnode) {
    handleOutsideClick = e => {
      e.stopPropagation();
      const { handler, exclude } = binding.value;

      let clickedOnExcludedEl = false;
      exclude.forEach(refName => {
        if (!clickedOnExcludedEl) {
          const excludedEl = vnode.context.$refs[refName];
          clickedOnExcludedEl = excludedEl.contains(e.target);
        }
      });

      if (!el.contains(e.target) && !clickedOnExcludedEl) {
        vnode.context[handler]();
      }
    };
    document.addEventListener('click', handleOutsideClick);
    document.addEventListener('touchstart', handleOutsideClick);
  },

  unbind() {
    document.removeEventListener('click', handleOutsideClick);
    document.removeEventListener('touchstart', handleOutsideClick);
  },
});

// Auto require all single file components
const files = require.context('./', true, /\.vue|.svg$/i);
files.keys().map(key =>
  Vue.component(
    key
      .split('/')
      .pop()
      .split('.')[0],
    files(key).default,
  ),
);

// Data Formatter
Vue.filter('date', value => {
  if (!value) return '';
  value = value.seconds;
  return moment.unix(value).format('MMM Do, YYYY');
});

new Vue({
  el: '#app',
  router,
  data() {
    return {
      user: null,
      socialLogin: JSON.parse(localStorage.getItem('social-login')),
      loggedIn: JSON.parse(localStorage.getItem('logged-in')),
    };
  },
  async beforeCreate() {
    fire.auth().onAuthStateChanged(user => {
      this.user = user;
      if (user) {
        this.loggedIn = true;
        localStorage.setItem('logged-in', true);
      } else {
        this.loggedIn = false;
        this.socialLogin = false;
        localStorage.removeItem('logged-in');
      }
    });
  },
  render(createElement) {
    return createElement(App, {
      props: {
        user: this.user,
        loggedIn: this.loggedIn || this.socialLogin,
      },
    });
  },
});
