import { reqJsonData } from './axios';

export const adminLogin = (params) => {
    return reqJsonData({url: 'api/user/login', params, method: 'post'})
}