<template>
    <div class="SongListDetails">
        <div class="introduce">
            <!-- 顶部 -->
            <div class="SongList-Top-Box">
                <div class="Top-Box-left">
                    <div class="return" @click="returns">
                        <img class="auto-img" src="../assets/返回.png" alt="">
                    </div>
                    <div class="top-text">歌单</div>
                </div>
                <div class="Top-Box-right">
                    <div class="search">
                        <img class="auto-img" src="../assets/搜索.png" alt="">
                    </div>
                    <div class="details">
                        <img class="auto-img" src="../assets/详情.png" alt="">
                    </div>
                </div>
            </div>

            <!-- 内容 -->
            <div class="Introduction-Box">
                <div class="Introduction-left">
                    <div class="img-box">
                        <img class="auto-img" :src="songData.coverImgUrl" alt="">
                        <div class="Play-volume-box">
                            <div class="Play-volume-img">
                                <img class="auto-img" src="../assets/播放.png" alt="">
                            </div>
                            <div class="Play-volume-text">
                                10万
                            </div>
                        </div>
                    </div>
                </div>
                <div class="Introduction-right">
                    <div class="Introduction-title">
                        {{ songData.name }}
                    </div>
                    <div class="author">
                        <div class="head-portrait">
                            <img class="auto-img" :src="songData.zztx" alt="">
                        </div>
                        <div class="name">
                            {{ songData.zzname }}
                        </div>
                    </div>
                    <div class="text one-text">
                        {{ songData.description }}
                    </div>
                </div>
            </div>


        </div>

        <!-- 歌曲 -->
        <div class="Song-list">
            <ul>
                <li v-for="(v, i) in song" :key="i" @click="playMusic(v.id)">
                    <div class="num">
                        {{ i+1 }}
                    </div>
                    <div class="Song-box">
                        <div class="Song">
                            <div class="Song-title">
                                {{ v.name }}
                            </div>
                            <div class="author one-text">
                                {{ v.ar[0].name }} - {{ v.al.name }}
                            </div>
                        </div>
                        <div class="song-details">
                            <img class="auto-img" src="../assets/详情 (1).png" alt="">
                        </div>
                    </div>
                </li>
            </ul>
        </div>

        <PagePlayer :musicID="songId"></PagePlayer>
    </div>
</template>

<script>
import PagePlayer from '../components/PagePlayer'

    export default {
        name: 'SongListDetails',
        components: {
            PagePlayer
        },
        data () {
            return {
                // 表单id
                pid: '',
                // 表单数据
                songData: {},
                // 歌曲数据
                song: [],
                // 点击歌曲id
                songId: '',
            }
        },
        created () {
            this.pid = this.$route.params.pid;
            // console.log(this.pid);
            this.songListData(this.pid);
        },
        methods: {
            // 获取歌单数据
            songListData(pid) {
                this.$http('/playlist/detail?id=' + pid).then(data => {
                    // console.log(data.data.playlist);
                    this.songData = data.data.playlist;
                    this.songData.zztx = data.data.playlist.creator.avatarUrl;
                    this.songData.zzname = data.data.playlist.creator.nickname;

                    // console.log(data.data.playlist.trackIds);
                    // 遍历 歌曲id 然后用id查找歌曲详情
                    for(let key in data.data.playlist.trackIds) {
                        // console.log(data.data.playlist.trackIds[key].id);

                        this.$http('/song/detail?ids=' + data.data.playlist.trackIds[key].id).then(data => {
                            // console.log(data.data.songs[0]);
                            this.song.push(data.data.songs[0]);
                        })
                    }
                    // console.log(this.song);
                })
            },

            // 播放音乐
            playMusic(id) {
                // console.log(id);
                this.songId = id;
            },

            // 返回上一个页面
            returns() {
                this.$router.push('/songsheet')
            }
        }
    }
</script>

<style lang="less" scoped>
.SongListDetails {
    .introduce {
        background-color: #253042;
        // 顶部
        .SongList-Top-Box {
            display: flex;
            justify-content: space-between;
            height: 3.125rem;
            padding: .3125rem .625rem;
            .Top-Box-left {
                display: flex;
                flex-direction: inherit;
                line-height: 2.5rem;
                .return {
                    width: 1.875rem;
                    height: 1.875rem;
                    margin: auto 0;
                }
                .top-text {
                    display: inline-block;
                    font-size: 18px;
                    color: #fff;
                    margin-left: 1.25rem;
                    
                }
            }
            .Top-Box-right {
                display: flex;
                flex-direction: inherit;
                .search {
                    width: 1.875rem;
                    height: 1.875rem;
                    margin: auto 1.25rem;
                }
                .details {
                    width: 1.875rem;
                    height: 1.875rem;
                    margin: auto 0;
                }
            }
        }

        // 介绍内容
        .Introduction-Box {
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            margin: 1.25rem .625rem 0rem .625rem;
            padding-bottom: 1.875rem;
            .Introduction-left {

                .img-box {
                    position: relative;
                    width: 6.25rem;
                    height: 6.25rem;;
                    border-radius: .625rem;
                    overflow: hidden;
                    .Play-volume-box {
                        position: absolute;
                        top: .3125rem;
                        right: .3125rem;
                        background-color: rgba(0, 0, 0, 0.308);
                        display: flex;
                        padding: .3125rem;
                        border-radius: 1.625rem;
                        .Play-volume-img {
                            width: .625rem;
                            margin: auto 0px;
                        }
                        .Play-volume-text {
                            display: inline-block;
                            font-size: .5rem;
                            color: rgb(218, 214, 214);
                        }
                    }
                }
            }

            .Introduction-right {
                margin: 0px .9375rem;
                width: 14.7rem;
                .Introduction-title {
                    display: inline-block;
                    color: #fff;
                    text-align: left;
                }

                .author {
                    display: flex;
                    margin-top: .625rem;
                    .head-portrait {
                        width: 1.25rem;
                        height: 1.25rem;
                        border-radius: 100%;
                        overflow: hidden;
                    }
                    .name {
                        color:#979799;
                        font-size: .75rem;
                        padding-left: .3125rem;
                        margin: auto 0px;
                    }
                }
                .text {
                    font-size: .75rem;
                    color: #979799;
                    margin-top: .625rem;
                }
            }
        }

    }

    // 歌曲
    .Song-list {
        background-color: #fff;
        ul {

            li {
                display: flex;
                // background-color: pink;
                .num {
                    font-size: 18px;
                    padding: .9375rem;
                    color:#999999;
                }
                .Song-box {
                    width: 100%;
                    display: flex;
                    justify-content: space-between;
                    margin: auto 0px;
                    .Song {
                        width: 15.625rem;
                        .Song-title {
                            font-size: 1rem;
                            color: #333333;
                            text-align: left;
                        }
                        .author {
                            font-size: .75rem;
                            color:#808080;
                            text-align: left;
                        }
                    }
                    .song-details {
                        width: 1.25rem;
                        height: 1.25rem;
                        margin: auto .9375rem;
                    }
                }
            }
        }
    }

}
</style>