<template>
    <div class="index-vue-seatsetting">
        <!-- <AlertPopup v-if="errorTips.show" :data="errorTips" @onClose="onClose"></AlertPopup> -->
        <div class="left-side">
            <div class="input-area">
                <p>输入你所需要的最大行列数</p>
                <div class="input-area-item">
                    <section class="item">
                        <label>行数: </label>
                        <Input type="number" style="width: 70%" v-model="rowNum" size="large" placeholder="输入数字"  />
                    </section>
                    <section class="item">
                        <label>列数: </label>
                        <Input type="number" style="width: 70%" v-model="colNum" size="large" placeholder="输入数字" />
                    </section>
                </div>
                <div class="input-area-button">
                    <b>查看图例</b>
                    <Button size="default" type="primary" @click="settingStart">确定生成</Button>
                </div>
            </div>
        </div>
        <div class="right-side">
            <h1>会场阵列图</h1>
            <div class="show-area">
                <div class="seat-area">
                    <div class="seat-area-row" v-for="(itemi, indexI) in seatList" :key="indexI">
                        <div v-for="(itemj, indexJ) in seatList[indexI]" :key="indexJ" class="seat-area-row-item" @click="selectItem(indexI, indexJ)">
                            <Icon :class="itemj ? 'active' : ''" type="md-cube" />
                        </div>
                    </div>
                </div>
            </div>
            <div class="button-area">
                <Button size="default" type="primary" @click="clearSeat">重置布置</Button>
                <Button size="default" type="primary">确定生成</Button>
            </div>
        </div>
    </div>
</template>
<script>
import AlertPopup from '../../frame/AlertPopup'
export default {
    name: 'Setting',
    components: {AlertPopup},
    data() {
        return {
            rowNum: 0,
            colNum: 0,
            seatList: [],
            errorTips: {
                show: false,
                type: '',
                title: '',
                desc: ''
            }
        }
    },
    methods: {
        onClose() {
            this.errorTips.show = false;
        },
        settingStart() {
            if (Number(this.rowNum) < 0 || Number(this.colNum) < 0) {
                this.errorTips.title = '输入数字不能少于0';
                this.errorTips.type = 'warning';
                this.errorTips.show = true;
                return;
            }
            this.seatList = [];
            for(let i = 0; i < this.rowNum; i++) {
                this.seatList[i] = [];
                for(let j = 0; j < this.colNum; j++) {
                this.seatList[i][j] = 1;
                }
            }
        },
        clearSeat() {
            this.seatList = [];
        },
        selectItem(i, j) {
            this.seatList[i][j] = this.seatList[i][j] ? undefined : 1
            this.$forceUpdate();
        }
    },
    beforeMount() {
        
    }
}
</script>
<style lang="scss" scoped>
.index-vue-seatsetting {
    min-width: 1300px;
    height: 100%;
    display: flex;
    & .left-side {
        width: 25%;
        max-width: 400px;
        border-right: 1px solid gray;
        & .input-area {
            padding: 20px;
            border-bottom: 1px solid gray;
            &-item {
                & .item {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    margin-bottom: 10px;
                    &:first-child {
                        margin-top: 10px;
                    }
                    ::v-deep .ivu-input-wrapper {
                        margin-left: 10px;
                    }
                }
            }
            &-button {
                display: flex;
                align-items: center;
                justify-content: space-around;
                & b {
                    font-size: 14px;
                    color: lightskyblue;
                    text-decoration: underline;
                    cursor: pointer;
                }
            }
            & p, label {
                font-weight: bold;
                font-size: 14px;
                color: black;
            }
        }
    }
    & .right-side {
        flex: 1;
        padding: 20px 30px;
        display: flex;
        flex-direction: column;
        & h1 {
            font-size: 32px;
        }
        & .show-area {
            border: 1px solid black;
            background: white;
            display: flex;
            align-items: center;
            justify-content: center;
            flex: 1;
            .seat-area {
                width: fit-content;
                margin: auto;
                padding: 0 10px;
                &-row {
                    display: flex;
                    // justify-content: space-between;
                    flex-direction: row;
                    padding: 10px 0;
                    &-item {
                        margin-right: 10px;
                        &:last-child {
                            margin-right: 0;
                        }
                        & i {
                            font-size: 25px;
                            &.active {
                                color: orange;
                            }
                        }
                    }
                }
            }
        }
        & .button-area {
            padding: 10px;
            text-align: right;
            & button {
                &:first-child {
                    margin-right: 10px;
                }
            }
        }
    }
}
</style>