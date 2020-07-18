
const SET_ADMIN_INFO = 'SET_ADMIN_INFO';
const SET_USER_INFO = 'SET_USER_INFO';
const FULL_VEDIO = 'FULL_VEDIO';
const mutations = {
    setMenus(state, items) {
        state.menuItems = [...items];
    },
    [SET_ADMIN_INFO](state, params) {
        // TODO: 这里构造用户数据结构，后端结构修改后在这里重构
        state.adminInfo = params.content;
        state.adminInfo.admin_token = params.tokenMsg.token;
        state.adminInfo.token_overtime = params.tokenMsg.tokenOverTime;
        // state.adminInfo = params
    },
    [SET_USER_INFO](state, params) {
        state.userInfo = params
    },
    [FULL_VEDIO](state, params) {
        state.fullScreen = params.status
    }
}

module.exports = mutations;