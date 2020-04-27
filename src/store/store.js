const state = {
    menuItems: [
        {
            name: 'home', // 要跳转的路由名称 不是路径
            category: 'all',
            size: 18, // icon大小
            type: 'md-home', // icon类型
            text: '主页', // 文本内容
        },
        // {
        //     text: '二级菜单',
        //     type: 'ios-paper',
        //     name: 'other',
        //     children: [
        //         {
        //             type: 'ios-grid',
        //             name: 't1',
        //             text: '表格',
        //             // hidden 属性 隐藏此菜单 可以通过在地址栏上输入对应的 URL 来显示页面
        //             // hidden: true,
        //         },
        //         {
        //             text: '三级菜单',
        //             type: 'ios-paper',
        //             children: [
        //                 {
        //                     type: 'ios-notifications-outline',
        //                     name: 'msg',
        //                     text: '查看消息',
        //                 },
        //                 {
        //                     type: 'md-lock',
        //                     name: 'password',
        //                     text: '修改密码',
        //                 },
        //                 {
        //                     type: 'md-person',
        //                     name: 'userinfo',
        //                     text: '基本资料',
        //                 },
        //             ],
        //         },
        //     ],
        // },
        {
            text: '账号管理',
            type: 'md-body',
            size: 18, // icon大小
            category: 'all',
            children: [
                {
                    type: 'md-person',
                    size: 18, // icon大小
                    name: 'info',
                    text: '基本资料',
                }
            ]
        },
        {
            text: '会场管理',
            type: 'md-bowtie',
            size: 18, // icon大小
            category: 'all',
            children: [
                {
                    type: 'ios-people',
                    size: 18, // icon大小
                    name: 'upload-data',
                    text: '宾客数据上传',
                },
                {
                    type: 'md-wine',
                    size: 18, // icon大小
                    name: 'seat-setting',
                    text: '会场设置',
                }
            ]
        },
        {
            text: '功能管理',
            type: 'md-folder',
            size: 18, // icon大小
            category: 'god',
            children: [
                {
                    type: 'md-global',
                    size: 18, // icon大小
                    name: 'function-setting',
                    text: '功能设置',
                }
            ]
        }
    ],
    adminInfo: {
        admin_token: '',
        username: '',
        email: '',
        phoneNo: '',
        company: {
            
        }
    },
    userInfo: {
        name: ''
    }
}

module.exports = state;