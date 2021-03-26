<template>
    <div class="HotSearch">
        <h1>热门搜索</h1>
        <ul>
            <li
                v-for="(v, i) in hotSearchData"
                :key="i"
                @click="$emit('keyWords', hotSearchData[i].searchWord)"
                >{{ hotSearchData[i].searchWord }}
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    name: 'HotSearch',
    props: ['hotSearchData', 'keywords'],
    methods: {
    }
}
</script>

<style lang="less" scoped>
.HotSearch {
    color: #fff;
    border-bottom: 1px solid #fff;
    padding: 10px;
    h1 {
        text-align: left;
        margin-left: 10px;
        margin-bottom: 5px;
    }
    ul {
        padding-bottom: 5px;
        text-align: left;
        padding: 0px 10px;
        li {
            font-size: 14px;
            display: inline-block;
            padding: 5px 10px;
            margin: 3px 5px;
            border: 1px solid #fff;
            border-radius: 30px;
        }
    }
}
</style>