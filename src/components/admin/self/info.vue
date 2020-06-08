<template>
    <div class="index-vue-info">
        <div class="img-line">
            <div class="user-img-c">
                <Icon type="logo-android" />
            </div>
            <div class="helper"></div>
        </div>
        <div class="content-wrap">
            <ul>
                <li>用户名：管理员</li>
                <li>角色：管理页</li>
                <li>密码: **********</li>
                <li>是否会员: 是</li>
            </ul>
        </div>
    </div>
</template>
<script>
export default {
    name: 'Info'
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
        & ul {
            text-align: left;
            & li {
                list-style-type:none;
            }
        }
    }
}
</style>