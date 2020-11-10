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

export const adminLogout = (params) => {
    return reqJsonData({url: '/api/org/main/logout', params, method: 'post'})
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

export const getSubAuth = (params) => {
    return reqJsonData({url: '/api/org/app/auth/getAllChildAuth', params, method: 'post'})
}

export const changeSubAuth = (params) => {
    return reqJsonData({url: '/api/org/app/auth/changeEffective', params, method: 'post'})
}

/**
     * @module FunctionSetting.vue
     * @desc 应用操作
**/
//God
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
//User
export const getUserFunctionList = (params) => {
    return reqJsonData({ url: '/api/app/main/page', params, method: 'post'})
}

export const getUserFunction = (params) => {
    return reqJsonData({ url: '/api/app/main/view', params, method: 'post'})
}

/**
     * @module Orders.vue
     * @desc 订单模块
**/
export const createOrder = (params) => {
    return reqJsonData({ url: '/api/app/order', params, method: 'post'})
}
export const getOrderList = (params) => {
    return reqJsonData({ url: '/api/app/order/page', params, method: 'post'})
}
export const getOrder = (params) => {
    return reqJsonData({ url: '/api/app/order/view', params, method: 'get'})
}
export const deleteOrder = (params) => {
    return reqJsonData({ url: '/api/app/order', params, method: 'delete'})
}
export const updateOrder = (params) => {
    return reqJsonData({ url: '/api/app/order/updateDetail', params, method: 'post'})
}
export const payOrder = (params) => {
    return reqJsonData({ url: '/api/app/order/pay', params, method: 'post'})
}
