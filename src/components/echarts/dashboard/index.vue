<template>
    <section class="dashboard">
        <div :id="id" :style="{ 'width': width, 'height': height }"></div>
    </section>
</template>

<script setup lang="ts">
import * as echarts from 'echarts';
import { onMounted, watch, nextTick } from 'vue';
export interface Props {
    id?: string;// 绑定的容器id，每次调用需输入不同的id
    width?: string;// 容器宽度
    height?: string;// 容器高度
    title?: string;// 面板标题
    subtext?: string;//副标题
    //内容位置
    left?: string;
    right?: string;
    top?: string;
    bottom?: string;
    //-------
    valueAnimation?: boolean;// 是否开启动画
    dataList?: any;// 数据

}
const props = withDefaults(
    defineProps<Props>(),
    {
        id: 'main',
        width: '1000px',
        height: '600px',
        title: 'dashboard',
        subtext: 'Fake Data',
        left: '3%',
        right: '4%',
        top: '13%',
        bottom: '3%',
        valueAnimation: true,
        dataList: [
            {
                value: [4200, 3000, 20000, 35000, 50000, 18000],
                name: 'Allocated Budget'
            },
            {
                value: [5000, 14000, 28000, 26000, 42000, 21000],
                name: 'Actual Spending'
            }
        ]
    }
);
// 配置项
let option = {}
let chartDom: any = null;
let myChart: any = null;
// 初始化
const init = () => {
    option = getOption();
    option && myChart.setOption(option);
}
const reset = () => {
    option = getOption();
    myChart.clear();
    option && myChart.setOption(option);
}
const getOption = () => {

    let obj = {
        // 面板标题
        title: {
            text: props.title,
            subtext: props.subtext,
        },
        // 悬浮展示面板


        tooltip: {
            formatter: '{a} <br/>{b} : {c}%'
        },
        // 内容位置
        grid: {
            left: props.left,
            right: props.right,
            top: props.top,
            bottom: props.bottom,
        },
        series: [
            {
                name: 'Pressure',
                type: 'gauge',

                progress: {
                    show: props.valueAnimation
                },
                detail: {
                    formatter: '{value}',
                    valueAnimation: props.valueAnimation,
                },
                data: [
                    {
                        value: 50,
                        name: 'SCORE'
                    }
                ]
            }
        ]
    }
    return obj
}

// 挂载
onMounted(() => {
    nextTick(() => {
        chartDom = document.getElementById(props.id)
        myChart = echarts.init(chartDom);
        init();
    })
})
watch(
    () => props.width,
    (newVal, oldVal) => {
        console.log('监听基本类型数据testStr')
        console.log('new', newVal)
        console.log('old', oldVal)
        // nextTick(() => {
        //     init();
        // })
    }
)
defineExpose({
    init,
    reset
})

</script>

<style lang="scss" scoped>
.dashboard {
    width: 100%;
    height: 100%;
}
</style>