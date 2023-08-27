import Vue from 'vue'

import App from './App.vue'
import ppsUI from '@/ppsUI/packages'
import '@/elementUI/index.js'
import '@/vantUI/index.js'
import 'less'
import store from './store'
import router from './router'
import 'vant/lib/index.css';

Vue.config.productionTip = false
// Vue.config.devtools = false;

Vue.use(ppsUI)

new Vue({
  store,
  router,
  render: h => h(App),
}).$mount('#app')
