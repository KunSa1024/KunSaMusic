<template>
    <div class="hot">
        <!--轮播图-->
        <CarouselMap></CarouselMap>
        <!--导航栏-->
        <MiniNavigation></MiniNavigation>
        <h2>热门推荐</h2>
        <!--热门推荐-->
        <PopularRecommendation :hotData="hotData"></PopularRecommendation>
    </div>
</template>

<script>
import CarouselMap from '../components/HotComponents/CarouselMap'
import MiniNavigation from '../components/HotComponents/MiniNavigation'
import PopularRecommendation from '../components/HotComponents/PopularRecommendation'

export default {
    name:'Hot',
    data() {
        return {
            // bannerData:[],
            hotData:[],
        }
    },
    components: {
        CarouselMap,    // 轮播图
        MiniNavigation, // 内部导航栏
        PopularRecommendation,  // 热门推荐
    },
    beforeRouteEnter(to, from, next) {
        next(vm => {
            // 轮播图
            // vm.$http.get('/banner?type=2').then(data => {
            //     console.log('轮播图', data.data.banners);
            //     vm.bannerData = data.data.banners;
            // })
            // 热门推荐
            vm.$http.get('/personalized/newsong').then(data => {
                // console.log(data.data.result);
                vm.hotData = data.data.result;
            })
        })
    }
}
</script>

<style lang="less" scoped>
.hot {


    h2 {
        font-size: 18px;
        color: #fff;
        height: 47px;
        line-height: 47px;
        text-align: center;
        border-bottom: 3px solid rgba(247, 247, 247, 0.1);
    }
}
</style>