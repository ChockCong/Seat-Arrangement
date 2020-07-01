<template>
<div class="index-vue">
    <header>
        <div class="h-right">
            <!-- 消息 -->
            <!-- <div class="notice-c" @click="noticesShow = true" title="查看新消息">
                <div :class="{newMsg: hasNewMsg}"></div>
                <Icon type="ios-notifications-outline" />
            </div> -->
            <!-- 用户头像 -->
            <div class="user-img-c">
                <Icon type="logo-android" />
                <!-- <img :src="userImg"> -->
            </div>
            <!-- 下拉菜单 -->
            <Dropdown trigger="click" @on-click="userOperate" @on-visible-change="showArrow">
                <div class="pointer">
                    <span>{{adminInfo.username}}</span>
                    <Icon v-show="arrowDown" type="md-arrow-dropdown"/>
                    <Icon v-show="arrowUp" type="md-arrow-dropup"/>
                </div>
                <DropdownMenu slot="list">
                    <!-- name标识符 -->
                    <!-- <DropdownItem name="1">修改密码</DropdownItem>
                    <DropdownItem name="2">基本资料</DropdownItem> divided-->
                    <DropdownItem  name="3">退出登陆</DropdownItem>
                </DropdownMenu>
            </Dropdown>
        </div>
    </header>
</div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
    name: 'Header',
    data() {
        return {
            arrowUp: false, // 用户详情向上箭头
            arrowDown: true, // 用户详情向下箭头
        }
    },
    computed: {
        ...mapGetters({
			adminInfo: 'getAdminInfo'
        })
    },
    methods: {
        // 用户操作
        userOperate(name) {
            switch (name) {
                case '1':
                    // 修改密码
                    this.gotoPage('password')
                    break
                case '2':
                    // 基本资料
                    this.gotoPage('userinfo')
                    break
                case '3':
                    this.$router.replace({ name: 'login' })
                    break
            }
        },
        // 控制用户三角箭头显示状态
        showArrow(flag) {
            this.arrowUp = flag
            this.arrowDown = !flag
        },
    }
}
</script>
<style lang="scss" scoped>
.index-vue {
    header {
        height: 50px;
        border-bottom: none;
        background: #fff;
        display: flex;
        align-items: center;
        justify-content: flex-end;
        padding-right: 40px;
        padding-left: 10px;
        font-size: 14px;
    }
    header .ivu-icon {
        font-size: 24px;
    }
    .h-right {
        display: flex;
        align-items: center;
    }
    .user-img-c {
        width: 35px;
        height: 35px;
        background: gray;
        border-radius: 50%;
        margin: 0 40px;
        overflow: hidden;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
        & i {
            color: #6af64a
        }
    }
}
</style>