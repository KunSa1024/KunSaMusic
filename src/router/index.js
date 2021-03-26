import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

// 二级路由
const MainRouets = [{ // 登录
    path: '/user',
    name: 'User',
    component: () =>
        import ('../views/User.vue')
}, { // 搜索
    path: '/search',
    name: 'Search',
    component: () =>
        import ('../views/Search.vue')
}, { // 热门
    path: '/',
    name: 'Hot',
    component: () =>
        import ('../views/Hot.vue')
}, { // 歌单
    path: '/songsheet',
    name: 'SongSheet',
    component: () =>
        import ('../views/SongSheet.vue')
}, { // 排行榜
    path: '/Ranking',
    name: 'Ranking',
    component: () =>
        import ('../views/Ranking.vue')
}]

// 一级路由
const routes = [{
        path: '/',
        name: 'Main',
        component: () =>
            import ('../views/Main.vue'),
        // 二级路由
        children: MainRouets
    }, { // 播放页面
        path: '/playInterface',
        name: 'PlayInterface',
        component: () =>
            import ('../views/PlayInterface.vue')
    }, { // 表单详情
        path: '/songListDetails/:pid',
        name: 'SongListDetails',
        component: () =>
            import ('../views/SongListDetails.vue')
    }

]

const router = new VueRouter({
    mode: 'hash',
    base: process.env.BASE_URL,
    routes
})

export default router