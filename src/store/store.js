import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)


export default new Vuex.Store({
    state: {
        token: '',
        userRole:'',
        id:''
    },
    mutations: {
        set_token(state, token) {
            state.token = token
            localStorage.token = token
            // document.cookie="token="+token
        },
        del_token(state) {
            state.token = ''
            localStorage.removeItem('token')
        },
        set_userRole(state,userRole){
            state.userRole=userRole
            sessionStorage.user_role = userRole
        },
        del_userRole(state){
            state.userRole = ''
            sessionStorage.removeItem('userRole')
        },
        set_id(state,id){
            state.id=id,
            sessionStorage.id=id
        }

    }
})
