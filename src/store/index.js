import Vue from 'vue'
import Vuex from 'vuex'


Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        userInfo: ''

    },
    getters: {},
    mutations: {
        saveUserInfo: (state, res) => {
            state.userInfo = res
            console.log(state.userInfo);
        }
    },
    actions: {},
    modules: {}
})