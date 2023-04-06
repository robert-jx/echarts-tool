<template>
    <section class="line-chart">
        <section class="left">
            <section class="title">配置项</section>
            <section class="content"></section>
        </section>
        <section ref="rightView" class="right">
            <base-line ref="line" :id="'lineChart'" :width="rightWidth" :height="rightHeight"></base-line>
        </section>
    </section>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import baseLine from '@/components/echarts/base-line/index.vue'
const rightView = ref<HTMLElement>()
const line = ref(null)

const rightWidth = ref('0px')
const rightHeight = ref('0px')
onMounted(() => {
    rightWidth.value = rightView.value?.clientWidth + 'px'
    rightHeight.value = rightView.value?.clientHeight + 'px'
})

</script>

<style lang="scss" scoped>
.line-chart {
    width: 100%;
    height: 100%;
    display: flex;
    padding: 15px;
    box-sizing: border-box;

    .left {
        width: 200px;
        height: 100%;
        border-right: 1px solid var(--border-color);
        color: var(--label-color);

        .title {
            font-weight: 600;
            cursor: default;
            line-height: 20px;
        }
    }

    .right {
        width: calc(100% - 200px);
        height: 100%;
    }
}
</style>