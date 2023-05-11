<template>
    <section class="nightingale">
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
    legend?: boolean;// 是否展示统计内容
    isAnnular?: boolean;//是否为环形
    dataList?: any;// y轴数据

}
const props = withDefaults(
    defineProps<Props>(),
    {
        id: 'nightingale',
        width: '1000px',
        height: '600px',
        title: 'nightingale',
        subtext: 'Fake Data',
        left: '3%',
        right: '4%',
        top: '13%',
        bottom: '3%',
        legend: true,
        isAnnular: true,
        dataList: [
            { value: 40, name: 'rose 1' },
            { value: 38, name: 'rose 2' },
            { value: 32, name: 'rose 3' },
            { value: 30, name: 'rose 4' },
            { value: 28, name: 'rose 5' },
            { value: 26, name: 'rose 6' },
            { value: 22, name: 'rose 7' },
            { value: 18, name: 'rose 8' }
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
            trigger: 'item'
        },
        // 内容位置
        grid: {
            left: props.left,
            right: props.right,
            top: props.top,
            bottom: props.bottom,
            containLabel: true
        },
        legend: props.legend ?
            {
                top: '5%',
                left: 'center'
            } : null,
        series: {

            name: '',
            data: props.dataList,
            type: 'pie',
            roseType: 'area',
            radius: props.isAnnular ? ['10%', '70%'] : '50%',
            emphasis: {
                itemStyle: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
            },

            itemStyle: {
                borderRadius: 8
            },
        }
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
.nightingale {
    width: 100%;
    height: 100%;
}
</style>