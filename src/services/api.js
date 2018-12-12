import axios from 'axios'
import vue from 'vue'
import Loading from '../components/loading/Loading'

axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'

// 请求拦截器
axios.interceptors.request.use(function (config) {
    Loading.open()
    return config;
}, function (error) {
    Loading.close()
    return Promise.reject(error);
})
// 响应拦截器
axios.interceptors.response.use(function (response) {
    Loading.close()
    return response;
}, function (error) {
    Loading.close()
    return Promise.reject(error);
})

// 封装axios的post请求
export function postList (url, params) {
    return new Promise((resolve, reject) => {
        axios.post(url, params)
            .then(response => {
                resolve(response.data);
            })
            .catch((error) => {
                reject(error);
            })
    })
}

export function getList (url, params) {
    return new Promise((resolve, reject) => {
        axios.get(url, params)
            .then(response => {
                resolve(response.data);
            })
            .catch((error) => {
                reject(error);
            })
    })
}

export default {
    _postList (url, params) {
        return postList(url, params);
    },
    _getlist (url, params) {
        return getList(url, params);
    }
}