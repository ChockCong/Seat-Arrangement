import Vue from 'vue';
import Cookie from 'js-cookie';
import store from '@/store/index';
import router from '@/router/router';

export const isTokenEnable = () => {
	// const refreshTokenTime = Number(localStorage.getItem(refreshTimeKey));
	// const continuedLogin = localStorage.getItem(continuedLoginKey) || false;
	// const currentTime = new Date().getTime();
    // if (currentTime - refreshTokenTime > 1000 * 60 * 60 * 24)
    const currentTime = String(new Date().getTime());
    const loginTime = localStorage.getItem('loginTime');
    let expires = store.state.adminInfo.token_overtime * 1000;
    if (store.state.adminInfo && currentTime - loginTime > expires) {
        Vue.prototype.errorPopHandler('用户信息已过期，请重新登陆');
        store.commit('REMOVE_ADMIN_INFO');
        removeCookie();
        router.push({ path: '/admin/login' });
    }
    return store.state.adminInfo && (currentTime - loginTime > expires);
};

export const getCookie = (name) => {
    return Cookie.get(name);
}

export const setCookie = (params) => {
    const time = new Date().getTime();
    localStorage.setItem('loginTime', time);
    Cookie.set('loginInfo', params, { expires: new Date(time + params.tokenOverTime * 1000) });
};

export const removeCookie = () => {
    localStorage.removeItem('loginTime');
    Cookie.remove('loginInfo');
    window.sessionStorage.clear();
}