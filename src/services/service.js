import {
    get,
    postForm,
    postJson,
    postFormData,
    getUrl
} from './http'
import config from './config'

// 方法前用户 _ 或者 $ 开头

/**
 * user
 * @param {} param
 */

/* 获取案件基本信息 */
export function _getbaseInfo(param) {
    return get('/baseInfo', param)
}

/* 修改案件基本信息 */
export function _postbaseInfo(param) {
    return postJson('/baseInfo', param)
}

/* 获取客户信息 */
export function _getclientInfo(param) {
    return get('/clientInfo', param)
}

/* 修改客户信息 */
export function _postclientInfo(param) {
    return postJson('/clientInfo', param)
}

/* 获取目标信息 */
export function _gettargetInfo(param) {
    return get('/targetInfo', param)
}

/* 修改目标信息 */
export function _posttargetInfo(param) {
    return postJson('/clientInfo', param)
}

/* 获取案件参与人 */
export function _getpaticipants(param) {
    return get('/participants', param)
}

/* 修改案件参与人 */
export function _postpaticipants(param) {
    return postJson('/participants', param)
}

/* 获取财务信息 */
export function _getaccounting(param) {
    return get('/accounting', param)
}

/* 获取财务信息 */
export function _postaccounting(param) {
    return postJson('/accounting', param)
}


export function _loginpost(param) {
    return postJson('/access/login',param)
}

export function _logout(param) {
    return get('/access/logout', param)
}