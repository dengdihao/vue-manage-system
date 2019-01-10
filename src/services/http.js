import axios from 'axios'
import * as qs from 'querystring';
import Loading from '../components/loading/Loading'
import config from './config'
import router from '../router';
import store from '../store/store'

let instance = axios.create({
    baseURL: config.baseURL, // api的base_url
    timeout: 15000, // 请求超时时间
});


/* 拦截请求 */
// console.info(store)
instance.interceptors.request.use(
    request => {
        Loading.open()
        if (localStorage.getItem("token")) {
            // request.setRequestHeader('Authorization',store.state.token)
            request.headers['Authorization'] = localStorage.getItem("token")
        }
        console.info(request.data)
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
        Loading.close()
        if (response.data.status ===400) {
            localStorage.removeItem("token")
            router.replace({
                path: '/login',
                query: {
                    redirect: router.currentRoute.fullPath
                } //登录成功后跳入浏览的当前页面
            });
        } else if (response.data.status === 205){
            localStorage.removeItem("token")
            this.$message({
                showClose: true,
                message: response.data.msg,
                type: 'error'
            });
        } else if (response.data.token){
            // localStorage.setItem("token") = response.data.token
        }
        return response.data
    },

    error => {
        Loading.close()
        if (error.response) {
            if (error.response.status === 200) {
                
            } else {
                this.$store.commit('del_token', localStorage.getItem('token'));
                router.replace({
                    path: '/login',
                    query: {
                        redirect: router.currentRoute.fullPath
                    } //登录成功后跳入浏览的当前页面
                });
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

export function jointUrl(url, urls, body = {}, config = {}) {
    url = restful(url, urls)
    config.params = body;
    return instance.get(url, config)
}

export function jointUrlPost(url, urls, body = {}, config = {}) {
    url = restful(url, urls)
    return instance.post(url, body, config)
}


function restful(url, body = {}) {
    let urls = url.split(/\//)
    return urls.reduce((a, b) => {
        if (b.indexOf(':') === 0) {
            return a + `/${body[b.substr(1)]}`
        }
        return a + '/' + b;
    })
}
