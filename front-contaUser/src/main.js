import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'

import VueRouter from 'vue-router';
import { routes } from './router/index';

import VueMask from 'v-mask'

Vue.config.productionTip = false

Vue.use(VueRouter);
Vue.use(VueMask);

const router = new VueRouter({
  routes: routes,
  mode: 'history' /* faz com que some a # do endereço no servidor, para isso funcionar o servidor hospedado tem que ter essa opção
        no caso do vuecli já tem */
})

new Vue({
  vuetify,
  router,
  render: h => h(App)
}).$mount('#app')