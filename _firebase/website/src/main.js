import Vue from 'vue';
import App from './App.vue';
import './registerServiceWorker';
import router from './router';
import PortalVue from 'portal-vue';
import {firestorePlugin} from 'vuefire';
import * as firebase from 'firebase';
import config from '@/utils/firebase';
// Styles
import './assets/styles/index.css';

Vue.config.productionTip = false;

// Firebase
Vue.use(firestorePlugin);
firebase.initializeApp(config);

// Vue Portal
Vue.use(PortalVue);

// Auto require all single file components
const files = require.context('./', true, /\.vue$/i);
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
    };
  },
  beforeCreate() {
    firebase.auth().onAuthStateChanged(user => {
      this.user = user;
    });
  },
  render(createElement) {
    return createElement(App, {
      props: {
        user: this.user,
      },
    });
  },
});
