import Vue from 'vue';
const vm = new Vue();
export function globalFunc(err) {
    console.log('-----这里是惊雷实验室-----')
}
export function confirmModal(type, titleStr = '', contentStr = '', handler = undefined) {
    const title = titleStr;
    const content = contentStr;
    switch (type) {
        case 'info':
            vm.$Modal.info({
                title: title,
                content: content
            });
            break;
        case 'success':
            vm.$Modal.success({
                title: title,
                content: content
            });
            break;
        case 'warning':
            vm.$Modal.warning({
                title: title,
                content: content
            });
            break;
        case 'error':
            vm.$Modal.error({
                title: title,
                content: content
            });
            break;
        case 'confirm':
            vm.$Modal.confirm({
                title: title,
                content: content,
                loading: true,
                onOk: async () => {
                    console.log(typeof handler, handler);
                    if (typeof handler === 'function') {
                        await handler();
                    }
                    vm.$Modal.remove();
                }
            })
    }
}
export function level(level) {
    let role = ''
    switch(level) {
        case 1 : role = '普通用户'; break;
        case 2 : role = '普通会员'; break;
        case 3 : role = 'VIP会员'; break;
        default : role = '管理员';
    }
    return role;
}