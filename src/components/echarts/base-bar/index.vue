<template>
    <section class="base-line">
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
    //内容位置
    left?: string;
    right?: string;
    top?: string;
    bottom?: string;
    //-------
    alignWithLabel?: boolean;// 横坐标是否对齐格子中间
    showBackground?: boolean;//是否展示背景
    isBroadwise?: boolean;//是否横向
    isStack?: boolean;// 是否开启面积展示
    legend?: boolean;// 是否展示统计内容
    markPoint?: boolean;//是否展示最高最低点
    markLine?: boolean;//是否展示markline
    timeLabel?: any;// x轴数据
    dataList?: any;// y轴数据

}
const props = withDefaults(
    defineProps<Props>(),
    {
        id: 'main',
        width: '1000px',
        height: '600px',
        title: 'base-line',
        left: '3%',
        right: '4%',
        top: '13%',
        bottom: '3%',
        showBackground: true,
        alignWithLabel: true,
        isBroadwise: true,
        isStack: true,
        legend: true,
        markPoint: true,
        markLine: true,
        timeLabel: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        dataList: [
            {
                data: [150, 230, 224, 218, 135, 147, 260],
                name: 'Phone'
            },
            {
                name: 'Direct',
                data: [320, 332, 301, 334, 390, 330, 320]
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
            text: props.title
        },
        // 悬浮展示面板
        tooltip: {
            trigger: 'axis',
            // 悬浮时定位的线
            axisPointer: {
                type: 'cross',
                label: {
                    backgroundColor: '#6a7985'
                }
            }
        },
        // 内容位置
        grid: {
            left: props.left,
            right: props.right,
            top: props.top,
            bottom: props.bottom,
            containLabel: true
        },
        // 工具箱
        toolbox: {
            show: true,
            feature: {
                dataView: { readOnly: true },
                magicType: { type: ['line', 'bar'] },
                restore: {},
                saveAsImage: {}
            }
        },
        legend: props.legend ? {
            data: props.dataList.map((v: any) => {
                return v.name
            })
        } : null,
        xAxis: {
            type: 'category',
            data: props.timeLabel,

            axisTick: {
                alignWithLabel: props.alignWithLabel
            }
        },
        yAxis: {
            type: 'value'
        },
        series: props.dataList.map((v: any) => {
            return {
                name: v.name,
                data: v.data,
                type: 'bar',
                showBackground: props.showBackground,

                backgroundStyle: props.showBackground ? {
                    color: 'rgba(180, 180, 180, 0.2)'
                } : null,

                stack: props.isStack ? 'Ad' : null,
                markPoint: props.markPoint ? {
                    data: [
                        { type: 'max', name: 'Max' },
                        { type: 'min', name: 'Min' }
                    ]
                } : null,
                markLine: props.markLine ? {
                    data: [{ type: 'average', name: 'Avg' }]
                } : null
            }
        })
    }
    if (props.isBroadwise) {
        let temp = obj.xAxis;
        (obj.xAxis as any) = obj.yAxis;
        obj.yAxis = temp
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
.base-line {
    width: 100%;
    height: 100%;
}
</style>