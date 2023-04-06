import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
// 引入vuex
import store from '@/store'
//引入routes
import router from "./routes/index";
// 引入element
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
// 引入自定义样式变量
import '@/assets/css/common.scss'
// 引入动画库
import "animate.css"
//引入echarts
import * as echarts from 'echarts';

const app = createApp(App)
app.use(router)
app.use(store)
app.use(ElementPlus)


app.config.globalProperties.$echarts = echarts
app.mount('#app')
