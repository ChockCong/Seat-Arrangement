import Vue from 'vue';
const vm = new Vue();

export function errorPopHandler(str) {
    const $Message = vm.$Message || vm.prototype.$Message;
    return $Message.error({content: str, closable: true})
}