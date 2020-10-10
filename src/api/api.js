import { reqJsonData } from './axios';

export const adminRegister = (params) => {
    return reqJsonData({url: '/api/main/register', params, method: 'post'})
}

export const adminLogin = (params) => {
    return reqJsonData({url: '/api/main/login', params, method: 'post'})
}