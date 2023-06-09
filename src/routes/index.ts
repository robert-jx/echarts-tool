import { createRouter, createWebHistory } from "vue-router";

const Layout = () => import('../components/layout/index.vue')

let routes = [
    {
        path: '/',
        name: 'home',
        //使用import可以路由懒加载，如果不使用，太多组件一起加载会造成白屏
        component: Layout
    },
    // 折线图
    {
        path: '/line-chart',
        name: 'line-chart',
        component: Layout,
        redirect: '/line-chart/index',
        children: [
            {
                path: '/line-chart/index',
                name: 'line-chart-index',
                component: () => import('@/view/line-chart/index.vue')
            }
        ]
    },
    // 柱状图
    {
        path: '/bar-chart',
        name: 'bar-chart',
        component: Layout,
        redirect: '/bar-chart/index',
        children: [
            {
                path: '/bar-chart/index',
                name: 'bar-chart-index',
                component: () => import('@/view/bar-chart/index.vue')
            },

            {
                path: '/bar-chart/linear-bar',
                name: 'bar-chart-linear-bar',
                component: () => import('@/view/bar-chart/linear-bar/index.vue')
            },

            {
                path: '/bar-chart/progress-bar',
                name: 'bar-chart-progress-bar',
                component: () => import('@/view/bar-chart/progress-bar/index.vue')
            }
        ]
    },
    // 饼图
    {
        path: '/pie-chart',
        name: 'pie-chart',
        component: Layout,
        redirect: '/pie-chart/index',
        children: [
            {
                path: '/pie-chart/index',
                name: 'pie-chart-index',
                component: () => import('@/view/pie-chart/index.vue')
            },

            {
                path: '/pie-chart/nightingale',
                name: 'pie-chart-nightingale',
                component: () => import('@/view/pie-chart/nightingale/index.vue')
            }
        ]
    },
    // 雷达图
    {
        path: '/radar-chart',
        name: 'radar-chart',
        component: Layout,
        redirect: '/radar-chart/index',
        children: [
            {
                path: '/radar-chart/index',
                name: 'radar-chart-index',
                component: () => import('@/view/radar-chart/index.vue')
            }
        ]
    },
    // 仪表盘
    {
        path: '/dashboard',
        name: 'dashboard',
        component: Layout,
        redirect: '/dashboard/index',
        children: [
            {
                path: '/dashboard/index',
                name: 'dashboard-index',
                component: () => import('@/view/dashboard/index.vue')
            }
        ]
    },
    //{
    //配置404页面
    //path: '/:catchAll(.*)',
    //name: '404',
    //component: () => import(''),
    //}
]
// 路由
const router = createRouter({
    history: createWebHistory(),
    routes
})
// 导出
export default router