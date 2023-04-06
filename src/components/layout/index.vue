<template>
    <section class="layout">
        <section class="navbar">
            <navbar></navbar>
        </section>
        <section class="content">
            <transition appear name="animate__animated animate__bounce"
                enter-active-class="animate__animated animate__fadeInLeft"
                leave-active-class="animate__animated animate__fadeOutLeft">
                <section class="left animated" v-if="isSideBar">
                    <sidebar></sidebar>
                </section>
            </transition>

            <section class="right" :style="{ 'width': sideBarClass }">
                <router-view></router-view>
            </section>
        </section>
    </section>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import navbar from './header.vue'
import sidebar from './sidebar.vue'
// 导入 useStore 函数
import { useStore } from 'vuex'
const store = useStore()
let isSideBar = computed({
    get() {
        return store.state.isSideBar
    },
    set(val) {
        console.log(val);
    }
});
let sideBarClass = computed({
    get() {
        return store.state.isSideBar ? 'calc(100% - 60px)' : '100%'
    },
    set(val) {
        console.log(val)
    }
})
</script>

<style lang="scss" scoped>
.layout {
    width: 100%;
    height: 100%;

    .navbar {
        width: 100%;
        height: 60px;
    }

    .content {
        width: 100%;
        height: calc(100% - 60px);
        display: flex;

        .left {
            width: 200px;
            height: 100%;
            border-right: 1px solid var(--border-color);
        }

        .right {
            height: 100%;
        }
    }
}
</style>