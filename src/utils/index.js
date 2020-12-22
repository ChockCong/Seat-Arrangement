import Vue from 'vue';
import router from '../router/router';
const vm = new Vue();

const fileType = {
    excel: ['xlsx', 'xls'],
}
Date.prototype.format = function (format) {
    var o = {
        "M+": this.getMonth() + 1, //month
        "d+": this.getDate(),    //day
        "h+": this.getHours(),   //hour
        "m+": this.getMinutes(), //minute
        "s+": this.getSeconds(), //second
        "q+": Math.floor((this.getMonth() + 3) / 3),  //quarter
        "S": this.getMilliseconds() //millisecond
    }
    if (/(y+)/.test(format)) format = format.replace(RegExp.$1,
        (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o) if (new RegExp("(" + k + ")").test(format))
        format = format.replace(RegExp.$1,
            RegExp.$1.length == 1 ? o[k] :
                ("00" + o[k]).substr(("" + o[k]).length));
    return format;
}

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
export function confirmModal(type, titleStr = '', contentStr = '', handler = undefined, params = {}) {
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
                    console.log(handler instanceof Function, handler);
                    if (handler instanceof Function) {
                        if (_.isEmpty(params)) await handler();
                        else await handler(params);
                    }
                    vm.$Modal.remove();
                },
                onCancel: () => { }
            })
    }
}

export function level(level, isGod = false) {
    if (isGod) return Number(level) === 0;
    let role = ''
    switch (Number(level)) {
        case 1: role = '普通用户'; break;
        case 2: role = '子用户'; break;
        case 3: role = 'VIP会员'; break;
        default: role = '管理员';
    }
    return role;
}

export function formatDateTime(dates) {
    let date = new Date(dates);
    console.log(new Date(date.getTime()))
    let y = date.getFullYear();
    let m = date.getMonth() + 1;
    m = m < 10 ? ('0' + m) : m;
    let d = date.getDate();
    d = d < 10 ? ('0' + d) : d;
    let h = date.getUTCHours();
    h = h < 10 ? ('0' + h) : h;
    let i = date.getMinutes();
    i = i < 10 ? ('0' + i) : i;
    let s = date.getSeconds();
    s = s < 10 ? ('0' + s) : s;
    return `${y}-${m}-${d} ${h}:${i}:${s}`;
}

export function dataURLtoFile(dataURI, type) {
    let binary = atob(dataURI.split(',')[1]);
    let array = [];
    for (let i = 0; i < binary.length; i++) {
        array.push(binary.charCodeAt(i));
    }
    let BlobObj = new Blob([new Uint8Array(array)], { type: type });
    let time = new Date();
    let str = String(time.getFullYear()) + String(time.getMonth() + 1) + String(time.getDate()) + String(time.getHours()) + String(time.getMinutes()) + String(time.getSeconds());
    return new File([BlobObj], `seat${str}.jpg`); // 重命名了
}

export function downloadFile(data, fileName) {
    if (!data) {
        return
    }
    let url = window.URL.createObjectURL(new Blob([data]));
    let link = document.createElement('a');
    link.style.display = 'none';
    link.href = url;
    link.setAttribute('download', fileName);
    document.body.appendChild(link);
    link.click();
}

export function checkFiles(size = 0/* 单位M */, type = ''/* 文件术语详见fileType */, file) {
    if (typeof size !== 'number') {
        return false;
    }
    if (size) {
        if (file.size > size / 1024 / 1024) {
            Vue.prototype.errorPopHandler(`文件不能超过${size}M，请重新上传`);
            return false;
        }
    }
    if (type) {
        let fileExt = file.name.replace(/.+\./, "");
        const fileSetType = fileType[type];
        if (fileSetType.indexOf(fileExt.toLowerCase()) === -1) {
            Vue.prototype.errorPopHandler(`只能上传${type.toUpperCase()}类型文件，请重新上传`);
            return false;
        }
    }
    return true;
}


