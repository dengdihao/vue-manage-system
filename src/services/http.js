import axios from 'axios'
import * as qs from 'querystring';
import Loading from '../components/loading/Loading'
import config from './config'
import router from '../router';
import store from '../store/store'

console.info(window.sessionStorage.getItem('token'))
let instance = axios.create({
    baseURL: config.baseURL, // api的base_url
    timeout: 15000,// 请求超时时间
});


/* 拦截请求 */
instance.interceptors.request.use(
    request => {
        
        Loading.open()
        if (store.state.token) {
            console.info(request.headers)
            // request.setRequestHeader('Authorization',store.state.token)
            request.headers['Authorization'] = store.state.token
        }
        return request;
    },
    error => {
        Loading.close()
        return Promise.reject(error)
    }
);
/* 拦截响应 */
instance.interceptors.response.use(
    response => {
        console.info(response)
        Loading.close()
        return response.data
    },
    
    error => {
        Loading.close()
        if (error.response) {
            switch (error.response.status) {

                case 401:
                    this.$store.commit('del_token');
                    router.replace({
                        path: '/login',
                        query: {
                            redirect: router.currentRoute.fullPath
                        } //登录成功后跳入浏览的当前页面
                    })
                    debugger
            }
        }
        return Promise.reject(error)
    }
);

export function get(url, body = {}, config = {}) {
    config.params = body;
    return instance.get(url, config)
}

export function postJson(url, body = {}, config = {}) {
    return instance.post(url, body, config)
}

export function postForm(url, body = {}, config = {}) {
    return instance.post(url, qs.stringify(body), config)
}

export function postFormData(url, body = {}, config = {}) {
    let f = new FormData()
    Object.entries(body).forEach(data => {
        f.append(...data);
    })
    return instance.post(url, f, config)
}

export function getUrl(url, body = {}) {
    let search = qs.stringify(body);
    if (search) {
        return config.baseURL + url + '?' + search;
    }
    return config.baseURL + url;
}
