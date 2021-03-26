<template>
    <div class="SelectList">
        <!-- <div class="list" v-for="(v, i, k) in RankingListData" :key="i">
            <h1>{{ i }}</h1>
            <p>{{ v }}</p>
            <i>{{ k }}</i>
            <ul>
                <li v-for="(vs, is) in v" :key="is">
                    <div class="img">
                        <img :src="vs.coverImgUrl" alt="">
                        <samp>{{ vs.updateFrequency }}</samp>
                    </div>
                    <h2>{{ vs.name }}</h2>
                </li>
            </ul>
        </div> -->
    </div>
</template>

<script>
export default {
    name: 'SelectList',
    props: ['RankingListData'],
    

}
</script>

<style lang="less" scoped>
.list {
    background-color: rgb(236, 238, 240);
    padding: 20px 10px;
    text-align: left;
    border-radius: 10px;
    margin-top: 10px;
    h1 {
        font-size: 24px;
        color: rgb(15, 15, 15);
        font-weight: 600;
    }
    ul {
        display: flex;
        flex-wrap: wrap;
        margin-top: 10px;
        li {
            width: 30%;
            margin: 10px 5px;
            position: relative;

            &::after {
                content: '';
                display: inline-block;
                width: 4.375rem;
                border-top: 5px solid #e9e9e9;
                border-radius: 5px 5px 0px 0px;
                position: absolute;
                top: -5px;
                left: calc(50% - 4.375rem / 2);
            }
            .img {
                width: 100%;
                overflow: hidden;
                position: relative;
                img {
                    width: 100%;
                    border-radius: 0.875rem;
                    font-size: 0px;
                }
                samp {
                    display: inline-block;
                    background-color: rgba(0, 0, 0, 0.52);
                    color: rgb(233, 230, 230);
                    font-size: 12px;
                    padding: 2px 4px;
                    border-radius: 1.25rem;
                    position: absolute;
                    top: 5px;
                    right: 5px;
                }
            }
            h2 {
                color: rgb(15, 15, 15);
            }
        }
    }
}
</style>