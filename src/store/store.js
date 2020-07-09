const menuItems = require('./menu');
const state = {
    menuItems,
    adminInfo: {},
    userInfo: {
        name: ''
    },
    fullScreen: false //视频是否最大化
}

module.exports = state;