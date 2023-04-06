export const menu = [
    {
        name: '用户管理',
        icon: '',
        path: '/user-manage',
        children: [
            {
                name: '用户列表',
                icon: '',
                path: '/user-manage/list'
            },
            {
                name: '用户类型',
                icon: '',
                path: '/user-manage/type'
            }
        ]
    },
    {
        name: '权限管理', icon: '',
        path: '/role-manage',
        children: [
            {
                name: '权限列表',
                icon: '',
                path: '/role-manage/list'
            }
        ]
    },
    {
        name: '商品管理', icon: '',
        path: '/goods-manage',
        children: [
            { name: '商品列表', icon: '', path: '/goods-manage/list' },
            { name: '分类参数', icon: '', path: '/goods-manage/type' },
            { name: '商品分类', icon: '', path: '/goods-manage/commodity' },

        ]
    },
    {
        name: '订单管理', icon: '',
        path: '/order-manage',
        children: [
            { name: '订单列表', icon: '', path: '/order-manage/list' }
        ]
    },
    {
        name: '数据统计', icon: '',
        path: '/data-statistics',
        children: [
            { name: '订单统计', icon: '', path: '/data-statistics/order' },
            { name: '日志统计', icon: '', path: '/data-statistics/log' },
        ]
    },

]