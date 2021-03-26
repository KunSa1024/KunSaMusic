<template>
    <div class="user">
        <div class="btn" @click="btn()"></div>
        <div class="top">
            <div class="img">
                头像
            </div>
            <h1>用户名</h1>
        </div>
        <div class="input">
            <input type="text" placeholder="手机/邮箱">
            <input type="password" name="" id="" placeholder="登录密码">
            <button>登 &nbsp; 录</button>
            <div class="a">
                <a href="" class="login">注册登录</a>
                <a href="" class="forget">忘记密码?</a>
            </div>
        </div>
        <div class="botton">
            <ul>
                <li><img src="../assets/QQ.png" alt=""></li>
                <li><img src="../assets/微博.png" alt=""></li>
                <li><img src="../assets/微信.png" alt=""></li>
            </ul>
            <p>第三方登录</p>
        </div>
    </div>
</template>

<script>
export default {
    name: 'User',
    methods: {
        // 返回到主页
        btn() {
            this.$router.push('/');
        }
    }
}
</script>

<style lang="less" scoped>
.user {
    position: fixed;
    top: 0px;
    width: 100%;
    height: 100%;
    background-color: #253042;
    padding: 1.875rem 1.875rem;
    .btn {
        width: .9375rem;
        height: .9375rem;
        background: url(../assets/返回.png) no-repeat;
        background-size: contain;
        position: absolute;
        top: 15px;
        left: 15px;
    }
    .top {
        margin-top: 2.5rem;
        .img {
            width: 6.25rem;
            height: 6.25rem;
            margin: 0px auto;
            border: 1px solid #fff;
            border-radius: 6.25rem;
        }
        h1 {
            color: #fff;
            font-size: 1.25rem;
        }
    }
    .input {
        display: flex;
        flex-direction: column;
        margin-top: 3.125rem;
        input[type="text"],
        input[type="password"] {
            margin-top: .9375rem;
            height: 1.875rem;
            background-color: transparent;
            border: 0px;
            border-bottom: 1px solid #fff;
            color: #fff;
            outline: none;
        }
        button {
            margin-top: 1.5625rem;
            height: 2.1875rem;
            background-color: rgba(255, 255, 255, 0.507);
            border: 0px;
            border-radius: .3125rem;
            font-size: 1.25rem;
            color: #fff;
            outline: none;
        }
        .a {
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            margin-top: .625rem;
            .login,
            .forget {
                text-decoration: none;
                color: rgba(255, 255, 255, 0.541);
            }
        }
    }
    .botton {

        ul {
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            padding-bottom: .625rem;
            margin-top: 2.5rem;
            border-bottom: 1px solid #fff;
            li {
                width: 2.5rem;
                height: 2.5rem;
                border: 1px solid #fff;
                border-radius: 2.5rem;
                padding: .3125rem;
                img {
                    width: 100%;
                }
            }
        }
        p {
            font-size: .875rem;
            color: #fff;
            margin-top: .625rem;
        }
    }
}
</style>