<template>
    <div class="popularRecommendation">
        <ul>
            <li v-for="(v, i) in hotData" :key="i" @click="playMusic(v.id)">
                <img :src="v.picUrl" alt="">
                <p class="one-text">{{ v.name }}</p>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    name: 'PopularRecommendation',
    props: {
        hotData: {
            type: Array,
        }
    },
    methods:{
        // 获取点击歌曲 传给播放器
        playMusic(valie){
        //   console.log(valie)
          this.$root.playingMusic.musicID = valie;
        }
    }
}
</script>

<style lang="less" scoped>
.popularRecommendation {

    ul {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-around;
        li {
            width: 50%;
            height: 33%;
            margin: 15px 0px;
            padding: 0px 10px;
            img {
                max-width: 100%;
            }
            p {
                color: #fff;
            }
        }
    }
}
</style>