const menuItems = require('./menu');
const state = {
    menuItems,
    adminInfo: {
        admin_token: '',
        username: '',
        email: '',
        phoneNo: '',
        company: {
            
        },
        level: 1
    },
    userInfo: {
        name: ''
    }
}

module.exports = state;