<template>
    <div class="index-vue-unlogin-frame">
        <Layout>
            <Header class="header">
                <div class="header-inner">
                    <div class="logo-c">
                        <img src="../../assets/logo.png" alt="logo" class="logo">
                        <span>{{ totalTitle }}</span>
                    </div>
                    <div class="login-c" v-if="iscomponent === 'Index'">
                        <span @click="goToLogin">登陆</span>
                        <span @click="goToLogin('register')">注册</span>
                    </div>
                </div>
            </Header>
            <Content class="content">
                <component :is="iscomponent" :type="'unlogin'"></component>
            </Content>
            <!-- <Footer>Footer</Footer> -->
        </Layout>
    </div>
</template>
<script>
import ForgetPawssword from '../common/ForgetPassword';
import Index from '../common/Index';
import Error from '../admin/404';
export default {
    name: 'UnLogin',
    components: {Index, ForgetPawssword, Error},
    data() {
        return {
            iscomponent: '',
            totalTitle: ''
        }
    },
    methods: {
        goToLogin(type) {
            this.$router.push('/admin/login?' + '?type=' + type)
       }
    },
    beforeMount() {
        console.log(this.$route.params.page)
        if (this.$route.params.page) {
            if (this.$route.params.page === 'index') {
                this.iscomponent = 'Index';
                this.totalTitle = '码雷';
            } else if (this.$route.params.page === 'unlogin') {
                this.iscomponent = 'ForgetPawssword';
                this.totalTitle = '忘记密码';
            } else {
                this.iscomponent = 'Error';
            }
        }
    }
}
</script>
<style lang="scss" scoped>
.index-vue-unlogin-frame {
    .header {
        padding: 0 10px;
        &-inner {
            margin: 0 auto;
            width: 1200px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            height: 100%;
        }
        .logo-c {
            display: flex;
            align-items: center;
            justify-content: flex-start;
            height: 100%;
            padding: 10px 10px 10px 0;
            & img {
                height: 100%;
            }
            & span {
                font-size: 18px;
                color: rgba(255,255,255,.8);
                font-weight: bold;
            }
        }
        .login-c {
            margin-right: 0;
            & span {
                font-size: 18px;
                color: rgba(255,255,255,.8);
                margin-right: 15px;
                cursor: pointer;
                font-weight: bold;
                &:last-child {
                    margin-right: 0;
                }
                &:hover {
                    color: #2d8cf0;
                    // text-decoration: underline;
                }
            }
        }
    }
    .content {
        background-color: white;
        height: calc(100vh - 64px);
    }
}
</style>