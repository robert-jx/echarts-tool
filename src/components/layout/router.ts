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
        path: '/bar-chart',
        children: [
            {
                name: '柱状图',
                icon: '',
                path: '/bar-chart/index'
            },

            {
                name: '渐变柱状图',
                icon: '',
                path: '/bar-chart/linear-bar'
            },
            {
                name: '进度条柱状图',
                icon: '',
                path: '/bar-chart/progress-bar'
            }

        ]
    },
    {
        name: '饼图', icon: '',
        path: '/pie-chart',
        children: [
            { name: '饼图', icon: '', path: '/pie-chart/index' },
            { name: '南丁格尔玫瑰图', icon: '', path: '/pie-chart/nightingale' },

        ]
    },
    {
        name: '雷达图', icon: '',
        path: '/radar-chart',
        children: [
            { name: '雷达图', icon: '', path: '/radar-chart/index' }
        ]
    },
    {
        name: '仪表盘', icon: '',
        path: '/dashboard',
        children: [
            { name: '仪表盘', icon: '', path: '/dashboard/index' },
        ]
    },

]