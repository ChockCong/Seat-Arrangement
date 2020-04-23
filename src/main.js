import Vue from 'vue'
import App from './App.vue'
import store from './store/index';

// import iView from 'iview';
import router from './router/router';
import './plugins/iview'
import 'iview/dist/styles/iview.css';
import html2canvas from 'html2canvas';

Vue.config.productionTip = false;

// Vue.use(iView);
Vue.prototype.html2canvas = html2canvas;

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
