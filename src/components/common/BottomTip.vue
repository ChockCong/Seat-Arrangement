<template>
    <div class="index-vue-bottom-tip">
        <div class="tip-box">
            <Poptip trigger="hover" placement="right">
                <i class="iconfont iconweixinzhifu"></i>
                <img slot="content" width="100" height="100" src="../../assets/qrcode.png" />
            </Poptip>
        </div>
        <div class="tip-box">
            <Poptip trigger="hover" content="电话：13200000000" placement="right">
                <Icon type="ios-call" />
            </Poptip>
        </div>
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
    bottom: 50px;
    box-shadow: 2px 2px 15px #282828;
    & .tip-box {
        cursor: pointer;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 35px;
        background: #57a3f3;
        border-bottom: 1px white solid;
        & i {
            color: white;
            font-size: 20px;
        }
        &:last-child {
            border: 0;
        }
    }
}
</style>