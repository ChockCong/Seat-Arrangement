import Vue from 'vue';
import router from '../router/router'
const vm = new Vue();
export function globalFunc() {
    console.log('-----这里是码雷实验室-----')
}

// 通用工具类
export function openNewWindow({ url, full, query = {} }) {
	if (!full) {
		const pageRoute = router.resolve({
			path: url,
			query
		});
		url = pageRoute.href;
	}
    const newLink = document.createElement('a');
    newLink.target = '_blank';
	newLink.rel = 'noreferrer noopener';
	newLink.href = url;
	newLink.click();
}

export function FormatNum(number, type = 2, space = false) {
    if (space && (!number || String(number) === '0.00')) return '';
    return Number(number).toFixed(type);
}

// 业务工具类
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

export function level(level, isGod = false) {
    if (isGod) return Number(level) === 0;
    let role = ''
    switch(Number(level)) {
        case 1 : role = '普通用户'; break;
        case 2 : role = '子用户'; break;
        case 3 : role = 'VIP会员'; break;
        default : role = '管理员';
    }
    return role;
}


