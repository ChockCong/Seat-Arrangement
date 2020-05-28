import Vue from 'vue'
import App from './App.vue'
import store from './store/index';

// import iView from 'iview';
import router from './router/router';
import './plugins/iview'
import 'iview/dist/styles/iview.css';
import './assets/iconfont/iconfont.css';
// import './assets/iconfont/iconfont.js';
import html2canvas from 'html2canvas';
import _ from './utils/lodash';
window._ = _;

Vue.config.productionTip = false;

// Vue.use(iView);
Vue.prototype.html2canvas = html2canvas;

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
