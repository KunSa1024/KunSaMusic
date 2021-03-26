<template>
    <li class="SongList" :key="item.id" @click="playMusic">
        <div class="left">
            <h2>{{ item.name }}</h2>
            <p>
                <i v-if="item.song.privilege.maxbr>320000">sq</i>
                {{ item.song.artists[0].name }} - {{ item.albumName }}
            </p>
        </div>
        <div class="right">
            <span></span>
        </div>
    </li>
</template>

<script>
export default {
    name: 'SongList',
    props: {
        item: Object,

    },
    methods: {
        playMusic() {
            this.$root.playingMusic.musicID = this.item.id;
        }
    },
    filters: {
        formatNum(val) {
            return val < 10 ? '0' + val : val;
        }
    }
}
</script>

<style lang="less" scoped>
.SongList {
    text-align: left;
    padding: 5px 0px;
    margin-left: 5px;
    border-bottom: 1px solid #dcdcdc;
    display: flex;
    .left {

        h2 {
            font-size: 18px;
        }
        p {
            font-size: 12px;
            i {
                display: inline-block;
            }
        }
    }
    .right {

        span {
            display: inline-block;
        }
    }
}
</style>