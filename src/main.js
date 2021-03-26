import Vue from 'vue'
import './plugins/axios'
import App from './App.vue'
import router from './router'

Vue.config.productionTip = false


let playingMusic = {
    // 存储播放音乐 ID
    musicID: 0,
    // 存储历史搜索
    HistorySearchTexts: [],
}
new Vue({
    router,
    data: {
        playingMusic
    },
    render: h => h(App)
}).$mount('#app')