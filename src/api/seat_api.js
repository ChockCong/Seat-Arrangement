import { reqJsonData } from './axios';

export const uploadCustomers = (params) => {
    return reqJsonData({url: '/seat/customer/upload', isformData: true, params, method: 'post', types: 'seat'})
}

export const getSeats = (params) => {
    return reqJsonData({url: '/seat/main/page', params, method: 'post', types: 'seat'})
}

export const getSeat = (params) => {
    return reqJsonData({url: '/seat/main', params, method: 'get', types: 'seat'})
}

export const getTemplates = (params) => {
    return reqJsonData({url: '/seat/template/page', params, method: 'post', types: 'seat'})
}

export const getTemplate = (params) => {
    return reqJsonData({url: '/seat/template', params, method: 'get', types: 'seat'})
}
