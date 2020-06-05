<template>
    <div class="index-vue-unlogin-frame">
        <Layout>
            <Header class="header">
                <div class="logo-c">
                    <img src="../../assets/logo.png" alt="logo" class="logo">
                    <span>忘记密码</span>
                </div>
            </Header>
            <Content class="content">
                <component :is="iscomponent"></component>
            </Content>
            <!-- <Footer>Footer</Footer> -->
        </Layout>
    </div>
</template>
<script>
import ForgetPawssword from '../common/ForgetPassword'
export default {
    name: 'UnLogin',
    components: {ForgetPawssword},
    data() {
        return {
            iscomponent: ''
        }
    },
    mounted() {
        if (this.$route.name === 'unLogin') {
            this.iscomponent = 'ForgetPawssword';
        }
    }
}
</script>
<style lang="scss" scoped>
.index-vue-unlogin-frame {
    .header {
        padding: 0 10px;
    }
    .logo-c {
        display: flex;
        align-items: center;
        justify-content: flex-start;
        height: 100%;
        & img {
            height: 100%;
        }
        & span {
            font-size: 16px;
            color: rgba(255,255,255,.8);
        }
    }
    .content {
        height: calc(100vh - 64px);
    }
}
</style>