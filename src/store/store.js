import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)


export default new Vuex.Store({
    state: {
        token: '',
        userRole:''
    },
    mutations: {
        
        set_token(state, token) {
            debugger
            state.token = token
            localStorage.token = token
            document.cookie="token="+token
        },
        del_token(state) {
            state.token = ''
            localStorage.removeItem('token')
        },
        set_userRole(state,userRole){
            state.userRole=userRole
        }

    }
})
