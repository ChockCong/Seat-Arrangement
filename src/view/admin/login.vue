<template>
    <div class="login-vue" :style="bg">
        <div class="container">
            <img class="logo-section" src="../../assets/logo.png" alt="logo">
            <section class="switch-section">
                <!-- <span class="word" v-if="tab">
                    <span>还没有账号？点击注册</span>
                    <Icon type="md-arrow-round-forward" />
                </span> -->
                <SwitchTab size="large" class="tab-item" v-model="tab">
                    <span slot="open">{{'注册'}}</span>
                    <span slot="close">{{'登录'}}</span>
                </SwitchTab>
            </section>
            <transition name="login">
                <div v-if="tab" class="flex-container">
                    <!-- <p class="title">CodeThunder</p> -->
                    <Form ref="loginF" :model="loginForm" :rules="loginRuleValidate" class="loginForm">
                        <FormItem label="用户名" prop="account">
                            <Input size="large" type="text" prefix="ios-contact" v-model.trim="loginForm.account" :placeholder="'用户名'" clearable/>
                        </FormItem>
                        <FormItem label="密码" prop="pwd">
                            <Input size="large" type="password" v-model.trim="loginForm.pwd" prefix="md-lock" placeholder="密码" clearable/>
                        </FormItem>
                        <!-- <div class="input-c">
                            <Input size="large" prefix="ios-contact" v-model="account" :placeholder="'用户名'" clearable @on-change="verifyAccount"/>
                            <p class="error">{{accountError}}</p>
                        </div> -->
                        <!-- <div class="input-c">
                            <Input size="large" type="password" v-model="loginForm.pwd" prefix="md-lock" placeholder="密码" clearable @on-change="verifyPwd"/>
                            <p class="error">{{pwdError}}</p>
                        </div> -->
                        <Button size="large" :loading="isShowLoading" class="submit" type="primary" @click="login">登陆</Button>
                        <p class="account"><span @click="forgetPwd">忘记密码</span></p>
                    </Form>
                </div>
            </transition>
            <transition name="regist">
                <div v-if="!tab"  class="flex-container">
                    <!-- <p class="title regist">注册账号</p> -->
                    <Form ref="registF" :model="registForm" :rules="registRuleValidate" class="registForm">
                        <Row class="row" type="flex" justify="space-between">
                            <ICol span="11">
                                <FormItem label="登录名" prop="stLoginName">
                                    <Input type="text" prefix="md-contact" v-model="registForm.stLoginName" placeholder="登录名" clearable />
                                </FormItem>
                            </ICol>
                            <ICol span="11">
                                <FormItem label="用户名" prop="stName">
                                    <Input prefix="md-happy" v-model="registForm.stName" placeholder="用户名" clearable />
                                </FormItem>
                            </ICol>
                        </Row>
                        <Row class="row" type="flex" justify="space-between">
                            <ICol span="24">
                                <FormItem label="手机号码" prop="stPhoneNum">
                                    <Input min prefix="ios-phone-portrait" v-model.trim="registForm.stPhoneNum" placeholder="手机号码" clearable />
                                </FormItem>
                            </ICol>
                        </Row>
                        <Row class="row" type="flex" justify="space-between">
                            <ICol span="24">
                                <FormItem label="邮箱地址" prop="stEmail">
                                    <Input prefix="md-mail" v-model.trim="registForm.stEmail" placeholder="邮箱地址" clearable />
                                </FormItem>
                            </ICol>
                        </Row>
                        <Row class="row" type="flex" justify="space-between">
                            <ICol span="11">
                                <FormItem label="登录密码" prop="stPassword">
                                    <Input type="password" prefix="ios-lock" v-model.trim="registForm.stPassword" placeholder="登录密码" clearable />
                                </FormItem>
                            </ICol>
                            <ICol span="11">
                                <FormItem label="确认密码" prop="comfirmPassword">
                                    <Input type="password" prefix="ios-lock-outline" v-model.trim="registForm.comfirmPassword" placeholder="确认密码" clearable />
                                </FormItem>
                            </ICol>
                        </Row>
                        <Button size="large" :loading="isShowLoading" class="submit regist" type="primary" @click="register">注册</Button>
                        <!-- <p class="account"><span @click="tab = true">用户登录</span></p> -->
                    </Form>
                </div>
            </transition>
        </div>
    </div>
</template>

<script>
// import { adminLogin } from '../../api/api';
export default {
    name: 'loginPage',
    data() {
        const validatePassWord = (rule, value, callback) => {
            let reg = new RegExp(/^(?=.*[a-zA-Z]+)(?=.*[0-9]+)[a-zA-Z0-9]+$/);
            if (value === '') {
                callback(new Error('请输入密码'));
            } else if (!reg.test(value)) {
                callback(new Error('密码必须包含英文和数字'));
            } else if (this.registForm.comfirmPassword && value !== this.registForm.comfirmPassword) {
                callback(new Error('两次密码输入不一致请重新输入'));
            } else {
                callback();
            }
        };
        const validatePassCheck = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请二次输入确认密码'));
            } else if (this.registForm.stPassword && value !== this.registForm.stPassword) {
                callback(new Error('两次密码输入不一致请重新输入'));
            } else {
                callback();
            }
        };
        const validatePhoneCheck = (rule, value, callback) => {
            let reg = new RegExp(/\d$/);
            console.log(value.lenght);
            if (value === '') {
                callback(new Error('请输入手机号码'));
            } else if (!reg.test(value)) {
                callback(new Error('请输入正确的手机号码'));
            } else if (value.length < 11) {
                callback(new Error('请输入至少11位手机号码'));
            } else {
                callback();
            }
        };
        return {
            tab: true,
            loginForm: {
                account: '',
                pwd: '',
            },
            loginRuleValidate: {
                account: [
                    { required: true, message: '请输入登录名', trigger: ['blur','change'] }
                ],
                pwd: [
                    { required: true, message: '请输入登录密码', trigger: ['blur','change'] }
                ]
            },
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
                comfirmPassword: ''
            },
            registRuleValidate: {
                stName: [
                    { required: true, message: '请输入用户名', trigger: ['blur','change'] }
                ],
                stLoginName: [
                    { required: true, message: '请输入登录名', trigger: ['blur','change'] }
                ],
                stPhoneNum: [
                    { required: true, validator: validatePhoneCheck, trigger: ['blur','change'] }
                ],
                stEmail: [
                    { required: true, message: '请输入邮箱', trigger: ['blur','change'] },
                    { type: 'email', message: '请输入正确邮箱', trigger: 'blur' }
                ],
                stPassword: [
                    { required: true, validator: validatePassWord, trigger: ['blur','change'] }
                ],
                comfirmPassword: { required: true, validator: validatePassCheck, trigger: ['blur','change'] }
            }
        }
    },
    created() {
        // this.bg.backgroundImage = 'url(' + require('../assets/imgs/bg0' + new Date().getDay() + '.jpg') + ')'
        this.bg.backgroundImage = `url(${require('../../assets/bg03.jpg')})`;
        this.bg.backgroundImage = `url(https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1591357660532&di=28d8e7bd58201a4e00260116a0f098bc&imgtype=0&src=http%3A%2F%2Fattachments.gfan.net.cn%2Fforum%2F201504%2F14%2F075409wgwijxiax3i4wihw.jpg)`
    },
    watch: {
        $route: {
            handler(route) {
                this.redirect = route.query && route.query.redirect
            },
            immediate: true,
        },
        tab(value) {
            if (value) {
                this.$refs['registF'].resetFields();
                // this.$refs['loginF'].resetFields();
            } else {
                this.$refs['loginF'].resetFields();
            }
        }
    },
    methods: {
        // verifyAccount() {
        //     if (!this.account) {
        //         this.accountError = '请输入账号'
        //     } else {
        //         this.accountError = ''
        //     }
        // },
        // verifyPwd() {
        //     if (!this.pwd) {
        //         this.pwdError = '请输入密码'
        //     } else {
        //         this.pwdError = ''
        //     }
        // },
        forgetPwd() {
            this.$router.push('/unlogin')
        },
        async login() {
            let tag = false;
            const gotoSuccess = (tag) => {
                if (this.loginForm.account && this.loginForm.pwd && tag) {
                    let data = {
                        admin_token: 'ghfkjahksgsd54234234sdfgsdfsfsdgsdg',
                        username: '惊雷管理员账户',
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
            }
             this.$refs['loginF'].validate((valid) => {
                if (valid) {
                    tag = true;
                    gotoSuccess(tag);
                } else {
                    this.$Message.error('请填写正确登录名和密码!');
                }
            });
        },
        async register() {
            let tag = false;
            const gotoSuccess = (tag) => {

            }
            this.$refs.registF.validate((valid) => {
                if (valid) {
                    tag = true;
                    gotoSuccess(tag);
                } else {
                    this.$Message.error('请填写正确信息');
                }
            });
        }
    },
}
</script>

<style lang="scss" scoped>
.login-enter-active {
    transition: all .8s ease;
}
.login-leave-active {
    transition: all .1s ease;
}
.login-enter, .login-leave-to /* .fade-leave-active below version 2.1.8 */ {
    transform: translateX(-40px);
    opacity: 0;
}
.regist-enter-active {
    transition: all .8s ease;
}
.regist-leave-active {
    transition: all .1s ease;
}
.regist-enter, .regist-leave-to /* .fade-leave-active below version 2.1.8 */ {
    transform: translateX(40px);
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
        background: rgba(0, 0, 0, .7);
        width: 575px;
        height: 475px;
        // text-align: center;
        border-radius: 10px;
        padding: 0 20px;
        display: flex;
        align-items: center;
        position: relative;
        & .flex-container {
            width: 100%;
        }
        & .logo-section {
            width: 30px;
            height: 30px;
            position: absolute;
            top: 20px;
            left: 20px;
            background: white;
        }
        & .switch-section {
            display: flex;
            align-items: center;
            position: absolute;
            top: 20px;
            right: 20px;
            & .tab-item {
                font-weight: bold;
                border-color: #2d8cf0;
                background-color: #2d8cf0;
            }
            & .word {
                margin-right: 10px;
                display: flex;
                align-items: center;
                font-size: 13px;
                font-weight: bold;
                & i {
                    color: white !important
                }
            }
        }
    }
    ::v-deep .loginForm {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        & .ivu-form-item {
            width: 80%;
            & .ivu-form-item-label {
                color: white;
                font-size: 14px;
            }
        }
    }
    ::v-deep .registForm {
        & .ivu-form-item {
            & .ivu-form-item-label {
                color: white;
                font-size: 14px;
            }
        }
    }
    & .ivu-input {
        background-color: transparent;
        color: #fff;
        outline: #fff;
        border-color: #fff;
    }
    // & ::-webkit-input-placeholder { /* WebKit, Blink, Edge */
    //     color: rgba(255, 255, 255, .8);
    // }
    // & :-moz-placeholder { /* Mozilla Firefox 4 to 18 */
    //     color: rgba(255, 255, 255, .8);
    // }
    // & ::-moz-placeholder { /* Mozilla Firefox 19+ */
    //     color: rgba(255, 255, 255, .8);
    // }
    // & :-ms-input-placeholder { /* Internet Explorer 10-11 */
    //     color: rgba(255, 255, 255, .8);
    // }
    & .title {
        position: absolute;
        font-size: 16px;
        top: 20px;
        left: 40%;
    }
    & .row {
        // padding-bottom: 5px;
        height: 80px;
        width: 90%;
        margin: 0 auto;
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
        margin-top: 20px;
        width: 80%;
        font-size: 16px;
        &.regist {
            width: 90%;
        }
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