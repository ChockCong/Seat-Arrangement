<template>
    <div class="index-vue-home" :class="!showLogo ? 'unflex' : ''">
        <transition name="logoh">
            <template v-if="showLogo">
                <div class="logo-wrap">
                    <img alt="Vue logo" src="../../assets/logo.png">
                    <h1>{{ '欢迎使用码雷管理平台' }}</h1>
                </div>
            </template>
        </transition>
        <transition name="logos">
            <template v-if="!showLogo">
               <div class="logo-wrap">
                   <div style="margin-bottom: 10px;text-align: left;font-size: 14px;">
                       <b>常用功能介绍</b>
                    </div>
                    <Alert type="warning" class="notice-item" show-icon>
                        设置账号
                        <Icon type="ios-bulb-outline" slot="icon"></Icon>
                        <template slot="desc">
                            <p>1.账号中心->账号管理->个人信息: 可设置本账号信息(昵称，邮箱等)</p>
                            <p>2.账号中心->账号管理->子账号信息: 可新增子账号并设置子账号信息(昵称，邮箱，密码等)</p>
                        </template>
                    </Alert>
                    <Alert type="warning" class="notice-item" show-icon>
                        会场排位
                        <Icon type="ios-bulb-outline" slot="icon"></Icon>
                        <template slot="desc">
                            <p>使用流程：</p>
                            <p><b>1.会场中心->新增模板:</b> 通过四个步骤简单设置一个带有号码的会场（宴会厅/会议厅）平面图</p>
                            <p><b>2.会场中心->新增会场:</b> 选择1中新增的模板并填写会场举办信息，新增一个即将举办的宴会或会议最后获取小程序码。可查看、编辑已新增模板的平面图和基本信息</p>
                            <p><b>3.会场中心->会场记录:</b> 查看1中新增成功的会场，可查看、编辑会场平面图和基本信息，对会场上传宾客名单即可完成一个完整会场</p>
                            <p><b>4.小程序端: </b>到达指定时间，宾客扫小程序码即可查看各自的座位信息</p>
                        </template>
                    </Alert>
                    <Alert type="warning" class="notice-item" show-icon>
                        互动视频
                        <Icon type="ios-bulb-outline" slot="icon"></Icon>
                        <template slot="desc">
                            <p>1.工具中心->互动视频: 上传mp4或flv格式视频，可现在播放视频，宾客可发送弹幕互动</p>
                        </template>
                    </Alert>
                </div>
            </template>
        </transition>
    </div>
</template>
<script>
export default {
    name: 'Home',
    data() {
        return {
            showLogo: true,
            st: null
        }
    },
    mounted() {
        this.st = setTimeout(() => {
            this.showLogo = false;
        }, 2000)
    },
    beforeDestroy() {
        if (this.st) clearTimeout(this.st)
    }
}
</script>
<style lang="scss" scoped>
.index-vue-home {
    height: 100%;
    flex-direction: column;
    display: flex;
    align-items: center;
    justify-content: center;
    &.unflex {
        display: block;
        padding: 10px 0;
    }
    .logoh-leave-active {
        transition: all .8s ease;
    }
    .logoh-enter, .logoh-leave-to /* .fade-leave-active below version 2.1.8 */ {
        transform: translateY(-100px);
        opacity: 0;
        // display: none
    }
    .logos-enter-active {
        transition: all 1.2s ease;
    }
    .logos-enter, .logos-leave-to /* .fade-leave-active below version 2.1.8 */ {
        transform: translateY(100px);
        opacity: 0;
        // display: none
    }
    .logo-wrap {
        padding: 0 20px;
    }
    & img {
        height: 300px;
    }
    & h1 {
        font-size: 48px;
    }
    & .notice-item {
        text-align: left;
        ::v-deep .ivu-alert-desc {
            p {
                line-height: 2;
                font-size: 13px;
            }
        }
    }
}
</style>