// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import Vuetify from 'vuetify';
import VueHead from 'vue-head';
import _ from 'lodash';

import App from './App';
import router from './router';

Vue.config.productionTip = false;
Vue.use(Vuetify);
Vue.use(VueHead);
Object.defineProperty(Vue.prototype, '$_', { value: _ });

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
});
