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
                name: "add",
                data: [22, 23, 18, 14, 25, 33, 21],
            },
        ],
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
    // 颜色设置
    let barTopColor = [
        "#CBB835",
        "#33C6E2",
        "#16B5FF",
        "#157FFE",
        "#8F48F0",
        "#CD597A",
        "#CBB835",
    ];
    let barBottomColor = [
        "#D09311",
        "#279AB0",
        "#0B5FFF",
        "#154AD2",
        "#670BFF",
        "#90222D",
        "#D09311",
    ];
    let list: any = [];
    props.dataList?.forEach((v: any) => {
        list.push({
            name: "",
            type: "pictorialBar",
            symbolSize: [26, 10],
            symbolOffset: [0, -5],
            z: 12,
            itemStyle: {
                color: function (params: any) {
                    return barBottomColor[params.dataIndex];
                },
            },
            label: {
                show: true,
                position: "top",
                fontSize: 16,
            },
            symbolPosition: "end",
            data: v.data,

        });

        list.push({
            name: "",
            type: "pictorialBar",
            symbolSize: [26, 10],
            symbolOffset: [0, 5],
            z: 12,
            itemStyle: {
                color: function (params: any) {
                    return barTopColor[params.dataIndex];
                },
            },
            data: v.data,
        });
        list.push({
            name: v.name,
            type: "bar",
            itemStyle: {
                color: function (params: any) {
                    return new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                        {
                            offset: 1,
                            color: barTopColor[params.dataIndex],
                        },
                        {
                            offset: 0,
                            color: barBottomColor[params.dataIndex],
                        },
                    ]);
                },
                opacity: 0.9,
            },
            z: 16,
            silent: true,
            barWidth: 26,
            barGap: "-100%",
            data: v.data,
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
        });
    })
    let obj = {
        // 面板标题
        title: {
            text: props.title
        },
        // 悬浮面板
        tooltip: {
            trigger: "axis",
            formatter: "{b}：{c}",
            backgroundColor: "rgba(63, 134, 201,.8);", //设置背景颜色
            textStyle: {
                color: "#fff",
            },
            borderColor: "rgba(63, 134, 201,.8)",
            axisPointer: {
                type: "shadow",
                shadowStyle: {
                    color: "rgba(0, 11, 34, .4)",
                },
            },
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
        series: list
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