<template>
    <div class="ranking">
        <div class="top">
            <ul>
                <li @click="throttle=0" :class="{gl : throttle==0}">
                    <a href="">官方</a>
                </li>
                <li @click="throttle=1" :class="{gl : throttle==1}">
                    <a href="">精选</a>
                </li>
                <li @click="throttle=2" :class="{gl : throttle==2}">
                    <a href="">曲风</a>
                </li>
                <li @click="throttle=3" :class="{gl : throttle==3}">
                    <a href="">全球</a>
                </li>
                <li @click="throttle=4" :class="{gl : throttle==4}">
                    <a href="">MV</a>
                </li>
                <li @click="throttle=5" :class="{gl : throttle==5}">
                    <a href="">特色</a>
                </li>
            </ul>
        </div>
        <div class="button">
            <OfficialList :OfficialListData="OfficialListData"></OfficialList>
            <SelectList :RankingListData="RankingListData"></SelectList>
        </div>
    </div>
</template>

<script>
import OfficialList from '../components/RankingComponents/OfficialList';
import SelectList from '../components/RankingComponents/SelectList';

export default {
    name: 'Ranking',
    components: {
        OfficialList,   // 热歌榜
        SelectList, // 精选榜
    },
    data() {
        return {
            throttle: 0,    // 导航栏下标
            OfficialListData: {
                "官方榜":[]
                },   // 官方排行榜数据
            RankingListData: {
                "精选榜":[],
                "曲风榜":[],
                "全球榜":[],
                "特色榜":[]
            },   // 排行榜数据
        }
    },
    beforeRouteEnter(to, from, next) {
        next(vm => {
            // 设置好每个榜单所在的位置
            var listId = [
                [0,1,2,3],  // 官方榜
                [8,4,28],   // 精选榜
                [7,9,5,26,29,11,6,27],  // 曲风榜
                [13,12,16,17,20,19,18,25,10],   // 全球榜
                [24,15,14]  // 特色榜
                ];
            vm.$http.get('/toplist/detail').then(data => {
                // console.log(data.data.list);
                // 遍历 设置好的榜单的位置 并查找出来
                for (let k in listId) {
                    for (let i in listId[k]) {
                        // 把对应的榜单数据 存储到榜单数据
                        if (k == 0) {
                            vm.OfficialListData['官方榜'].push(data.data.list[listId[k][i]])
                        } else if (k == 1) {
                            vm.RankingListData['精选榜'].push(data.data.list[listId[k][i]])
                        } else if (k == 2) {
                            vm.RankingListData['曲风榜'].push(data.data.list[listId[k][i]])
                        } else if (k == 3) {
                            vm.RankingListData['全球榜'].push(data.data.list[listId[k][i]])
                        } else if (k == 4) {
                            vm.RankingListData['特色榜'].push(data.data.list[listId[k][i]])
                        }
                    }
                }
                console.log(vm.RankingListData)
            })
        })
    }
}
</script>

<style lang="less" scoped>
.ranking {

    .top {

        ul {
            display: flex;
            justify-content: space-around;
            padding: 10px 0px;
            li {

                &.gl {
                    border-bottom: 2px solid #ffffff7d;
                }
                a {
                    color: #fff;
                    text-decoration: none;
                }
            }
        }
    }
}
</style>