<template>
    <section class="sidebar">
        <el-menu class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" router>
            <template v-for="(item, index) in menu" :key="index">
                <el-sub-menu :index="item.path" v-if="item.children && item.children.length">
                    <template #title>
                        <span>{{ item.name }}</span>
                    </template>
                    <el-menu-item v-for="(v, ind) in item.children" :key="ind" :index="v.path">{{ v.name }}</el-menu-item>
                </el-sub-menu>
                <el-menu-item v-else :index="item.path">
                    <span>{{ item.name }}</span>
                </el-menu-item>
            </template>
        </el-menu>
    </section>
</template>

<script setup lang="ts">
import { menu } from './router'
const handleOpen = (key: string, keyPath: string[]) => {
    console.log(key, keyPath)
}
const handleClose = (key: string, keyPath: string[]) => {
    console.log(key, keyPath)
}

</script>

<style lang="scss" scoped>
.sidebar {
    width: 100%;
    height: 100%;
    background-color: var(--normal-black);
}
</style>