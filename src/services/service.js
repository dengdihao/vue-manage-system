import {
    get,
    postForm,
    postJson,
    postFormData,
    getUrl,
    restful,
    jointUrl,
    jointUrlPost
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



/* 登陆 */
export function _loginpost(param) {
    return postJson('/access/login',param)
}

/* 登出 */
export function _logout(param) {
    return get('/access/logout', param)
}

/* 个人信息 */
export function _userinfo(param) {
    return get('/access/userInfo', param)
}

/* 注册用户 */
export function _register(param) {
    return postJson('/access/register', param)
}

/* 修改个人信息 */
export function _updateuser(param){
    return postJson('/access/updateUser', param)
}

/* 创建案件信息 */
export function _createcaseAdmin(param) {
    return postJson('/case/admin/createCase',param)
}

export function _createcaseSupervisor(param) {
    return postJson('/case/supervisor/createCase', param)
}

export function _createcaseReportingStaff(param) {
    return postJson('/case/reportingStaff/createCase', param)
}

/* 获取操作记录 */
export function _postoperation(param) {
    return postJson('/case/admin/operation/log',param)
}

/* 上传文件 */
export function _postUpload(param) {
    return postFormData('/case/file/upload',param)
}

/* 下载文件 */
export function _getFile(urls,param) {
    return jointUrl('/case/file/:file', urls,param)
}


/* 搜索案件 */
export function _postsearchAdmin(param){
    return postJson('/case/admin/case/search',param)
}
export function _postsearchSupervisor(param) {
    return postJson('/case/supervisor/case/search', param)
}
export function _postsearchReportingStaff(param) {
    return postJson('/case/reportingStaff/case/search', param)
}


/* 详情页面 */
export function _detailCase(urls,param) {
    return jointUrl('/case/admin/case/detail/:case_id/:case_type', urls, param)
}

/* 修改案件信息 */
export function _updateCase(urls,param) {
     return jointUrlPost('/case/admin/caseUpdate/:case_id/:case_type', urls, param)
}