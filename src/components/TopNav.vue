<template>
    <div class="topnav">
        <ul class="top">
            <li>
                <router-link tag="a" to="/user">
                    <i class="fa fa-user-o"></i>
                </router-link>
            </li>
            <li><h3>KunSa音乐</h3></li>
            <li>
                <router-link tag="a" to="/search">
                    <i class="fa fa-search"></i>
                </router-link>
            </li>
        </ul>
        <ul class="navigationBar">
            <li>
                <router-link tag="a" to="/">热门</router-link>
            </li>
            <li>
                <router-link tag="a" to="/songsheet">歌单</router-link>
            </li>
            <li>
                <router-link tag="a" to="/ranking">排行</router-link>
            </li>
            <li>
                <a href="">电台</a>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    name:'TopNav',
    data() {
        return {
            throttle:0
        }
    }
}
</script>

<style lang="less" scoped>
.topnav {
    display: flex;
    flex-direction: column;
    ul.top {
        display: flex;
        justify-content: space-between;
        padding: 10px 12px 6px 12px;
        color: #fff;
        li {
            i {
                font-size: 24px;
                color: #fff;
            }
            h3 {
                font-size: 16px;
            }
        }
    }
    ul.navigationBar {
        display: flex;
        justify-content: space-around;
        background-color: rgb(247 247 247 / 10%);
        li {
            
            a {
                display: inline-block;
                font-size: 15px;
                padding: 10px 1.875rem;
                text-decoration: none;
                color: #fff;
                &.router-link-exact-active{
                    border-bottom: 4px solid #fff;
                }
            }
        }
    }
}
</style>

