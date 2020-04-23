<template>
    <div class="login-vue" :style="bg">
        <div class="container">
            <p class="title">WELCOME</p>
            <div class="input-c">
                <Input prefix="ios-contact" v-model="account" :placeholder="'用户名'" clearable @on-blur="verifyAccount"/>
                <p class="error">{{accountError}}</p>
            </div>
            <div class="input-c">
                <Input type="password" v-model="pwd" prefix="md-lock" placeholder="密码" clearable @on-blur="verifyPwd"/>
                <p class="error">{{pwdError}}</p>
            </div>
            <Button :loading="isShowLoading" class="submit" type="primary" @click="submit">登陆</Button>
            <p class="account"><span @click="register">注册账号</span> | <span @click="forgetPwd">忘记密码</span></p>
        </div>
    </div>
</template>

<script>
export default {
    name: 'login',
    data() {
        return {
            account: '',
            pwd: '',
            accountError: '',
            pwdError: '',
            isShowLoading: false,
            bg: {},
        }
    },
    created() {
        // this.bg.backgroundImage = 'url(' + require('../assets/imgs/bg0' + new Date().getDay() + '.jpg') + ')'
        this.bg.backgroundImage = `url(${require('../../assets/bg03.jpg')})`;
    },
    watch: {
        $route: {
            handler(route) {
                this.redirect = route.query && route.query.redirect
            },
            immediate: true,
        },
    },
    methods: {
        verifyAccount() {
            if (!this.account) {
                this.accountError = '请输入账号'
            } else {
                this.accountError = ''
            }
        },
        verifyPwd() {
            if (!this.pwd) {
                this.pwdError = '请输入密码'
            } else {
                this.pwdError = ''
            }
        },
        register() {
        },
        forgetPwd() {
        },
        submit() {
            if (this.account && this.pwd) {
                this.$router.push({ path: 'management' })
            }
            //     this.isShowLoading = true
            //     // 登陆成功 设置用户信息
            //     localStorage.setItem('userImg', 'https://avatars3.githubusercontent.com/u/22117876?s=460&v=4')
            //     localStorage.setItem('userName', '小明')
            //     // 登陆成功 假设这里是后台返回的 token
            //     localStorage.setItem('token', 'i_am_token')
            //     this.$router.push({ path: this.redirect || '/' })
            // } else {
            //     if (this.account !== 'admin') {
            //         this.accountError = '账号为admin'
            //     }
            //     if (this.pwd !== 'admin') {
            //         this.pwdError = '密码为admin'
            //     }
            // }
        },
    },
}
</script>

<style lang="scss" scoped>
.login-vue {
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #fff;
    background-size: cover;
    & .container {
        background: rgba(255, 255, 255, .5);
        width: 400px;
        text-align: center;
        border-radius: 10px;
        padding: 30px;
    }
    & .ivu-input {
        background-color: transparent;
        color: #fff;
        outline: #fff;
        border-color: #fff;
    }
    & ::-webkit-input-placeholder { /* WebKit, Blink, Edge */
        color: rgba(255, 255, 255, .8);
    }
    & :-moz-placeholder { /* Mozilla Firefox 4 to 18 */
        color: rgba(255, 255, 255, .8);
    }
    & ::-moz-placeholder { /* Mozilla Firefox 19+ */
        color: rgba(255, 255, 255, .8);
    }
    & :-ms-input-placeholder { /* Internet Explorer 10-11 */
        color: rgba(255, 255, 255, .8);
    }
    & .title {
        font-size: 16px;
        margin-bottom: 20px;
    }
    & .input-c {
        margin: auto;
        width: 80%;
    }
    & .error {
        color: red;
        text-align: left;
        margin: 5px auto;
        font-size: 12px;
        padding-left: 30px;
        height: 20px;
    }
    & .submit {
        width: 200px;
    }
    & .account {
        margin-top: 30px;
    }
    & .account span {
        cursor: pointer;
    }
    & .ivu-icon {
        color: #eee;
    }
    & .ivu-icon-ios-close-circle {
        color: #777;
    }
}

</style>