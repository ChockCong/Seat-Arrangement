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
                text: '会场设置',
                children: [
                    {
                        type: 'md-wine',
                        size: 18, // icon大小
                        name: '',
                        text: '模板选择',
                    },
                    {
                        type: 'md-wine',
                        size: 18, // icon大小
                        name: 'seat-setting',
                        text: '模板定义',
                    }
                ]
            },
            {
                type: 'ios-people',
                size: 18, // icon大小
                name: '',
                text: '名单模板',
                children: [
                    {
                        type: 'ios-people',
                        size: 18, // icon大小
                        name: '',
                        text: '模板下载',
                    },
                    {
                        type: 'ios-people',
                        size: 18, // icon大小
                        name: '',
                        text: '服务选择'
                    }
                ]
            }
        ]
    },
    {
        text: '工具中心',
        type: 'md-folder',
        size: 18, // icon大小
        category: 'all',
        name: 'baberrage'
        // 互动留言*互动抽奖*宴会反馈*菜品评价*菜品推荐*电子请帖*互动游戏*
    },
    {
        text: '账号中心',
        type: 'md-person',
        size: 18, // icon大小
        category: 'admin',
        children: [
            {
                type: 'md-person',
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
                        type: 'md-person',
                        size: 18, // icon大小
                        name: 'sub-account',
                        text: '子账号管理',
                    }
                ]
            },
            {
                type: 'md-person',
                size: 18, // icon大小
                text: '增值服务',
                children: [
                    {
                        type: 'md-person',
                        size: 18, // icon大小
                        name: '',
                        text: '尊享套餐',
                    },
                    {
                        type: 'md-person',
                        size: 18, // icon大小
                        name: '',
                        text: '个性定制',
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
                type: 'md-bookmarks',
                category: 'god',
                size: 18, // icon大小
                name: '',
                text: '功能管理',
            },
            {
                type: 'md-bookmarks',
                category: 'god',
                size: 18, // icon大小
                name: 'logs',
                text: '操作日志',
            },
            {
                type: 'md-bookmarks',
                category: 'god',
                size: 18, // icon大小
                name: '',
                text: '系统监控',
            }
        ]
    }
];

module.exports = menuItems;