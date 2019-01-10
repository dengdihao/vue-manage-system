import Vue from 'vue';
import App from './App';
import router from './router';
import axios from 'axios';
import Vuex from 'vuex'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css'; // 默认主题
// import '../static/css/theme-green/index.css';       // 浅绿色主题
import '../static/css/icon.css';
import '../static/js/common'
import "babel-polyfill";


import locale from 'element-ui/lib/locale/lang/en'

import VueDND from 'awe-dnd'

Vue.use(VueDND)
Vue.use(Vuex)
Vue.use(ElementUI, {
    size: 'small',
    locale
});

Vue.prototype.$axios = axios;
import store from './store/store'
import {
    _userinfo
} from './services/service';

axios.defaults.headers['Authorization'] = window.localStorage.getItem("token")

router.beforeEach((to,from,next)=>{
    
    if (localStorage.getItem("token")) {
        _userinfo().then(res=>{
            store.commit("set_userRole", res.data.role);
            if (store.state.userRole) {
                 next()
            }
        })
    }else{
         if (to.path === "/login" || to.path === '/register') {
            next()
        }else{
            next('/login')
        }
    }
})

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app');
