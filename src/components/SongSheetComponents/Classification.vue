<template>
    <div class="Classification">
        <div class="top">
            <h1>全部风格</h1>
        </div>
        <div class="content">
            <!--主分类-->
            <div class="left">
                <ul>
                    <li v-for="(v, is) in classificationData.main" :key="is">
                        <div class="list">
                            <img :src="itom[is]" alt="">
                            {{ classificationData.main[is] }}
                        </div>
                        <ul>
                            <li v-for="(v, i) in classificationData.sub[is]" :key="i">
                                {{ v }}
                            </li>
                        </ul>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Classification',
    props: {
        classificationData: {
            type: Object
        }
    },
    data() {
        return {
            // 批量
            itom: [require('@/assets/地球.png'),require('@/assets/钢琴.png'),require('@/assets/咖啡.png'),require('@/assets/笑脸.png'),require('@/assets/音符.png')],  // 图标
        }
    },
    filters: {
    }
}
</script>

<style lang="less" scoped>
.Classification {
    background: pink;
    position: absolute;
    top: 75px;
    left: 5px;
    display: flex;
    flex-direction: column;
    background: rgba(255, 255, 255, 1);
    color: #333;
    border-radius: 10px;
    &::after {
        content: '';
        display: inline-block;
        width: 20px;
        border: 20px solid transparent;
        border-bottom: 20px solid #fff;
        position: absolute;
        top: -38px;
        left: 73px;
    }
    .top {

        h1 {
            font-size: 20px;
            padding: 5px 0px;
            border-bottom: 2px solid #999;
        }
    }
    .content {
        .left {
            
            ul {
                padding: 10px 5px;
                li {
                    display: flex;
                    .list {
                        flex: 2;
                        border-right: 1px solid #999;
                        img {
                            width: 30px;
                            height: 30px;
                        }
                    }
                    ul {
                        flex: 7;
                        display: flex;
                        flex-wrap: wrap;
                        margin: 5px 0px;
                        font-size: 12px;
                        li {
                            margin: 2px 0px;
                            padding: 0px 5px;
                            border-right: 1px solid #999;
                        }
                    }
                }
            }
        }
    }
}
</style>