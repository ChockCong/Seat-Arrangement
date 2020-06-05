import Vue from 'vue'
import App from './App.vue'
import store from './store/index';
import router from './router/router';

// import iView from 'iview';
import 'iview/dist/styles/iview.css';
import './assets/iconfont/iconfont.css';
import '@/plugins/iview'
import tools from '@/plugins/tools'
import _ from '@/utils/lodash';
import { globalFunc } from '@/utils/index'
// const tools = require('./plugins/tools');

globalFunc();
//----------------------捕获报错--------------------
Vue.config.errorHandler = function (err, vm, info) {
  console.log('Vue.error', err, vm, info);
 // 逻辑处理
};
Vue.config.warnHandler = function (msg, vm, trace) {
  // `trace` 是组件的继承关系追踪
  console.warn('Vue.warn', msg,vm,trace)
   // 逻辑处理
}

window._ = _;
Vue.prototype.html2canvas = tools.html2canvas;
Vue.use(tools.vueBaberrage);

Vue.config.productionTip = false;


new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
