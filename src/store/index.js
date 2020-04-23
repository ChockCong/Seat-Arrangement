
import Vue from 'vue'
import Vuex from 'vuex'
const state = require('./store');
const mutations = require('./mutations')
Vue.use(Vuex)

const store = new Vuex.Store({
    state: state,
    mutations: mutations
})

export default store;