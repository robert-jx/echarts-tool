<template>
    <section class="base-line">
        <div :id="id" :style="{ 'width': width, 'height': height }"></div>
    </section>
</template>

<script setup lang="ts">
import * as echarts from 'echarts';
import { onMounted } from 'vue';
const props = withDefaults(
    defineProps<{
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
        isArea?: boolean;// 是否开启面积展示
        isStack?: boolean;// 是否堆叠
        timeLabel?: any;// x轴数据
        dataList?: any;// y轴数据


    }>(),
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
        isArea: true,
        isStack: true,
        timeLabel: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        dataList: [{ data: [150, 230, 224, 218, 135, 147, 260], name: '' }]
    }
);
// 配置项
let option = {
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
        feature: {
            saveAsImage: {}
        }
    },
    xAxis: {
        type: 'category',
        boundaryGap: props.boundaryGap,
        data: props.timeLabel
    },
    yAxis: {
        type: 'value'
    },
    series: props.dataList.map((v: any) => {
        return {
            name: v.name,
            data: v.data,
            type: 'line',
            smooth: props.smooth,
            stack: props.isStack ? 'Total' : null,
            areaStyle: props.isArea ? {} : null
        }
    })
};

// 初始化
const init = () => {
    let chartDom: any = document.getElementById(props.id);
    let myChart = echarts.init(chartDom);
    option && myChart.setOption(option);
}

// 挂载
onMounted(() => {
    init();
})

</script>

<style lang="scss" scoped>
.base-line {
    width: 100%;
    height: 100%;
}
</style>