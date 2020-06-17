<template>
    <Modal v-model="copyShow" :mask-closable="false" :title="'选择支付方式'" @on-visible-change="close">
        <div class="index-vue-pay-popup">
            <RadioGroup class="group" v-model="payType">
                <section>
                    <i class="iconfont iconweixinzhifu"></i>
                    <p><Radio label="微信支付"></Radio></p>
                </section>
                <section>
                    <i class="iconfont iconzhifubao"></i>
                    <p><Radio label="支付宝支付"></Radio></p>
                </section>
            </RadioGroup>
        </div>
    </Modal>
</template>
<script>
export default {
    name: 'PayPopup',
    model: {
        prop: 'show',
        event: 'change'
    },
    props: {
        show: Boolean
    },
    data() {
        return {
            copyShow: false,
            payType: '微信支付'
        }
    },
    watch: {
        show: {
            immediate: true,
            handler: function(value) {
                this.copyShow = value;
            }
        }
    },
    methods: {
        close() {
            this.$emit('change', this.copyShow);
        }
    }
}
</script>
<style lang="scss" scoped>
.index-vue-pay-popup {
    height: 200px;
    display: flex;
    align-items: center;
    & .group {
        display: flex;
        align-items: center;
        justify-content: space-around;
        width: 100%;
        & section {
            text-align: center;
            & i {
                font-size: 48px;
                &.iconweixinzhifu {
                    color: #03dd6d;
                }
                &.iconzhifubao {
                    color: #00a0e9;
                }
            }
        }
    }
}
</style>