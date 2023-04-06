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