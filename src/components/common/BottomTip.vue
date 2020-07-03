<template>
    <div class="index-vue-bottom-tip">
        <Poptip trigger="hover" :title="'微信'" placement="right">
            <div class="tip-box">
                <i class="iconfont iconweixinzhifu"></i>
            </div>
            <img slot="content" width="100" height="100" src="../../assets/qrcode.png" />
        </Poptip>
        <Poptip trigger="hover" :content="'电话：13200000000'" placement="right">
            <div class="tip-box no-b">
                <Icon type="ios-call" />
            </div>
        </Poptip>
    </div>
</template>
<script>
export default {
    name: 'BTip'
}
</script>
<style lang="scss" scoped>
.index-vue-bottom-tip {
    width: 35px;
    position: fixed;
    z-index: 9999;
    bottom: 75px;
    // box-shadow: 2px 2px 10px #282828;
    & .tip-box {
        cursor: pointer;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 35px;
        height: 35px;
        background: #57a3f3;
        border-bottom: 1px white solid;
        &.no-b {
            border: 0;
        }
        & i {
            color: white;
            font-size: 20px;
        }
        &:hover {
            width: 40px;
        }
    }
}
</style>