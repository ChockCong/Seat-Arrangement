import { reqJsonData } from './axios';

export const adminRegister = (params) => {
    return reqJsonData({url: '/api/org/main/register', params, method: 'post'})
}


export const validateLoginName = (params) => {
    return reqJsonData({url: '/api/org/main/validateLoginName', params, method: 'post'})
}

export const adminLogin = (params) => {
    return reqJsonData({url: '/api/org/main/login', params, method: 'post'})
}

/**
     * @module Info.vue
     * @desc 查看个人信息
**/
export const getUserInfo = (props, params) => {
    return reqJsonData({url: `/api/org/main/${props.ctId}`, params, method: 'get'})
}

export const updateUserInfo = (params) => {
    return reqJsonData({url: `/api/org/main`, params, method: 'put'})
}

export const updatePhone = (params) => {
    return reqJsonData({url: '/api/org/main/updatePhone', params, method: 'post'})
}

export const updateEmail = (params) => {
    return reqJsonData({url: '/api/org/main/updateEmail', params, method: 'post'})
}


export const getOwnAllAuth = (params) => {
    return reqJsonData({url: '/api/org/app/main/getOwnAllAuth', params, method: 'post'})
}

/**
     * @module SubAccounts.vue
     * @desc 子账号操作
**/
export const getChildrenList = (params) => {
    return reqJsonData({url: '/api/org/main/getChildrenList', params, method: 'post'})
}

export const addChild = (params) => {
    return reqJsonData({url: '/api/org/main/addChild', params, method: 'post'})
}

export const disableChild = (params) => {
    return reqJsonData({url: '/api/org/main/changeEffective', params, method: 'post'})
}

/**
     * @module SubAccounts.vue
     * @desc 应用操作
**/
export const getFunctionList = (params) => {
    return reqJsonData({ url: '/api/app/main/super/page', params, method: 'post'})
}

export const addFunction = (params) => {
    return reqJsonData({ url: '/api/app/main/super', params, method: 'post'})
}

export const getFunction = (props, params) => {
    return reqJsonData({url: `/api/app/main/super/${props.functionId}`, params, method: 'get'})
}

export const validateFunctionMap = (params) => {
    return reqJsonData({url: '/api/app/main/super/validateMapping', params, method: 'post'})
}

export const updateFunction = (params) => {
    return reqJsonData({url: '/api/app/main/super', params, method: 'put'})
}

export const disableFunction = (params) => {
    return reqJsonData({url: '/api/app/main/super/changeEffective', params, method: 'post'})
}
