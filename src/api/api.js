import { reqJsonData } from './axios';

export const adminRegister = (params) => {
    return reqJsonData({url: '/api/main/register', params, method: 'post'})
}


export const validateLoginName = (params) => {
    return reqJsonData({url: '/api/main/validateLoginName', params, method: 'post'})
}

export const adminLogin = (params) => {
    return reqJsonData({url: '/api/main/login', params, method: 'post'})
}

/**
     * @module Info.vue
     * @desc 查看个人信息
**/
export const getUserInfo = (props, params) => {
    return reqJsonData({url: `/api/main/${props.ctId}`, params, method: 'get'})
}

export const updateUserInfo = (params) => {
    return reqJsonData({url: `/api/main`, params, method: 'put'})
}

export const updatePhone = (params) => {
    return reqJsonData({url: '/api/main/updatePhone', params, method: 'post'})
}

export const updateEmail = (params) => {
    return reqJsonData({url: '/api/main/updateEmail', params, method: 'post'})
}

export const getOwnAllAuth = (params) => {
    return reqJsonData({url: '/api/main/getOwnAllAuth', params, method: 'post'})
}

/**
     * @module SubAccounts.vue
     * @desc 子账号操作
**/
export const getChildrenList = (params) => {
    return reqJsonData({url: '/api/main/getChildrenList', params, method: 'post'})
}

export const addChild = (params) => {
    return reqJsonData({url: '/api/main/addChild', params, method: 'post'})
}

export const disableChild = (params) => {
    return reqJsonData({url: '/api/main/changeEffective', params, method: 'post'})
}