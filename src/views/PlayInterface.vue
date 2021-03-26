<template>
    <div class="PlayInterface" :style="{'background-image': `url(${MusicData.picUrl})`}">
        <!-- 模糊层 -->
        <div class="Fuzzy-layer"></div>

        <!-- 组件 -->
        <div class="assembly">
            <!-- 顶部 -->
            <div class="top">
                <ul>
                    <li @click="Return">
                        <img src="../assets/返回.png" alt="">
                    </li>
                    <li>
                        <h3>{{ MusicData.musicName }}</h3>
                    </li>
                    <li>
                        <img src="../assets/搜索.png" alt="">
                    </li>
                </ul>
            </div>

            <!-- 歌词 和 图片 -->
            <div class="PicturesAndLyrics">
                <Pictures :picUrl="MusicData.picUrl"></Pictures>

                <!-- 歌词 -->
                <div class="Lyrics">
                    <ul ref="ul"
                        :style="{transform: `translateY(${liH}px)`}">
                        <li v-for="(v, i) in MusicData.lyric" :key="i"
                            :class="{active:i==LyricTimeIndex}"
                            ref="li">
                            {{ v.lyric }}
                        </li>
                    </ul>
                </div>
            </div>

            <!-- 播放器 -->
            <div class="PlayBox">
                <audio ref="video" @timeupdate="timeupdate" autoplay :src="`https://music.163.com/song/media/outer/url?id=${MusicData.id}.mp3`"></audio>

                <!-- 进度条 -->
                <div class="progress-bar">
                    <!-- 时间 -->
                    <div class="time">
                        <div>{{ currentTimes }}</div>
                        <div>{{ durationTimes }}</div>
                    </div>
                    <!-- 内线 -->
                    <div class="Inside-line" ref="insideLine" @click="clickLine">
                        <!-- 外线 -->
                        <div class="outside-lines"></div>
                        <!-- 点 -->
                        <div class="spot"></div>
                    </div>
                </div>

                <!-- 控制台 -->
                <div class="console">
                    <div :class="play ? 'play' : 'suspend'" @click="switchPley">
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Pictures from '../components/PlayInterfaceComponents/Pictures'   // 图片

export default {
    name: 'PlayInterface',
    data() {
        return {
            MusicData: {
                id: '',         // id
                musicName: '',  // 歌名
                author: '',     // 作者
                picUrl: '',     // 图片
                lyric: '',      // 歌词
            },
            LyricTimeIndex: 0,  // 存储歌词下标

            // li移动距离
            liH: 125,

            // 现在时间
            currentTime: 0,
            // 现在时间
            currentTimes: '00:00',

            // 总时间
            durationTime: 0,
            // 总时间
            durationTimes: '00:00',

            // 播放
            play: true,
        }
    },
    components: {
        Pictures,   // 图片
    },
    methods: {
        // 返回上一个页面
        Return() {
            this.$router.go(-1);
        },

        // 存储歌词下标
        timeupdate(event){
            let audio = event.target;   // 获取当前元素
            // console.log(audio);
            this.currentTime = audio.currentTime; // 获取当前播放时间
            // console.log(audio.duration);
            this.durationTime = audio.duration;  // 获取歌曲总时长
            // console.log(durationTime);
            for (var i in this.MusicData.lyric) {
                // console.log(this.MusicData.lyric);
                let lrcTime = this.MusicData.lyric[i].time; // 获取歌词时间
                // console.log('lrcTime ==> ', lrcTime)
                let index = parseInt(i) + 1;    // 创建 播放前的歌词下标
                // console.log('i1 ==> ', i)
                // 判断 当前播放时间是否 大于等于 歌词时间 并且 当前播放时间 小于 下一句歌词时间
                // 才执行里面的语句
                if (this.currentTime >= lrcTime && this.currentTime < this.MusicData.lyric[index].time) {
                    this.LyricTimeIndex = i;    // 存储现在播放的对应歌词下标
                    // console.log('i2 ==> ', i)
                    break;
                }
            }

            // 获取线的宽度
            let insideLineW = this.$refs.insideLine.offsetWidth;
            // 计算出点击位置是音乐对应的播放时间
            let nowCurrentTime = this.currentTime * this.durationTime / insideLineW;
            // 计算出当前时间占总时长的百分比例 
            let percentage = nowCurrentTime / this.durationTime * 100 + '%';
            // console.log(percentage);
            // 播放进度
            this.$refs.insideLine.children[0].style.width = percentage;
            this.$refs.insideLine.children[1].style.left = `calc(${percentage} - 5px)`;

            // li移动距离
            this.playing();

            // 进度条
            this.progressBar();
        },

        // li移动距离
        playing() {
            // 遍历歌词
            for(let k in this.$refs.li) {
                // 判断有高丽亮的li
                if (this.$refs.li[k].classList.contains('active')) {
                    // 移动距离 = 高亮歌词所在距离 - li顶部外边距 - li高度一半
                    this.liH = 125 - this.$refs.li[k].offsetTop - this.$refs.li[k].offsetHeight / 2;
                    // console.log(this.$refs.li[k].offsetTop - this.$refs.li[k].offsetHeight / 2);
                }
            }
        },

        // 进度条
        progressBar() {
            // console.log(currentTime, durationTime);
            this.currentTimes = this.formatTime(this.currentTime);
            this.durationTimes = this.formatTime(this.durationTime) == "NaN:NaN" ? "00:00" : this.formatTime(this.durationTime);
        },

        // 根据秒数格式化成时分秒的函数
        formatTime(seconds) {
            // 1小时 = 3600秒
            // var h = Math.floor(seconds / 3600);
            // h = h < 10 ? "0" + h : h;

            // 1分钟 = 60秒
            var m = Math.floor(seconds / 60 % 60);
            m = m < 10 ? "0" + m : m;

            // 秒数
            var s = Math.floor(seconds % 60);
            s = s < 10 ? "0" + s : s;

            // return `${h}:${m}:${s}`;
            return `${m}:${s}`;
        },

        // 点播放对应位置
        clickLine(event) {
            // 获取线的宽度
            let insideLineW = this.$refs.insideLine.offsetWidth;
            // console.log(insideLineW);

            // 点击X轴的位置
            let LineX = event.offsetX
            
            // 计算出点击位置是音乐对应的播放时间
            let nowCurrentTime = LineX * this.durationTime / insideLineW;
            this.$refs.video.currentTime = nowCurrentTime;

            // 计算出当前时间占总时长的百分比例
            let percentage = nowCurrentTime / this.durationTime * 100 + '%';

            this.$refs.insideLine.children[0].style.width = percentage;
            this.$refs.insideLine.children[1].style.left = `calc(${percentage} - 5px)`;
        },

        // 暂停 播放
        switchPley() {
            // console.log(this.play)
            this.play =! this.play;
            if(this.play) {
                this.$refs.video.play();
            } else {
                this.$refs.video.pause();
            }
        },

        // 搜索框
        goSearchBox() {

        }
    },
    beforeRouteEnter(to, from, next) {
        next(vm => {
            // 获取 播放器 传送过来的 id
            // console.log(vm.$route.query.id);
            // 用id查找歌曲详情
            vm.$http('/song/detail?ids=' + vm.$route.query.id).then(data => {
                if (data != 'nudefined') {
                    // console.log(data.data.songs[0]);
                    // 存储想要的数据
                    vm.MusicData.id = data.data.songs[0].id;
                    vm.MusicData.musicName = data.data.songs[0].name;
                    vm.MusicData.author = data.data.songs[0].ar[0].name;
                    vm.MusicData.picUrl = data.data.songs[0].al.picUrl;
                }
            })

            // 用 id 查找歌词
            vm.$http('/lyric?id=' + vm.$route.query.id).then(data => {
                if (data != 'undefined') {
                    // console.log(data);
                    let value = data.data.lrc.lyric;

                    // 把歌词 切割成数组
                    let lyricsArr = value.split(/\n/);
                    // console.log(lyricsArr);
                    let reg = /\[(\d+):(\d+\.\d+)\](.+)/;
                    vm.MusicData.lyric = lyricsArr.map(lc => {
                        reg.test(lc);
                        return {
                            time: parseInt(RegExp.$1*60) + parseFloat(RegExp.$2),   // 时间
                            lyric: RegExp.$3, // 歌词
                        }
                    })
                    // console.log(vm.MusicData.lyric);
                }
            })
            // console.log(vm.MusicData);
        })
    }
}
</script>

<style lang="less">
.PlayInterface {
    background-size: 100% 100%;
    background-repeat: no-repeat;
    background-attachment: fixed;
    position: relative;

    .Fuzzy-layer {
        width:23.4375rem;
        height: 41.6875rem;
        background: inherit;
        filter: blur(7px);
        z-index: 2;
    }

    .assembly {
        position: absolute;
        top: 0;
        left: 0;
        z-index: 10;
        height: 100%;
        width: 100%;
        .top {
            ul {
                display: flex;
                justify-content: space-between;
                padding: .625rem .3125rem;
                li {
                    &:nth-child(1),
                    &:nth-child(3) {
                        height: 2rem;
                        width: 2rem;
                        img {
                            width: 100%;
                        }
                    }
                    &:nth-child(2) {
                        font-size: 1.25rem;
                        line-height: 2rem;
                        color: #fff;
                    }
                }
            }
        }
        .PicturesAndLyrics {
            .Lyrics {
                margin: 1.25rem auto;
                width: 18.75rem;
                height: 15.625rem;
                overflow: hidden;
                ul {
                    transition: all .5s linear;
                    transform: translateY(7.8125rem);
                    li {

                        &.active {
                            color: red;
                        }
                    }
                }
            }
        }
        .PlayBox {
            position: relative;
            height: 3.125rem;
            audio {
                position: absolute;
                bottom: 150px;
                height: 3.125rem;
            }

            // 进度条
            .progress-bar {
                margin: 0px 20px;
                .time {
                    display: flex;
                    justify-content: space-between;
                    margin-bottom: 2px;
                    color: #c2c2c4;
                    font-size: 10px;
                }
                .Inside-line {
                    height: 5px;
                    background-color: #c2c2c4;
                    position: relative;
                    .outside-lines {
                        height: 5px;
                        width: 0%;
                        background-color: #253042;
                    }
                    .spot {
                        position: absolute;
                        left: calc(0% - 5px);
                        top: -2.5px;
                        height: 10px;
                        width: 10px;
                        border-radius: 100%;
                        background-color: #253042;
                    }
                }
            }

            // 控制台
            .console {
                width: 100%;
                .play {
                    width: 3.125rem;
                    height: 3.125rem;
                    border: 1px solid #fff;
                    border-radius: 100%;
                    margin: .625rem auto;
                    padding: .625rem .5625rem .625rem .6875rem;
                    background: url(../assets/暂停.png) no-repeat center center;
                    background-size: 65%;
                }
                .suspend {
                    width: 3.125rem;
                    height: 3.125rem;
                    border: 1px solid #fff;
                    border-radius: 100%;
                    margin: .625rem auto;
                    padding: .625rem .5625rem .625rem .6875rem;
                    background: url(../assets/播放.png) no-repeat center center;
                    background-size: 65%;
                }
            }
        }
    }
}
</style>