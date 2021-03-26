<template>
    <div class="Searchs">
        <div class="top">
            <!--搜索框-->
            <div class="SearchBox">
                <div class="return" @click="returns()"></div>
                <div class="inputBox">
                    <span></span>
                    <form @submit.stop.prevent="searchList(keywords)">
                        <input type="text" placeholder="输入歌手,歌曲" v-model="keywords">
                    </form>
                </div>
                <div class="search" @click="searchList">搜索</div>
            </div>
        </div>
        <!--提示列表-->
        <SearchList v-show="showSearch" :keywords="keywords" :suggests="suggests" @SearchSongResults="searchList"></SearchList>
        <!--热门搜索-->
        <HotSearch v-show="showHot" :hotSearchData="hotSearchData" @keyWords="keyWordsHot"></HotSearch>
        <!--搜索结果-->
        <SearchSongResults v-show="showList" :searchMusicList="searchMusicList"></SearchSongResults>
        <!--历史搜索-->
        <HistorySearch :HistorySearchText="$root.playingMusic.HistorySearchTexts"></HistorySearch>
    </div>
</template>

<script>
import SearchList from '../components/SearchComponent/SearchList'
import SearchSongResults from '../components/SearchComponent/SearchSongResults'
import HotSearch from '../components/SearchComponent/HotSearch'
import HistorySearch from '../components/SearchComponent/HistorySearch'

export default {
    name:'Search',
    components: {
        SearchList, // 提示列表
        SearchSongResults,  // 搜索到的结果
        HotSearch,  // 热门搜索
        HistorySearch,  // 历史搜索
    },
    data() {
        return {
            keywords: '',   // 输入的字
            searchMusicList: [],    // 根据输入的字搜索到的结果
            suggests: [],   // 输入字提示的关键字 (歌名,作者,专辑)
            showList: false,    // 是否显示 搜索结果
            showSearch: false,  // 是否显示 搜索提示
            hotSearchData: [],  // 热门搜索
            showHot: true, // 是否显示 热门搜索
        }
    },
    methods: {
        // 搜索结果
        searchList(keywords) {
            // keywords => 搜索歌曲的关键字

            this.showList = false;  // 隐藏 搜索结果
            this.showSearch = false;    // 隐藏 搜索提示
            this.showHot = false;    // 隐藏 热门搜索
            // console.log(keywords)
            this.$http.get('/search?keywords='+keywords).then(data => {
                // console.log(data.data.result.songs)
                if (data.data.code == 200) {
                    this.showList = true;   // 显示 搜索结果
                    this.searchMusicList = data.data.result.songs.map(datas => {
                        return {
                            name: datas.name,
                            albumName: datas.album.name,
                            id: datas.id,
                            song: {
                                artists: datas.artists,
                                privilege: {
                                    maxbr: 1
                                }
                            }
                        }
                    })
                }
            })

            // 存储历史记录
            this.$root.playingMusic.HistorySearchTexts.push(keywords)
        },
        // 跳转到上一个界面
        returns() {
            this.keywords = '';
            this.$router.push('/')
        },
        // 点击热门搜索 传给搜索框
        keyWordsHot(key) {
            this.keywords = key;
        }
    },
    // 监听器
    watch: {
        // 输入的关键字 显示的相关的提示
        keywords(val) {
            // val => 你输入的字
            this.showList = false;  // 隐藏 搜索结果
            this.showHot = false;    // 隐藏 热门搜索
            this.suggests = [];
            this.$http.get('/search/suggest?keywords='+val).then(data => {
                // console.log(data)
                if (data.data.code == 200 && data.data.result.order) {
                    // 提示关键字 数据
                    let result = data.data.result;
                    let re = result.order.reduce((prev, v) => {
                        if (v != 'playlists') {
                            let rev = result[v];
                            return prev.concat(rev);
                        }
                        return prev;
                    }, []);
                    this.showSearch = true; // 显示 搜索提示
                    this.suggests = re;
                    // 判断如果搜索的字词已经全部删除为空 提示字也为空
                    if (this.keywords == '') {
                        this.suggests = [];
                    }
                }
            }).finally(() => {
                // 加载logo
                // this.searching = flase;
            })
            // 搜索框为空显示 热门搜索
            if (val == '') {
                // console.log('空')
                this.showHot = true;
            }
        }
    },
    beforeRouteEnter(to, from, next){
        next(vm => {
            // 热门搜索
            vm.$http.get('/search/hot/detail').then(data => {
                console.log(data);
                vm.hotSearchData = data.data.data;
            })
        })
    }
}
</script>

<style lang="less" scoped>
.Searchs {
    position: fixed;
    top: 0px;
    width: 100%;
    height: 100%;
    background-color: rgb(37 48 66);

    .top {
        border-bottom: 1px solid #fff;
        .SearchBox {
            display: flex;
            padding: 10px;
            justify-content: center;
            align-items: center;
            .return {
                width: 20px;
                height: 20px;
                background: url(../assets/返回.png) no-repeat;
                background-size: contain;
                flex: 1.5;
            }
            .inputBox {
                padding: 0px 30px;
                margin: 0px 15px;
                background-color: #fff6;
                border-radius: 100%;
                height: 1.875rem;
                border-radius: 1.875rem;
                position: relative;
                flex: 7;
                span {
                    display: inline-block;
                    width: 20px;
                    height: 20px;
                    background: url(../assets/搜索.png) no-repeat;
                    background-size: contain;
                    position: absolute;
                    top: 5px;
                    left: 5px;
                }
                input {
                    width: 100%;
                    height: 1.875rem;
                    border: 0px;
                    outline: none;
                    background-color: transparent;
                    color: #fff;
                    font-size: 20px;
                }
            }
            .search {
                color: #fff;
                width: 30px;
                width: 30px;
                font-size: 15px;
                margin-left: 10px;
                flex: 1.5;
            }
        }
    }
}
</style>