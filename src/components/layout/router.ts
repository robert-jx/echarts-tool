export const menu = [
    {
        name: '折线图',
        icon: '',
        path: '/line-chart',
        children: [
            {
                name: '折线图',
                icon: '',
                path: '/line-chart/index'
            }
        ]
    },
    {
        name: '柱状图', icon: '',
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
        name: '饼图', icon: '',
        path: '/goods-manage',
        children: [
            { name: '商品列表', icon: '', path: '/goods-manage/list' },
            { name: '分类参数', icon: '', path: '/goods-manage/type' },
            { name: '商品分类', icon: '', path: '/goods-manage/commodity' },

        ]
    },
    {
        name: '雷达图', icon: '',
        path: '/order-manage',
        children: [
            { name: '订单列表', icon: '', path: '/order-manage/list' }
        ]
    },
    {
        name: '仪表盘', icon: '',
        path: '/data-statistics',
        children: [
            { name: '订单统计', icon: '', path: '/data-statistics/order' },
            { name: '日志统计', icon: '', path: '/data-statistics/log' },
        ]
    },

]