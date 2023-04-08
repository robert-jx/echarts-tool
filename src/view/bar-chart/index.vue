<template>
    <section class="bar-chart">
        <section class="left">
            <section class="title">配置项
                <el-button type="primary" @click="setEcharts">运行</el-button>
            </section>
            <section class="content">
                <section class="left-item">
                    <section class="item-title">标题</section>
                    <section class="item-content">
                        <el-input v-model="data.title"></el-input>
                    </section>
                </section>
                <section class="left-item">
                    <section class="item-title">是否展示背景</section>
                    <section class="item-content">
                        <el-switch v-model="data.showBackground" />
                    </section>
                </section>

                <section class="left-item">
                    <section class="item-title">是否展示统计内容</section>
                    <section class="item-content">
                        <el-switch v-model="data.legend" />
                    </section>
                </section>
                <section class="left-item">
                    <section class="item-title">坐标是否和刻度对齐</section>
                    <section class="item-content">
                        <el-switch v-model="data.alignWithLabel" />
                    </section>
                </section>

                <section class="left-item">
                    <section class="item-title">是否堆叠</section>
                    <section class="item-content">
                        <el-switch v-model="data.isStack" />
                    </section>
                </section>
                <section class="left-item">
                    <section class="item-title">是否横向</section>
                    <section class="item-content">
                        <el-switch v-model="data.isBroadwise"></el-switch>
                    </section>
                </section>
                <section class="left-item">
                    <section class="item-title">是否展示最高最低点</section>
                    <section class="item-content">
                        <el-switch v-model="data.markPoint" />
                    </section>
                </section>
                <section class="left-item">
                    <section class="item-title">是否展示平均线</section>
                    <section class="item-content">
                        <el-switch v-model="data.markLine" />
                    </section>
                </section>
            </section>
        </section>
        <section ref="rightView" class="right">
            <base-bar ref="bar" :id="'barChart'" :title="data.title" :width="rightWidth" :height="rightHeight"
                :showBackground="data.showBackground" :alignWithLabel="data.alignWithLabel" :markLine="data.markLine"
                :isStack="data.isStack" :legend="data.legend" :isBroadwise="data.isBroadwise"
                :markPoint="data.markPoint"></base-bar>
        </section>
    </section>
</template>

<script setup lang="ts">
import { ref, onMounted, reactive, watch, nextTick } from 'vue';
import baseBar from '@/components/echarts/base-bar/index.vue'
// 配置项内容
export interface dataProps {
    title?: string,
    showBackground?: boolean,
    alignWithLabel?: boolean,
    isBroadwise?: boolean,
    legend?: boolean,
    isStack?: boolean,
    markPoint?: boolean,
    markLine?: boolean,
}

const rightView = ref<HTMLElement>()
const bar = ref(null)

const rightWidth = ref('0px')
const rightHeight = ref('0px')
onMounted(() => {
    console.log('rightView', rightView.value);

    rightWidth.value = rightView.value?.offsetWidth + 'px'
    rightHeight.value = rightView.value?.offsetHeight + 'px'
})

let data: dataProps = reactive({
    title: '标题',
    showBackground: true,
    alignWithLabel: true,
    isBroadwise: false,
    legend: true,
    isStack: false,
    markPoint: true,
    markLine: true,
});
const setEcharts = () => {
    nextTick(() => {
        (bar as any).value.reset()

    })
}


</script>

<style lang="scss" scoped>
.bar-chart {
    width: 100%;
    height: 100%;
    display: flex;
    box-sizing: border-box;

    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: flex-start;

    .left {
        width: 200px;
        height: 100%;
        border-right: 1px solid var(--border-color);
        color: var(--label-color);
        padding: 0 15px;
        box-sizing: border-box;

        .title {
            font-weight: 600;
            cursor: default;
            line-height: 50px;
            height: 50px;
            width: 100%;
            display: flex;
            justify-content: space-between;
            align-items: center;
            box-sizing: border-box;
        }

        .content {
            width: 100%;
            height: calc(100% - 150px);
            box-sizing: border-box;

            .left-item {
                width: 100%;
                margin: 10px 0;
                height: 60px;
                box-sizing: border-box;

                .item-title {
                    height: 24px;
                    font-weight: 500;
                    line-height: 24px;
                    font-size: 16px;
                }

                .item-content {
                    margin-top: 5px;
                }
            }
        }
    }

    .right {
        width: calc(100% - 200px);
        height: 100%;
        padding: 0 !important;
        box-sizing: border-box;
    }
}
</style>