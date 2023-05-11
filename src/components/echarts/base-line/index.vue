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
    smooth?: boolean;// 折线是否平滑
    boundaryGap?: boolean;// 横坐标是否对齐格子中间
    legend?: boolean;//是否展示统计内容
    isArea?: boolean;// 是否开启面积展示
    isStack?: boolean;// 是否堆叠
    markPoint?: boolean;//是否展示最高最低点
    markLine?: boolean;//是否展示markline
    isLinear?: boolean;//是否渐变
    colorList?: any;//颜色列表
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
        smooth: true,
        boundaryGap: true,
        legend: true,
        isArea: true,
        isStack: true,
        markPoint: true,
        markLine: true,
        isLinear: true,
        colorList: ["#00899A", "#10BA4F", '#FFB919', '#FF2C39'],
        timeLabel: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        dataList: [
            { name: 'Phone', data: [150, 230, 224, 218, 135, 147, 260] },
            { name: 'Email', data: [120, 132, 101, 134, 90, 230, 210] },
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
                return v.name;
            })
        } : null,
        xAxis: {
            type: 'category',
            boundaryGap: !props.boundaryGap,
            data: props.timeLabel
        },
        yAxis: {
            type: 'value'
        },
        series: props.dataList.map((v: any, index: number) => {
            return {
                name: v.name,
                data: v.data,
                type: 'line',
                smooth: props.smooth,
                stack: props.isStack ? 'Total' : null,
                areaStyle: props.isArea ? {
                    normal: {
                        color: props.isLinear
                            ? new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                                {
                                    offset: 0,
                                    color: props.colorList[index],
                                },
                                {
                                    offset: 0.1,
                                    color: props.colorList[index],
                                },
                                {
                                    offset: 1,
                                    color: "rgba(0,0,0,0)",
                                },
                            ])
                            : null,

                        opacity: 0.65,
                    }
                } : null,
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
    return obj;
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