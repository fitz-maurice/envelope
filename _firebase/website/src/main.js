import Vue from 'vue';
import App from './App.vue';
import './registerServiceWorker';
import router from './router';
import PortalVue from 'portal-vue';
import { firestorePlugin } from 'vuefire';
import fire from '@/firebase';

// Styles
import './assets/styles/index.css';

Vue.config.productionTip = false;

// Firebase
Vue.use(firestorePlugin);

// Vue Portal
Vue.use(PortalVue);

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
