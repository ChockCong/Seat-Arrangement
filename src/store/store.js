const menuItems = require('./menu');
const state = {
    menuItems,
    adminInfo: {
        admin_token: '',
        username: '惊雷管理员账户',
        email: '363384526@qq.com',
        phoneNo: '13222222222',
        company: {
            name: '惊雷实验室',
            address: '康乐北路国际大酒店4楼',
        },
        level: 1
    },
    userInfo: {
        name: ''
    }
}

module.exports = state;