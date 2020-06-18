<template>
    <div class="index-vue-seatusing">
        <div class="right-side">
            <div class="title-area">
                <Steps :current="step - 1" size="small" class="step-bar">
                    <Step :title="`选择会场模板`" content=""></Step>
                    <Step :title="`上传宾客名单`" content=""></Step>
                    <Step :title="`生成预览`" content=""></Step>
                    <!-- <Step :title="`第4步：确定座位编号`" content=""></Step> -->
                </Steps>
                <section  class="button-area-item" v-if="step < 4">
                </section>
                <section  class="button-area-item" v-if="step === 4">
                </section>
            </div>
            <div class="show-area">
            </div>
        </div>
        <Loading v-if="loading"></Loading>
    </div>
</template>
<script>
export default {
    name: 'Using',
    data() {
        return {
            step: 1,
            loading: false
        }
    }
}
</script>
<style lang="scss" scoped>
.index-vue-seatusing {
    min-width: 1000px;
    height: 100%;
    display: flex;
    & .right-side {
        flex: 1;
        padding: 10px 30px;
        display: flex;
        flex-direction: column;
        // min-width: 1000px;
        & h1 {
            font-size: 32px;
        }
        & h3 {
            font-size: 16px;
            text-align: left;
            &.red {
                color:tomato;
            }
        }
        & .title-area {
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            padding: 10px 0;
            border-bottom: 2px solid #e8eaec;
            & .step-bar {
                width: 60%;
                text-align: left;
                // height: 40px;
            }
            @media screen and (max-width: 1350px) {
               & .step-bar {
                    width: 730px;
                    // text-align: left;
                }
            }
            & .button-area {
                // padding: 0 50px;
                // & p {
                //     font-weight: bold;
                //     font-size: 14px;
                //     color: black;
                //     margin-top: 10px;
                // }
                &-item {
                    display: flex;
                    // flex-direction: column;
                    // margin-top: 20px;
                    & button {
                        margin-right: 10px;
                        &:last-child {
                            margin-right: 0;
                        }
                    }
                    & .gary {
                        background-color: lightgray;
                        color: white !important;
                        border-color: lightgray
                    }
                    & .mutiply {
                        background-color: orangered !important;
                        color: white !important;
                    }
                }
            }
        }
        & .show-area {
            // border: 1px solid lightgray;
            // border-radius: 10px;
            // // box-shadow: 1px 1px 5px gray;
            // background: white;
            // display: flex;
            // align-items: center;
            // justify-content: center;
            flex: 1;
            width: 100%;
            overflow-x: auto;
            overflow-y: auto;
            padding: 10px;
        }
        & .button-area {
            padding: 10px 0;
            &.step_3 {
                justify-content: space-between;
            }
            & button {
                margin-right: 10px;
                float: right;
                &.reset {
                    float: left;
                }
            }
        }
    }
}
</style>