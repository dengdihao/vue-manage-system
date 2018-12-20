import Vue from 'vue';
import App from './App';
import router from './router';
import axios from 'axios';
import Vuex from 'vuex'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';    // 默认主题
// import '../static/css/theme-green/index.css';       // 浅绿色主题
import '../static/css/icon.css';
import '../static/js/common'
import "babel-polyfill";


import locale from 'element-ui/lib/locale/lang/en'

import VueDND from 'awe-dnd'

Vue.use(VueDND)
Vue.use(Vuex)
Vue.use(ElementUI, { size: 'small' ,locale});
Vue.prototype.$axios = axios;
import store from './store/store'

axios.defaults.headers['Authorization']=window.localStorage.getItem("token")
// //使用钩子函数对路由进行权限跳转
// router.beforeEach((to, from, next) => {
//     const role = sessionStorage.getItem('ms_username');
//     // debugger
    
//     // console.log(role)
//     if(!role && to.path !== '/login'){
//         next('/login');
//     }else if(to.meta.permission){
//         // 如果是管理员权限则可进入，这里只是简单的模拟管理员权限而已
//         role.padStart.role === 'Admin' ? next() : next('/403');
//     }else{
//         // 简单的判断IE10及以下不进入富文本编辑器，该组件不兼容
//         if(navigator.userAgent.indexOf('MSIE') > -1 && to.path === '/editor'){
//             Vue.prototype.$alert('vue-quill-editor组件不兼容IE10及以下浏览器，请使用更高版本的浏览器查看', '浏览器不兼容通知', {
//                 confirmButtonText: '确定'
//             });
//         }else{
//             next();
//         }
//     }
// })

router.beforeEach((to, from, next) => {
    if (to.matched.some(r => r.meta.requireAuth)) { //这里的requireAuth为路由中定义的 meta:{requireAuth:true}，意思为：该路由添加该字段，表示进入该路由需要登陆的
        if (store.state.token) {
            next();
        } else {
            next({
                path: '/login',
                query: {
                    redirect: to.fullPath
                }
            })
        }
    } else {
        next();
    }
})





new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app');