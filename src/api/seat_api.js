import { reqJsonData } from './axios';


export const exportCustomers = (params) => {
    return reqJsonData({ url: '/seat/customer/export', isJson: false, params, method: 'post', types: 'seat' })
}

export const uploadCustomers = (params) => {
    return reqJsonData({ url: '/seat/customer/upload', isformData: true, params, method: 'post', types: 'seat' })
}

export const getSeats = (params) => {
    return reqJsonData({ url: '/seat/main/page', params, method: 'post', types: 'seat' })
}

export const rSeat = (params) => {
    return reqJsonData({ url: '/seat/main/page', params, method: 'post', types: 'seat' })
}

export const cSeat = (params) => {
    return reqJsonData({ url: '/seat/main', params, method: 'post', types: 'seat' })
}

export const uSeat = (params) => {
    return reqJsonData({ url: '/seat/main', params, method: 'put', types: 'seat' })
}

export const dSeat = (params) => {
    return reqJsonData({ url: '/seat/main', params, method: 'delete', types: 'seat' })
}


/**
     * @module Setting.vue,Using.vue
     * @desc 模板增删改查
**/
export const getTemplates = (params) => {
    return reqJsonData({ url: '/seat/template/page', params, method: 'post', types: 'seat' })
}

export const rTemplate = (params) => {
    return reqJsonData({ url: '/seat/template', params, method: 'get', types: 'seat' })
}
export const cTemplate = (params) => {
    return reqJsonData({ url: '/seat/template', params, method: 'post', types: 'seat' })
}
export const uTemplate = (params) => {
    return reqJsonData({ url: '/seat/template', params, method: 'put', types: 'seat' })
}
export const dTemplate = (params) => {
    return reqJsonData({ url: '/seat/template', params, method: 'delete', types: 'seat' })
}
