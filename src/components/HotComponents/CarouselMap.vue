<template>
    <div class="carouselMap">
        <ul class="img" ref="ul" :style="{
            'transition':isAnimate?'all .5s linear':'',
            'transform':`translateX(-${index * 10}%)`
        }">
            <li v-for="(v,i) in bannerimg" :key="i">
                <img :src="bannerimg[i]" alt="">
                <!-- <span>{{ v.typeTitle }}</span> -->
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    name: 'CarouselMap',
    props: {
        bannerData: {
            type: Array,
        }
    },
    data() {
        return {
            index: 0,
            timer: null,
            isAnimate: true,
            bannerimg: [
                'https://p1.music.126.net/PIONaynRnQ3MoZ4pvw2_Vg==/109951165780276299.jpg?imageView&quality=89',
                'https://p1.music.126.net/Vl9CfAAWotSCFrcanOe5Dw==/109951165780206499.jpg?imageView&quality=89',
                'https://p1.music.126.net/iGqexIUCuUPn-C-u1igTIw==/109951165777708529.jpg?imageView&quality=89',
                'https://p1.music.126.net/vBIykpbe3Z-y7M0dTwFELg==/109951165780235202.jpg?imageView&quality=89',
                'https://p1.music.126.net/Ji4mUcicxWiAO2-m6RXuoA==/109951165780247333.jpg?imageView&quality=89',
                'https://p1.music.126.net/i4BuUwOfbSLxnmreJ56gpw==/109951165780508164.jpg?imageView&quality=89',
                'https://p1.music.126.net/G3xXqJcFFG7lz6c8k1rbEw==/109951165780550980.jpg?imageView&quality=89',
            ]
        }
    },
    methods: {
        hanldEnd() {
            if (this.index >= this.bannerimg.length-1) {
                this.index = 0;
                this.isAnimate = false;
            }
            if (this.index <= 0) {
                this.index = this.bannerimg.length-1;
                this.isAnimate = false;
            }
        },
        timeout() {
            this.timer = setInterval(() => {
                // console.log(this.index)
                // console.log(this.bannerData.length)
                this.isAnimate = true;
                this.index++;
                if (this.index == this.bannerimg.length) {
                    this.index = 1;
                    this.isAnimate = false;
                }
            }, 3500)
        },
        stop() {
            clearInterval(this.timer)
        }
    },
    created() {
        this.timeout();

        this.hanldEnd();
    }
}
</script>

<style lang="less" scoped>
.carouselMap {
    width: 100%;
    max-width: 100%;
    height: 9.11rem;
    ul {
        width: 1000%;
        font-size: 0px;
        
        text-align: left;
        height: 9.11rem;
        li {
            display: inline-block;
            height: 9.11rem;
            img {
                height: 100%;
            }
        }
    }
}
</style>