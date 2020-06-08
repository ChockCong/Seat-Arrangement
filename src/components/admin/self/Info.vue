<template>
    <div class="index-vue-info">
        <div class="img-line">
            <div class="user-img-c">
                <Icon type="logo-android" />
            </div>
            <div class="helper"></div>
        </div>
        <div class="content-wrap">
            <div class="button-wrap">
                <Button type="warning">会员升级</Button>
                <Button type="info">会员续费</Button>
            </div>
            <ul>
                <li>
                    <span>用户名</span>
                    <Tag color="green">{{adminInfo.username}}</Tag>
                </li>
                <li>
                    <span>电子邮箱</span>
                    <Tag color="green">{{adminInfo.email}}</Tag>
                </li>
                <li>
                    <span>电话号码</span>
                    <Tag color="green">{{adminInfo.phoneNo}}</Tag>
                </li>
                <li>
                    <span>公司名字</span>
                    <Tag color="green">{{adminInfo.company.name}}</Tag>
                </li>
                <li>
                    <span>公司地址</span>
                    <Tag color="green">{{adminInfo.company.address}}</Tag>
                </li>
                <li>
                    <span>权限</span>
                    <Tag color="green">{{level}}</Tag>
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
    name: 'Info',
    computed: {
        ...mapGetters({
			adminInfo: 'getAdminInfo'
        }),
        level() {
            let role = ''
            switch(this.adminInfo.level) {
                case 1 : role = '普通用户'; break;
                case 2 : role = '普通会员'; break;
                case 3 : role = 'VIP会员'; break;
                default : role = '管理员';
            }
            return role;
        }
    }
}
</script>
<style lang="scss" scoped>
.index-vue-info {
    height: 100%;
    & .img-line {
        position: relative;
        display: flex;
        align-items: center;
        height: 100px;
        padding-top: 50px;
        & .user-img-c {
            position: absolute;
            width: 100px;
            height: 100px;
            background: gray;
            border-radius: 50%;
            overflow: hidden;
            display: flex;
            justify-content: center;
            align-items: center;
            left: 0;
            right: 0;
            margin: 0 auto;
            & i {
                font-size: 50px;
                color: #6af64a
            }
        }
        & .helper {
            width: 100%;
            height: 1px;
            border: 1px solid gray;
        }
    }
    & .content-wrap {
        padding-top: 60px;
        position: relative;
        display: flex;
        justify-content: center;
        & .button-wrap {
            position: absolute;
            top: 10px;
            right: 20px;
            & button {
                margin-left: 10px;
            }
        }
        & ul {
            text-align: left;
            & li {
                font-size: 16px;
                margin-bottom: 10px;
                list-style-type:none;
                & span{
                    width: 100px;
                    display: inline-block;
                }
                & .ivu-tag {
                    font-size: 14px;
                }
            }
        }
    }
}
</style>