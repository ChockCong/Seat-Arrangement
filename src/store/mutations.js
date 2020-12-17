
const SET_ADMIN_INFO = 'SET_ADMIN_INFO';
const SET_ADMIN_NAME = 'SET_ADMIN_NAME';
const SET_USER_INFO = 'SET_USER_INFO';
const FULL_VEDIO = 'FULL_VEDIO';
const REMOVE_ADMIN_INFO = 'REMOVE_ADMIN_INFO';
const { getCookie, setCookie } = require('../utils/cookie');
const mutations = {
    setMenus(state, items) {
        state.menuItems = [...items];
    },
    [SET_ADMIN_INFO](state, params) {
        // TODO: 这里构造用户数据结构，后端结构修改后在这里重构
        state.adminInfo = params;
        let userStorage = getCookie('loginInfo');
        let user = userStorage ? JSON.parse(userStorage) : undefined;
        if (user) setCookie(state.adminInfo);
        // state.adminInfo = params
    },
    [SET_ADMIN_NAME](state, params) {
        state.adminInfo.ctName = params.name;
        let userStorage = getCookie('loginInfo');
        let user = userStorage ? JSON.parse(userStorage) : undefined;
        if (user) setCookie(state.adminInfo);
    },
    [REMOVE_ADMIN_INFO](state) {
        state.adminInfo = {}
    },
    [SET_USER_INFO](state, params) {
        state.userInfo = params
    },
    [FULL_VEDIO](state, params) {
        state.fullScreen = params.status
    }
}

module.exports = mutations;