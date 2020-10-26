<template>
    <div class="login-vue" :style="bg">
        <!-- <transition name="contain"> -->
            <div class="container" :class="!tab ? 'registH' : 'loginH'">
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
                                <Input size="large" :type="seeLoginPwd ? 'text' : 'password'" v-model.trim="loginForm.pwd" prefix="md-lock" placeholder="密码">
                                    <Icon class="eye" style="cursor: pointer;" @click="seeLoginPwd = !seeLoginPwd" :type="seeLoginPwd ? 'ios-eye' : 'ios-eye-off'" slot="suffix" />
                                </Input>
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
                            <Row class="row">
                                <ICol span="24">
                                    <FormItem label="登录名" prop="stLoginName">
                                        <Input type="text" prefix="md-contact" v-model="registForm.stLoginName" placeholder="登录名" clearable />
                                            <!-- <Icon v-if="hasNameTag" type="ios-loading" size=18 class="demo-spin-icon-load" slot="suffix"></Icon> -->
                                        <!-- </Input> -->
                                    </FormItem>
                                </ICol>
                            </Row>
                            <Row class="row">
                                <ICol span="24">
                                    <FormItem label="用户名" prop="stName">
                                        <Input prefix="md-happy" v-model="registForm.stName" placeholder="用户名" clearable>
                                            <Icon v-if="hasNameTag" type="ios-loading" size=18 class="demo-spin-icon-load" slot="suffix"></Icon>
                                        </Input>
                                    </FormItem>
                                </ICol>
                            </Row>
                            <Row class="row">
                                <ICol span="24">
                                    <FormItem label="手机号码" prop="stPhoneNum">
                                        <Input min prefix="ios-phone-portrait" v-model.trim="registForm.stPhoneNum" placeholder="手机号码" clearable />
                                    </FormItem>
                                </ICol>
                            </Row>
                            <Row class="row">
                                <ICol span="24">
                                    <FormItem label="邮箱地址" prop="stEmail">
                                        <Input prefix="md-mail" v-model.trim="registForm.stEmail" placeholder="邮箱地址" clearable />
                                    </FormItem>
                                </ICol>
                            </Row>
                            <Row class="row">
                                <ICol span="24">
                                    <FormItem label="登录密码" prop="stPassword">
                                        <Input :type="seePwd ? 'text' : 'password'" prefix="ios-lock" v-model.trim="registForm.stPassword" placeholder="登录密码">
                                            <Icon class="eye" style="cursor: pointer;" @click="seePwd = !seePwd" :type="seePwd ? 'ios-eye' : 'ios-eye-off'" slot="suffix" />
                                        </Input>
                                    </FormItem>
                                </ICol>
                            </Row>
                            <Row class="row">
                                <ICol span="24">
                                    <FormItem label="确认密码" prop="comfirmPassword">
                                        <Input :type="seeSubPwd ? 'text' : 'password'" prefix="ios-lock-outline" v-model.trim="registForm.comfirmPassword" placeholder="确认密码">
                                            <Icon class="eye" style="cursor: pointer;" @click="seeSubPwd = !seeSubPwd" :type="seeSubPwd ? 'ios-eye' : 'ios-eye-off'" slot="suffix" />
                                        </Input>
                                    </FormItem>
                                </ICol>
                            </Row>
                            <Button size="large" :loading="isShowLoading" class="submit regist" type="primary" @click="register">注册</Button>
                            <!-- <p class="account"><span @click="tab = true">用户登录</span></p> -->
                        </Form>
                    </div>
                </transition>
            </div>
        <!-- </transition> -->
    </div>
</template>

<script>
import { adminLogin, adminRegister, validateLoginName } from '@/api/api';
import { setCookie } from '@/utils/cookie';
export default {
    name: 'loginPage',
    data() {
        const validatePassWord = (rule, value, callback) => {
            let reg = new RegExp(/^(?=.*[a-zA-Z]+)(?=.*[0-9]+)[a-zA-Z0-9]+$/);
            if (value === '') {
               return callback(new Error('请输入密码'));
            } else if (!reg.test(value)) {
               return callback(new Error('密码必须包含英文和数字'));
            } else if (this.registForm.comfirmPassword && value !== this.registForm.comfirmPassword) {
               return callback(new Error('两次密码输入不一致请重新输入'));
            } else {
               return callback();
            }
        };
        const validatePassCheck = (rule, value, callback) => {
            if (value === '') {
               return callback(new Error('请二次输入确认密码'));
            } else if (this.registForm.stPassword && value !== this.registForm.stPassword) {
               return callback(new Error('两次密码输入不一致请重新输入'));
            } else {
               return callback();
            }
        };
        const validatePhoneCheck = (rule, value, callback) => {
            let reg = new RegExp(/\d$/);
            if (value === '') {
               return callback(new Error('请输入手机号码'));
            } else if (!reg.test(value)) {
               return callback(new Error('请输入正确的手机号码'));
            } else if (value.length < 11) {
               return callback(new Error('请输入至少11位手机号码'));
            } else {
               return callback();
            }
        };
        const validateName = async (rule, value, callback) => {
            if (value === '') {
               return callback(new Error('请输入用户名'));
            } else if (this.registForm.stName && this.registForm.stLoginName) {
                //TODO: 这里检查用户名唯一性，接口待联调
                const res = true;
                // const res = await this.checkNameFun();
                // console.log(res);
                return res ? callback() : callback(new Error('用户名已存在'));
            } else {
               return callback();
            }
        };
        return {
            tab: true,
            hasNameTag: false,
            checkNameFun: null,
            loginForm: {
                account: '',
                pwd: '',
            },
            loginRuleValidate: {
                account: [
                    { required: true, message: '请输入登录名', trigger: 'blur' }
                ],
                pwd: [
                    { required: true, message: '请输入登录密码', trigger: 'blur' }
                ]
            },
            seeLoginPwd: false,
            seePwd: false,
            seeSubPwd: false,
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
                stLoginName: [
                    { required: true, message: '请输入登录名', trigger: 'blur' }
                ],
                stName: [
                    { required: true, message: '请输入用户名', trigger: 'blur' },
                    { require: true, validator: validateName, trigger: 'blur' }
                ],
                stPhoneNum: [
                    { required: true, validator: validatePhoneCheck, trigger: ['blur','change'] }
                ],
                stEmail: [
                    { required: true, message: '请输入邮箱', trigger: ['blur','change'] },
                    { required: true, type: 'email', message: '请输入正确邮箱', trigger: 'blur' }
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
        // this.bg.backgroundImage = `url(https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1591357660532&di=28d8e7bd58201a4e00260116a0f098bc&imgtype=0&src=http%3A%2F%2Fattachments.gfan.net.cn%2Fforum%2F201504%2F14%2F075409wgwijxiax3i4wihw.jpg)`
        this.bg['backgroundImage'] = `url(${require('../../assets/bg01.jpg')})`;
        this.bg['background-position'] = 'center';
        this.checkNameFun = _.debounce(this.debounceCheckName, 500);
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
        async debounceCheckName() {
            if (!this.registForm.stName || !this.registForm.stLoginName) return true;
            let params = {
                ctId: this.registForm.stName,
                ctLoginName: this.registForm.stLoginName
            }
            this.hasNameTag = true;
            const res = await validateLoginName(params);
            this.hasNameTag = false;
            console.log(!!(res && res.data));
            return !!(res && res.data);
        },
        forgetPwd() {
            this.$router.push('/unlogin')
        },
        async login() {
            let tag = false;
            const gotoSuccess = async (tag) => {
                if (this.loginForm.account && this.loginForm.pwd && tag) {
                    this.isShowLoading = true;
                    const res = await adminLogin({
                        ctLoginName: this.loginForm.account,
                        ctPassword: this.loginForm.pwd
                    });
                    this.isShowLoading = false;
                    // console.log(res, !_.isEmpty(res))
                    if (res && !_.isEmpty(res) && res.data) {
                        let data = res.data;
                        this.$store.commit('SET_ADMIN_INFO', data);
                        setCookie(data);
                        if (this.$store.getters.getAdminToken) {
                            this.$Message.success('登录成功');
                            this.$router.push({ path: 'management' });
                        }
                    }
                    //  else {
                    //     this.$Message.success('登录失败，请重试');
                    // }
                    // this.$router.push({ path: 'management' })
                }
            }
            this.$refs['loginF'].validate((valid) => {
                if (valid) {
                    tag = true;
                    gotoSuccess(tag);
                } else {
                    this.$Message.error('请输入正确登录名和密码');
                }
            });
        },
        afterLogin(res) {
            let data = res.data;
            this.$store.commit('SET_ADMIN_INFO', data);
            setCookie(data);
            if (this.$store.getters.getAdminToken) {
                this.$Message.success('登录成功');
                this.$router.push({ path: 'management' });
            }
        },
        async register() {
            let tag = false;
            const gotoSuccess = async (tag) => {
                let isEmpty = false;
                for(let k in this.registForm) {
                    if (!this.registForm[k]) { isEmpty = true; break; }
                }
                if (!isEmpty && tag) {
                    let params = {
                        ctName: this.registForm.stName,
                        ctLoginName: this.registForm.stLoginName,
                        ctPassword: this.registForm.stPassword
                    };
                    const res = await adminRegister(params);
                    if (res && !_.isEmpty(res) && res.data) {
                        setTimeout(() => {
                            this.afterLogin(res)
                        }, 2000);
                        this.$Message.loading({
                            content: '注册成功，即将为您登录'
                        });
                    } else {
                        this.$Message.success('登录失败，请重试');
                    }
                } else {
                    this.$Message.error('请输入正确注册信息');
                }
            }
            this.$refs.registF.validate((valid) => {
                console.log(valid)
                if (valid) {
                    tag = true;
                    gotoSuccess(tag);
                } else {
                    this.$Message.error('请输入正确注册信息');
                }
            });
        }
    }
}
</script>

<style lang="scss" scoped>
.demo-spin-icon-load{
    animation: ani-demo-spin 1s linear infinite;
    color: black !important;
}
.login-enter-active {
    transition: all .8s ease;
}
.login-leave-active {
    transition: all .1s ease;
}
.login-enter, .login-leave-to /* .fade-leave-active below version 2.1.8 */ {
    transform: translateX(-50px);
    opacity: 0;
}
.regist-enter-active {
    transition: all .8s ease;
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
    // justify-content: center;
    align-items: center;
    color: #fff;
    background-size: cover;
    background-repeat: no-repeat;
    & .container {
        background: rgba(0, 0, 0, .7);
        width: 375px;
        margin-left: 200px;
        border-radius: 10px;
        padding: 0 10px;
        display: flex;
        align-items: center;
        position: relative;
        transition: height ease-out 0.3s;
        height: 400px;
        &.registH {
            transition: height ease-in 0.3s;
            height: 715px 
        }
        & .flex-container {
            width: 100%;
            margin-top: 35px;
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
        & .eye {
            color: black;
        }
    }
    ::v-deep .registForm {
        & .ivu-form-item {
            & .ivu-form-item-label {
                color: white;
                font-size: 14px;
            }
        }
        & .eye {
            color: black;
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
        // height: 80px;
        width: 90%;
        // padding: 40px;
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