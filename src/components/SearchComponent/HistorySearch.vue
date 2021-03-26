<template>
    <div class="HistorySearch">
        <div class="top">
            <h2>历史搜索</h2>
            <span @click="del"></span>
        </div>
        <ul>
            <li v-for="(v,i) in HistorySearchText" :key="i">
                {{ v }}
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    name: 'HistorySearch',
    props: ['HistorySearchText'],
    data() {
        return {
        }
    },
    methods: {
        // 删除 历史搜索
        del() {
            this.$root.playingMusic.HistorySearchTexts = [];
        }
    },
    watch: {
    }
}
</script>

<style lang="less" scoped>
.HistorySearch {
    color: #fff;
    padding: 20px 10px;

    .top {
        display: flex;
        justify-content: space-between;
        h2 {

        }
        span {
            width: 20px;
            height: 20px;
            display: inline-block;
            background: url(../../assets/垃圾桶.png) no-repeat;
            background-size: contain;
        }
    }
    ul {
        display: flex;
        li {
            margin: 5px;
            padding: 5px 7px;
            line-height: 28px;
            border-radius: 28px;
            border: 1px solid #fff;
        }
    }
}
</style>