
import Vue from 'vue'
import Vuex from 'vuex'
const state = require('./store');
const mutations = require('./mutations')
Vue.use(Vuex)

const store = new Vuex.Store({
    state: state,
    mutations: mutations,
    getters: {
        getAdminToken: state => {
            return state.adminInfo.admin_token;
        },
        getUserToken: state => {
            return state.userInfo.name;
        },
        getAdminInfo: state => {
            return state.adminInfo 
        }
    }
})

export default store;