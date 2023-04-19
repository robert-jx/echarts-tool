<template>
    <section class="dashboard">
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
                    <section class="item-title">副标题</section>
                    <section class="item-content">
                        <el-input v-model="data.subtext"></el-input>
                    </section>
                </section>

                <section class="left-item">
                    <section class="item-title">是否开启数字动画</section>
                    <section class="item-content">
                        <el-switch v-model="data.valueAnimation" />
                    </section>
                </section>

            </section>
        </section>
        <section ref="rightView" class="right">
            <dashboard ref="pie" :id="'dashboard'" :title="data.title" :subtext="data.subtext" :width="rightWidth"
                :height="rightHeight" :legend="data.legend" :valueAnimation="data.valueAnimation"></dashboard>
        </section>
    </section>
</template>

<script setup lang="ts">
import { ref, onMounted, reactive, watch, nextTick } from 'vue';
import dashboard from '@/components/echarts/dashboard/index.vue'
// 配置项内容
export interface dataProps {
    title?: string,
    subtext?: string,
    legend?: boolean,
    valueAnimation?: boolean,
}

const rightView = ref<HTMLElement>()
const pie = ref(null)

const rightWidth = ref('0px')
const rightHeight = ref('0px')
onMounted(() => {
    console.log('rightView', rightView.value);

    rightWidth.value = rightView.value?.offsetWidth + 'px'
    rightHeight.value = rightView.value?.offsetHeight + 'px'
})

let data: dataProps = reactive({
    title: '标题',
    subtext: '副标题',
    legend: true,
    valueAnimation: false
});
const setEcharts = () => {
    nextTick(() => {
        (pie as any).value.reset()

    })
}


</script>

<style lang="scss" scoped>
.dashboard {
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