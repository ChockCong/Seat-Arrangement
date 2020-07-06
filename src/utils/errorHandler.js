import Vue from 'vue';
import router from '../router/router'
const vm = new Vue();

export function errorPopHandler(str) {
    const $Message = vm.$Message || vm.prototype.$Message;
    return $Message.error({content: str, closable: true})
}