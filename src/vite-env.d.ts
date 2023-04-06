/// <reference types="vite/client" />
// 加入此代码来识别vue文件
declare module "*.vue" {
    import { DefineComponent } from "vue"
    const component: DefineComponent<{}, {}, any>
    export default component
}