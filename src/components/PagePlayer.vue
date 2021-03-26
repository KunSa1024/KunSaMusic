<template>
    <div class="PagePlayer" ref="box" >
        <audio @timeupdate="pageTiem" ref="audio" autoplay :src="`https://music.163.com/song/media/outer/url?id=${musicData.id}.mp3`"></audio>
        <router-link tag="div" :to="{path:'/playInterface',query:{id:musicID}}">
            <div class="content" @click="hide()">
                <h2>{{ musicData.SongTitle }}</h2>
                <i>{{ musicData.name }}</i>
            </div>
        </router-link>
        <div class="GreatCircle" @click="PlayPause(item)">
            <div class="SmallCircle">
                <img :src="musicData.url" alt="">
            </div>
            <div class="img">
                <span ref="img" v-bind:class="item==true?'icon-pause':'icon-play'"></span>
            </div>
        </div>
        <div class="function">
            <span class="Collection"></span>
            <span class="switch"></span>
        </div>
    </div>
</template>

<script>
export default {
    name:'PagePlayer',
    props:['musicID'],
    data() {
        return {
            item: true,    // false播放    true暂停
            musicData: {
                id:'',
                SongTitle: '',
                name: '',
                url: '',
            },
            time: '',
            timeNum: 0,
        }
    },
    methods: {
        // 点击 播放/暂停 事件
        PlayPause(value) {
            // console.log(this.$refs.img)
            // console.log(value)
            if (value) {
                this.$refs.audio.play();
                this.item = false;
            } else {
                this.$refs.audio.pause();
                this.item = true;

                if (this.item) {
                    this.timeNum = 0;
                    this.time = setInterval(() => {
                        this.timeNum++;
                        console.log(this.timeNum);
                        if (this.timeNum >= 10) {
                            this.timeNum = 0;
                            clearInterval(this.time);
                            this.$refs.box.style.bottom = '-93px';
                            // this.$nextTick(() => {
                            //     console.log(this);
                            // })
                        }
                    },1000)
                } else {
                    this.timeNum = 0;
                    clearInterval(this.time);
                }
            }
        },
        // 监听音乐有没有播放完 播放完就显示 暂停图标
        pageTiem() {
            // console.log(value)
            // console.log('当前时间 => ', this.$refs.audio.currentTime)
            // console.log('总时间 => ', this.$refs.audio.duration)
            let currentTime = this.$refs.audio.currentTime;
            let TotalTime = this.$refs.audio.duration;
            if (currentTime >= TotalTime) {
                console.log('播放完')
                this.item = true;
            }
        },
        // 点击 歌名 隐藏底部播放器
        hide() {
            this.$refs.audio.pause();
            this.item = true;
            this.$refs.box.style.bottom = '-93px';
        }
    },
    watch: {
        // 获取到点击歌的ID 用ID查找歌曲信息
        musicID(value) {
            // console.log(value)
            if (value != null) {
                this.$http('/song/detail?ids='+value).then(data => {
                    // console.log(data.data.songs)
                    if (data != 'nudefined') {
                        // console.log('有数据')
                        this.musicData.id = data.data.songs[0].id;
                        this.musicData.SongTitle = data.data.songs[0].name;
                        this.musicData.name = data.data.songs[0].ar[0].name;
                        this.musicData.url = data.data.songs[0].al.picUrl;
                        this.item = false;
                        this.$refs.box.style.bottom = '0px';
                    }
                    // console.log(this.musicData)
                })
            }
        },
        // 暂停播放 10秒 隐藏播放器
        // item: function(newValue) {
            // if (newValue) {
            //     this.timeNum = 0;
            //     this.time = setInterval(() => {
            //         this.timeNum++;
            //         if (this.timeNum >= 10) {
            //             console.log(this.timeNum);
            //             this.$refs.box.style.bottom = '-93px';
            //             this.$nextTick(() => {
            //                 console.log(this);
            //             })
            //             this.timeNum = 0;
            //             clearInterval(this.time);
            //         }
            //     },1000)
            // } else {
            //     this.timeNum = 0;
            //     clearInterval(this.time);
            // }
        // },
    },
    computed: {

    }
}
</script>

<style lang="less" scoped>

.icon-play {
    background-image: url(../assets/暂停.png);
    background-size: contain;
    z-index: 100;
    width: 20px;
    height: 20px;
    display: inline-block;
}
.icon-pause {
    background-image: url(../assets/播放.png);
    background-size: contain;
    z-index: 100;
    width: 20px;
    height: 20px;
    display: inline-block;
}

.PagePlayer {
    width: 100%;
    background-color: #0000009c;
    position: fixed;
    bottom: -93px;
    display: flex;
    padding: 10px 5px;
    justify-content: space-between;
    color: #fff;
    transition: bottom 0.5s linear;
    audio {
        height: 30px;
        position: absolute;
        top: -50px;
    }
    .content {
        text-align: left;
        flex: 7;
        h2 {
            height: 24px;
            font-size: 18px;
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
        }
        i {
            font-size: 12px;
        }
    }
    .GreatCircle {
        width: 80px;
        height: 80px;
        background-color: #a1a2a28f;
        border-radius: 100%;
        padding: 5px;
        position: absolute;
        top: -50%;
        left: calc(50% - 40px);
        .SmallCircle {
            width: 70px;
            height: 70px;
            border-radius: 100%;
            overflow: hidden;
            border: 2px solid #fff;
            img {
                width: 100%;
                height: 100%;
            }
        }
        .img {
            background: rgba(0, 0, 0, 0.5);
            padding: 5px;
            border-radius: 100%;
            position: absolute;
            top: calc(50% - 15px);
            left: calc(50% - 15px);
            font-size: 0px;
            .page {
                display: inline-block;
                background: url(../assets/播放.png);
                width: 20px;
                height: 20px;
                background-size: contain;
            }
        }
    }
    .function {
        flex: 3;
        display: flex;
        justify-content: flex-end;
        .Collection {
            background: url(../assets/未收藏.png);
            width: 30px;
            height: 30px;
            display: inline-block;
            background-size: contain;
            margin: auto 5px;
        }
        .switch {
            background: url(../assets/切换.png);
            width: 30px;
            height: 30px;
            display: inline-block;
            background-size: contain;
            margin: auto 10px;
        }
    }
}
</style>