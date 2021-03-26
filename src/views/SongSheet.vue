<template>
    <div class="songsheet">
        <div class="all">
            <h1>全部</h1>
            <div class="SelectCategories" @click="isShow=!isShow">
                选择分类 <i class="fa fa-chevron-down"></i>
            </div>
            <Classification class="class" v-show="isShow" :classificationData="classificationData"></Classification>
            <span class="hot">热门</span>
        </div>
        <RecommendedSongList :RecommendedSongListData="RecommendedSongListData"></RecommendedSongList>
    </div>
</template>

<script>
import Classification from '../components/SongSheetComponents/Classification'
import RecommendedSongList from '../components/SongSheetComponents/RecommendedSongList'

export default {
    name: 'SongSheet',
    components: {
        Classification, // 选择分类
        RecommendedSongList,    // 推荐歌单
    },
    data() {
        return {
            isShow: false,
            classificationData: {
                main:null,
                sub:null
            },
            RecommendedSongListData: []
        }
    },
    beforeRouteEnter(to, from, next) {
        next(vm => {
            // 分类
            var mainClass = new Array();
            var subClass = {
                "0":[],
                "1":[],
                "2":[],
                "3":[],
                "4":[],
            };
            vm.$http.get('/playlist/catlist').then(data => {
                mainClass = data.data.categories;
                for (let v in data.data.sub) {
                    if (data.data.sub[v].category == 0) {
                        // console.log(data.data.sub[v].name)
                        subClass[0].push(data.data.sub[v].name)
                    } else if (data.data.sub[v].category == 1) {
                        subClass[1].push(data.data.sub[v].name)
                    } else if (data.data.sub[v].category == 2) {
                        subClass[2].push(data.data.sub[v].name)
                    } else if (data.data.sub[v].category == 3) {
                        subClass[3].push(data.data.sub[v].name)
                    } else if (data.data.sub[v].category == 4) {
                        subClass[4].push(data.data.sub[v].name)
                    }
                }
                // console.log(mainClass)
                // console.log(subClass)

                vm.classificationData.main = mainClass
                vm.classificationData.sub = subClass
                // console.log(vm.classificationData)
            });
            // 推荐歌单
            vm.$http.get('/personalized').then(data => {
                // console.log(data.data.result);
                vm.RecommendedSongListData = data.data.result;
            })
        })
    }
}
</script>

<style lang="less" scoped>
.songsheet {

    .all {
        display: flex;
        padding: 20px 0px;
        color: #fff;
        position: relative;
        margin: 0px 5px;
        border-bottom: 3px solid #dcdcdc;
        h1 {
            font-size: 20px;
        }
        div.SelectCategories {
            padding: 5px 7px;
            border: 1px solid #dcdcdc;
            border-radius: 3px;
            margin-left: 20px;
            font-size: 12px;
            i {
                display: inline-block;
                
            }
        }
        .class {
            z-index: 100;
        }
        span {
            padding: 5px;
            background-color: rgba(247, 247, 247, 0.4);
            border-radius: 4px;
            position: absolute;
            right: 0px;
            font-size: 12px;
        }
    }
}
</style>