import Vue from 'vue'
import App from './App.vue'
import store from './store/index';

// import iView from 'iview';
import router from './router/router';
import '@/plugins/iview'
import _ from '@/utils/lodash';
import tools from './plugins/tools'
// const tools = require('./plugins/tools');
import 'iview/dist/styles/iview.css';
import './assets/iconfont/iconfont.css';

window._ = _;

Vue.config.productionTip = false;

// Vue.use(iView);
Vue.use(tools.vueBaberrage);
Vue.prototype.html2canvas = tools.html2canvas;

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
