<template>
    <section class="base-bar">
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
        title: 'base-bar',
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
        timeLabel: ["视频设备", "门禁设备", "乘客求助", "入侵报警"],
        dataList: [
            {
                name: "项目",
                data: [50, 82, 45, 50],
            },
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

    let list: any = [];

    props.dataList.forEach((v: any) => {
        list.push({
            name: v.name,
            type: "bar",
            label: {
                show: true,
                position: "right",
                color: "#fff",
                fontSize: 12,
                offset: [0, 2],
            },
            zlevel: 1,
            itemStyle: {
                borderRadius: 30,
                color: function (params: any) {
                    //注意，如果颜色太少的话，后面颜色不会自动循环，最好多定义几个颜色
                    var colorList = ["#DA70D6", "#436EEE", "#61a0a8", "#FFA54F"];
                    return colorList[params.dataIndex];
                },
            },
            barWidth: 15,
            data: v.data,
        });
        list.push({
            name: "背景",
            type: "bar",
            barWidth: 15,
            barGap: "-100%",
            data: [100, 100, 100, 100, 100, 100],
            itemStyle: {
                color: "rgba(224,238,238,0.3)",
                borderRadius: 30,
            },
        });
    });


    let obj = {
        // 面板标题
        title: {
            text: props.title
        },

        // 悬浮面板
        tooltip: {
            trigger: "axis",

            formatter(params: any) {
                for (let x in params) {
                    return params[x].name + ":" + "进度为(" + params[x].data + "%)";
                }
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
.base-bar {
    width: 100%;
    height: 100%;
}
</style>