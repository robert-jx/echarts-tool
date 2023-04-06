<template>
    <section class="header">
        <section class="logo">
            <img :src="Logo" alt="">
            基于echarts的二次封装
        </section>
        <section class="user">
            <section class="side-bar">

                <el-icon v-if="!isSideBar" @click="changeIsSideBar">
                    <Fold />
                </el-icon>
                <el-icon v-if="isSideBar" @click="changeIsSideBar">
                    <Expand />
                </el-icon>
            </section>
            <section class="head">
                <img :src="HeadImage" alt="">
            </section>
        </section>
    </section>
</template>

<script setup lang="ts">
import Logo from '@/assets/image/logo/logo.jpg'
import HeadImage from '@/assets/image/user/head.jpg'
// 引入图标
import { Fold, Expand } from '@element-plus/icons-vue';
import { computed } from 'vue'
// 导入 useStore 函数
import { useStore } from 'vuex'
const store = useStore()
console.log(store.state.isSideBar)

const changeIsSideBar = () => {
    store.commit('changeSideBar')
}
let isSideBar = computed({
    get() {
        return store.state.isSideBar
    },
    set(val) {
        console.log(val);
    }
});
</script>

<style lang="scss" scoped>
.header {
    width: 100%;
    height: 100%;
    line-height: 60px;
    padding: 0 25px;
    display: flex;
    justify-content: space-between;
    // border-bottom: 1px solid var(--border-color);
    box-sizing: border-box;
    background-color: var(--normal-black);
    color: var(--normal-white);

    .logo {
        // width: 120px;
        height: 100%;
        display: flex;
        align-items: center;

        img {

            width: 30px;
            height: 30px;
            border-radius: 50%;
            margin: 0 15px 0 0;
        }
    }

    .user {
        width: 200px;
        height: 100%;
        display: flex;
        align-items: center;

        .side-bar {
            cursor: pointer;
            width: 40px;
            height: 60px;
        }

        .head {
            height: 100%;

            img {
                width: 30px;
                height: 30px;
                border-radius: 50%;
                margin: 15px 0
            }
        }
    }
}
</style>