import Vue from 'vue';
import App from './App.vue';
import './registerServiceWorker';
import router from './router';
import {firestorePlugin} from 'vuefire';

// Styles
import './assets/styles/index.css';

Vue.config.productionTip = false;

// Firebase
Vue.use(firestorePlugin);

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
  router,
  render: h => h(App),
}).$mount('#app');
