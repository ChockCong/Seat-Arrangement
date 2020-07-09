
const SET_ADMIN_INFO = 'SET_ADMIN_INFO';
const SET_USER_INFO = 'SET_USER_INFO';
const FULL_VEDIO = 'FULL_VEDIO';
const mutations = {
    setMenus(state, items) {
        state.menuItems = [...items];
    },
    [SET_ADMIN_INFO](state, params) {
        state.adminInfo = params
    },
    [SET_USER_INFO](state, params) {
        state.userInfo = params
    },
    [FULL_VEDIO](state, params) {
        state.fullScreen = params.status
    }
}

module.exports = mutations;