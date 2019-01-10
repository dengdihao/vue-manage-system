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
export function _createcaseA(param) { //管理员
    return postJson('/case/admin/createCase',param)
}

export function _createcaseS(param) { //主管
    return postJson('/case/supervisor/createCase', param)
}

export function _createcaseR(param) { //报告员
    return postJson('/case/reportingStaff/createCase', param)
}

/* 获取操作记录 */
export function _postoperationA(param) { //管理员
    return postJson('/case/admin/operation/log',param)
}

export function _postoperationFc(param) { //财务主管
    return postJson('/case/financialController/operation/log', param)
}

export function _postoperationS(param) { //主管
    return postJson('/case/supervisor/operation/log', param)
}

export function _postoperationF(param) { //财务
    return postJson('/case/financial/operation/log', param)
}

export function _postoperationR(param) { //报告员
    return postJson('/case/reportingStaff/operation/log', param)
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
export function _postsearchA(param){
    return postJson('/case/admin/case/search',param)
}
export function _postsearchS(param) {
    return postJson('/case/supervisor/case/search', param)
}
export function _postsearchR(param) {
    return postJson('/case/reportingStaff/case/search', param)
}

/* 详情页面 */
export function _detailCaseA(urls,param) {
    return jointUrl('/case/admin/case/detail/:case_id/:case_type', urls, param)
}

export function _detailCaseFc(urls, param) {
    return jointUrl('/case/financialController/case/detail/:case_id/:case_type', urls, param)
}

export function _detailCaseS(urls, param) {
    return jointUrl('/case/supervisor/case/detail/:case_id/:case_type', urls, param)
}

export function _detailCaseF(urls, param) {
    return jointUrl('/case/financial/case/detail/:case_id/:case_type', urls, param)
}

export function _detailCaseR(urls, param) {
    return jointUrl('/case/reportingStaff/case/detail/:case_id/:case_type', urls, param)
}



/* 修改案件信息 */
export function _updateCaseA(urls,param) {
     return jointUrlPost('/case/admin/caseUpdate/:case_id/:case_type', urls, param)
}

export function _updateCaseS(urls, param) {
    return jointUrlPost('/case/supervisor/caseUpdate/:case_id/:case_type', urls, param)
}

export function _updateCaseR(urls, param) {
    return jointUrlPost('/case/reportingStaff/caseUpdate/:case_id/:case_type', urls, param)
}



/* 查看自己的案件 */
export function _getCaseListA(param) {
    return get('case/admin/caseList',param)
}
export function _getCaseListS(param) {
    return get('case/supervisor/caseList', param)
}
export function _getCaseListR(param) {
    return get('case/reportingStaff/caseList', param)
}