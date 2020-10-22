const menuItems = [
    {
        name: 'home', // 要跳转的路由名称 不是路径
        category: 'all',
        size: 18, // icon大小
        type: 'md-home', // icon类型
        text: '主页', // 文本内容
    },
    {
        text: '会场中心',
        type: 'md-bowtie',
        size: 18, // icon大小
        category: 'all',
        children: [
            {
                type: 'md-wine',
                size: 18, // icon大小
                name: 'Using',
                text: '会场模板',
            },
            {
                type: 'md-map',
                size: 18, // icon大小
                name: 'Setting',
                text: '会场定义',
            }
        ]
    },
    {
        text: '工具中心',
        type: 'md-folder',
        size: 18, // icon大小
        category: 'all',
        children: [
            {
                type: 'md-desktop',
                size: 18, // icon大小
                name: 'baberrage',
                text: '互动视频',
            }
        ]
        
        // 互动留言*互动抽奖*宴会反馈*菜品评价*菜品推荐*电子请帖*互动游戏*
    },
    {
        text: '账号中心',
        type: 'logo-android',
        size: 18, // icon大小
        category: 'admin',
        children: [
            {
                type: 'md-body',
                size: 18, // icon大小
                text: '账号管理',
                children: [
                    {
                        type: 'md-person',
                        size: 18, // icon大小
                        name: 'info',
                        text: '主账号管理',
                    },
                    {
                        type: 'md-people',
                        size: 18, // icon大小
                        name: 'sub-account',
                        text: '子账号管理',
                    }
                ]
            },
            {
                type: 'logo-buffer',
                size: 18, // icon大小
                text: '增值服务',
                children: [
                    {
                        type: 'md-cloud-download',
                        size: 18, // icon大小
                        name: 'package-buy',
                        text: '功能订购',
                    },
                    {
                        type: 'md-pricetag',
                        size: 18, // icon大小
                        name: '',
                        text: '我的订购',
                    } 
                ]
            }
        ]
    },
    {
        text: '控制中心',
        type: 'md-bookmarks',
        size: 18, // icon大小
        category: 'god',
        children: [
            {
                type: 'md-construct',
                category: 'god',
                size: 18, // icon大小
                name: 'function-setting',
                text: '功能管理',
            },
            {
                type: 'md-paper-plane',
                category: 'god',
                size: 18, // icon大小
                name: 'logs',
                text: '操作日志',
            },
            {
                type: 'logo-codepen',
                category: 'god',
                size: 18, // icon大小
                name: '',
                text: '系统监控',
            }
        ]
    }
];

module.exports = menuItems;