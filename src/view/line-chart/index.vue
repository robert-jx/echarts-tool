<template>
    <section class="line-chart">
        <section class="left">123</section>
        <section class="right">
            <base-line :id="'lineChart'"></base-line>
        </section>
    </section>
</template>

<script setup lang="ts">
import baseLine from '@/components/echarts/base-line/index.vue'
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
    }

    .right {
        width: calc(100% - 200px);
        height: 100%;
    }
}
</style>