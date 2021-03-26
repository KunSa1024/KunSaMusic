<template>
    <div class="Main">
    <!-- 导航栏 -->
    <TopNav></TopNav>

    <!-- 二级路由 -->
    <div>
        <router-view></router-view>
    </div>

    <!--播放器-->
    <PagePlayer :musicID="$root.playingMusic.musicID"></PagePlayer>

    </div>
</template>

<script>
import TopNav from '../components/TopNav.vue'
import PagePlayer from '../components/PagePlayer.vue'

    export default {
        name: 'Main',
        components: {
            TopNav, // 导航栏
            PagePlayer,  // 底部播放器
        },
    }
</script>

<style lang="less" scoped>

</style>