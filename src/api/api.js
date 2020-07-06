import { reqJsonData } from './axios';

export const adminLogin = (params) => {
    return reqJsonData({url: '/api/main/login', params, method: 'post'})
}