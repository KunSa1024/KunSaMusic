<template>
    <div class="mininavigation">
        <ul>
            <li>
                <router-link tag="a" to="/">
                    <i class="faa">
                        <img class="auto-img" src="../../assets/麦克风.png" alt="">
                    </i>
                    <span>K歌</span>
                </router-link>
            </li>
            <li>
                <router-link tag="a" to="/">
                    <i class="faa">
                        <img class="auto-img" src="../../assets/专辑，光盘.png" alt="">
                    </i>
                    <span>专辑</span>
                </router-link>
            </li>
            <li>
                <router-link tag="a" to="/">
                    <i class="faa">
                        <img class="auto-img" src="../../assets/自行车.png" alt="">
                    </i>
                    <span>PT</span>
                </router-link>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    name: 'MiniNavigation'
}
</script>

<style lang="less" scoped>
.mininavigation {

    ul {
        display: flex;
        justify-content: space-around;
        padding: 8px 0px;
        background-color: rgba(247, 247, 247, 0.1);
        li {
            
            a {
                text-decoration: none;
                line-height: 40px;
                box-sizing: border-box;
                display: flex;
                justify-content: center;
                flex-direction: row;
                i {
                    width: 1.5625rem;
                    height: 1.5625rem;
                    display: inline-block;
                    font-size: 0px;
                    display: flex;
                    margin: auto 0rem;
                }
                span {
                    color: #fff;
                    font-size: 16px;
                    margin-left: .3125rem;
                }
            }
        }
    }
}
</style>