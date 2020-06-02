<template>
    <div class="login-vue" :style="bg">
        <div class="container">
            <SwitchTab size="large" class="tab-item" v-model="tab">
                <span slot="open">{{'登录'}}</span>
                <span slot="close">{{'注册'}}</span>
            </SwitchTab>
            <transition name="login">
                <div v-if="tab" class="flex-container">
                    <p class="title">WELCOME</p>
                    <div class="input-c">
                        <Input size="large" prefix="ios-contact" v-model="account" :placeholder="'用户名'" clearable @on-change="verifyAccount"/>
                        <p class="error">{{accountError}}</p>
                    </div>
                    <div class="input-c">
                        <Input size="large" type="password" v-model="pwd" prefix="md-lock" placeholder="密码" clearable @on-change="verifyPwd"/>
                        <p class="error">{{pwdError}}</p>
                    </div>
                    <Button size="large" :loading="isShowLoading" class="submit" type="primary" @click="submit">登陆</Button>
                    <p class="account"><span @click="forgetPwd">忘记密码</span></p>
                </div>
            </transition>
            <transition name="regist">
                <div v-if="!tab"  class="flex-container">
                    <p class="title regist">REGIST</p>
                    <Row class="row" type="flex" justify="space-between">
                        <ICol span="11">
                            <label>登录名</label>
                            <Input size="large" prefix="ios-contact" v-model="registForm.stLoginName" placeholder="登录名" clearable @on-blur="verifyAccount" />
                            <p class="error">{{stNameError}}</p>
                        </ICol>
                        <ICol span="11">
                            <label>用户名</label>
                            <Input size="large" prefix="ios-contact" v-model="registForm.stName" placeholder="用户名" clearable @on-blur="verifyAccount" />
                            <p class="error">{{stLoginNameError}}</p>
                        </ICol>
                    </Row>
                    <Row class="row" type="flex" justify="space-between">
                        <ICol span="11">
                            <label>预留手机</label>
                            <Input size="large" prefix="ios-contact" v-model="registForm.stPhoneNum" placeholder="预留手机" clearable @on-blur="verifyAccount" />
                            <p class="error">{{stPhoneNumError}}</p>
                        </ICol>
                        <ICol span="11">
                            <label>预留邮箱</label>
                            <Input size="large" prefix="ios-contact" v-model="registForm.stEmail" placeholder="预留邮箱" clearable @on-blur="verifyAccount" />
                            <p class="error">{{stEmailError}}</p>
                        </ICol>
                    </Row>
                    <Row class="row" type="flex" justify="space-between">
                        <ICol span="11">
                            <label>登录密码</label>
                            <Input size="large" prefix="ios-contact" v-model="registForm.stPassword" placeholder="登录密码" clearable @on-blur="verifyAccount" />
                            <p class="error">{{stPasswordError}}</p>
                        </ICol>
                        <ICol span="11">
                            <label>确认密码</label>
                            <Input size="large" prefix="ios-contact" v-model="registForm.comfirmPassword" placeholder="确认密码" clearable @on-blur="verifyAccount" />
                            <p class="error">{{comfirmPwddError}}</p>
                        </ICol>
                    </Row>
                    <Button size="large" :loading="isShowLoading" class="submit" type="primary" @click="submit">注册</Button>
                </div>
            </transition>
        </div>
    </div>
</template>

<script>
import { adminLogin } from '../../api/api';
export default {
    name: 'loginPage',
    data() {
        return {
            tab: false,
            account: '',
            pwd: '',
            accountError: '',
            pwdError: '',
            isShowLoading: false,
            bg: {},
            registForm: {
                stName: '',
                stLoginName: '',
                stPassword: '',
                stPhoneNum: '',
                stEmail: '',
            },
            comfirmPassword: ''
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
    computed: {
        stNameError () {
            return '';
        },
        stLoginNameError () {
            return '';
        },
        stPasswordError () {
            return '';
        },
        stPhoneNumError () {
            return '';
        },
        stEmailError () {
            return '';
        },
        comfirmPwddError () {
            return '';
        }
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
        async submit() {
            if (this.account && this.pwd) {
                let params = {
                    name: this.account,
                    password:this.pwd,
                    company: {
                        address: 'asdhfjkhdskalg',
                        phoneNo: 123123213123
                    }
                };
                // const res = await adminLogin(params);
                // console.log(res);
                let data = {
                    admin_token: 'ghfkjahksgsd54234234sdfgsdfsfsdgsdg',
                    username: '叻叻猪呢你都',
                    email: '123@123.com',
                    phoneNo: '12023698547',
                    company: {
                        address: 'sdgfjkhsdkfksdb三大框架还疯狂水底纳瓜',
                        phoneNo: ''
                    }
                };
                this.$store.commit('SET_ADMIN_INFO', data);
                if (this.$store.getters.getAdminToken) {
                    this.$router.push({ path: 'management' });
                }
                // this.$router.push({ path: 'management' })
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
.login-enter-active {
    transition: all .5s ease;
}
.login-leave-active {
    transition: all .1s ease;
}
.login-enter, .login-leave-to /* .fade-leave-active below version 2.1.8 */ {
    transform: translateX(-50px);
    opacity: 0;
}
.regist-enter-active {
    transition: all .5s ease;
}
.regist-leave-active {
    transition: all .1s ease;
}
.regist-enter, .regist-leave-to /* .fade-leave-active below version 2.1.8 */ {
    transform: translateX(50px);
    opacity: 0;
}
.login-vue {
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #fff;
    background-size: cover;
    & .container {
        background: rgba(255, 255, 255, .5);
        width: 600px;
        height: 450px;
        // text-align: center;
        border-radius: 10px;
        padding: 30px;
        display: flex;
        align-items: center;
        position: relative;
        & .flex-container {
            width: 100%;
        }
        & .tab-item {
            position: absolute;
            top: 20px;
            left: 20px;
            font-weight: bold;
            border-color: #2d8cf0;
            background-color: #2d8cf0;
        }
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
        font-size: 34px;
        margin-bottom: 35px;
        &.regist {
            margin-bottom: 10px;
        }
    }
    & .input-c {
        margin: auto;
        width: 80%;
        height: 60px;
    }
    & .row {
        // padding-bottom: 5px;
        height: 80px;
        & .ivu-col {
            text-align: left;
            & label {
                font-size: 13px;
            }
        }
    }
    & .error {
        color: red;
        text-align: left;
        margin: 3px auto;
        font-size: 12px;
    }
    & .submit {
        width: 250px;
        font-size: 16px;
    }
    & .account {
        margin-top: 30px;
    }
    & .account span {
        cursor: pointer;
        font-size: 16px;
    }
    & .ivu-icon {
        color: #eee;
    }
    & .ivu-icon-ios-close-circle {
        color: #777;
    }
}

</style>