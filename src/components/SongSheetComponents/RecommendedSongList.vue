<template>
    <div class="RecommendedSongList">
        <ul>
            <li v-for="(v, i) in RecommendedSongListData" :key="i" @click="goSongList(v.id)">
                <img :src="v.picUrl" alt="">
                <h3>{{ v.name }}</h3>
                <div class="num one-text">
                    <i></i>
                    {{ v.playCount|playData }}
                </div>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    props: {
        RecommendedSongListData: {
            type:Array
        }
        
    },
    filters: {
        playData(value) {
            return (value/10000).toFixed(1)+'万';
        }
    },
    methods: {
        goSongList(pid) {
            this.$router.push({name: 'SongListDetails', params: {pid}})
        }
    }
}
</script>

<style lang="less" scoped>
.RecommendedSongList {

    ul {
        flex-wrap: wrap;
        /* justify-content: space-around; */
        display: flex;
        margin-top: 20px;
        color: #fff;
        font-size: 12px;
        text-align: left;
        
        li {
            width: 33%;
            height: 33%;
            padding: 0px 5px;
            margin-bottom: 15px;
            position: relative;
            img {
                min-width: 100%;
                width: 100%;
            }
            h3 {
                padding: 0px 5px;
                overflow: hidden;
                text-overflow: ellipsis;
                display: -webkit-box;
                -webkit-line-clamp: 2;
                -webkit-box-orient: vertical;
            }
            .num {
                display: inline-block;
                font-size: 10px;
                background-color: rgba(0, 0, 0, 0.7);
                padding: 0px 2px;
                position: absolute;
                top: 5px;
                right: 5px;
                i {
                    width: 10px;
                    height: 10px;
                    display: inline-block;
                    background: url(../../assets/播放.png);
                    background-size: cover;
                }
            }
        }
    }
}

</style>