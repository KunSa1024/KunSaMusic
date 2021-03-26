<template>
    <div class="OfficialList">
        <ul>
            <h1>官方榜</h1>
            <li v-for="(vs,i) in OfficialListData['官方榜']" :key="i">
                <div class="top">
                    <i>{{ vs.updateFrequency }}</i>
                </div>
                <div class="button">
                    <img :src="vs.coverImgUrl" alt="">
                    <div class="listBox">
                        <div class="list" v-for="(vss,is) in vs.tracks" :key="is">
                            <h2>{{ is+1 }}.{{ vss.first }} <p> - {{ vss.second }}</p></h2>
                        </div>
                    </div>
                </div>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    name: 'OfficialList',
    props: ['OfficialListData'],
    data() {
        return {
            itemImg: []
        }
    }
}
</script>

<style lang="less" scoped>
.OfficialList {

    ul {

        h1 {
            color: #fff;
            text-align: left;
            margin-left: 25px;
            font-size: 25px;
        }
        li {
            height: 10.5rem;
            background-color: rgba(236, 238, 240, 0.301);
            margin: 10px 10px;
            padding: 5px;
            border-radius: 0.5rem;
            overflow: hidden;
            .top {
                text-align: right;
                i {
                    color: #b3bcbb;
                    font-style: normal;
                    font-size: 14px;
                }
            }
            .button {
                display: flex;
                img {
                    width: 33%;
                }
                .listBox {
                    width: 65%;
                    .list {
                        text-align: left;
                        margin: 15px 10px;
                        white-space:nowrap;
                        overflow:hidden;
                        text-overflow:ellipsis;
                        h2 {
                            display: inline-block;
                            color: #333;
                            p {
                                display: inline-block;
                                color: #92878b;
                            }
                        }
                    }
                }
            }
        }
    }
}
</style>