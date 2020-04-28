<template>
    <div class="index-vue-seatsetting">
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
            <h3 v-if="step">{{`第${step}步：${stepName}`}}</h3>
            <div class="show-area">
                <div class="seat-area">
                    <div class="seat-area-row" v-for="(itemi, indexI) in seatList" :key="indexI">
                        <template v-for="(itemj, indexJ) in seatList[indexI]">
                             <!-- :style="fullColor(itemj.value)" full-->
                            <div :key="indexJ" v-if="itemj.value && itemj.value !== step" class="seat-area-row-item">
                                <Icon v-if="itemj.value === 1" :class="differentColor(itemj.value)" type="ios-bowtie" />
                                <Icon v-if="itemj.value === 2" :class="differentColor(itemj.value)" type="ios-star" />
                            </div>
                            <div v-else :key="indexJ" class="seat-area-row-item" :class="previewTag ? 'full' : ''" @click="selectItem(indexI, indexJ)">
                                <template v-if="!previewTag">
                                    <Icon :class="differentColor(itemj.value)" type="md-cube" />
                                </template>
                                <template v-else>
                                    <Icon v-if="itemj.value" :class="differentColor(itemj.value)" type="md-cube" />
                                </template>
                            </div>
                        </template>
                    </div>
                </div>
            </div>
            <div class="button-area" :class="step === 3 ? 'step_3' : ''">
                <section v-if="step === 3">
                    <Button type="primary" @click="selecLeave(3)">全选剩余位置</Button>
                    <Button type="primary" @click="selecLeave(0)">取消全选剩余位置</Button>
                </section>
                <section>
                    <Button size="default" type="primary" @click="clearSeatpreview">重置布置</Button>
                    <Button v-if="[1,2].includes(step)" size="default" type="primary" @click="nextStep">下一步</Button>
                    <Button v-else size="default" type="primary" @click="preview">确定预览</Button>
                </section>
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
            step: 0,
            previewTag: false
        }
    },
    computed: {
        stepName() {
            switch(this.step) {
                case 1 : return '确定舞台位置';
                case 2 : return '确定入口位置';
                case 3 : return '确定舞所有座位';
            }
        }
    },
    methods: {
        differentColor(value) {
            switch(value) {
                case 1 : return 'active-stage';
                case 2 : return 'active-door';
                case 3 : return 'active-table';
                default: return '';
            }
        },
        fullColor(value) {
            switch(value) {
                case 1 : return 'background-color: blue;';
                case 2 : return 'background-color: violet;';
                case 3 : return 'background-color: orange;';
                default: return '';
            }
        },
        settingStart() {
            if (Number(this.rowNum) < 0 || Number(this.colNum) < 0) {
                this.$Message.warning({content: '输入数字不能少于0', closable: true});
                return;
            }
            this.seatList = [];
            for(let i = 0; i < Number(this.rowNum) + 2; i++) {
                this.seatList[i] = [];
                for(let j = 0; j < Number(this.colNum) + 2; j++) {
                this.seatList[i][j] = {value: 0, No: -1};
                }
            }
            this.step = 1;
        },
        clearSeat() {
            this.seatList = [];
            this.rowNum = 0;
            this.colNum = 0;
            this.step = 0;
        },
        nextStep() {
            this.step = this.step === 1 ? 2 : 3;
        },
        drag(e) {
            console.log(e);
        },
        selectItem(i, j) {
            this.seatList[i][j].value = this.seatList[i][j].value ? 0 : this.step;
            this.$forceUpdate();
        },
        selecLeave(type) {
            this.seatList.forEach((item, i) => {
                item.forEach((val, j) => {
                    if (![1,2].includes(val.value)) val.value = type;
                })
            });
            this.$forceUpdate();
        },
        preview() {
            this.previewTag = !this.previewTag;
        }
    },
    beforeMount() {
        
    }
}
</script>
<style lang="scss" scoped>
@keyframes fadeIn {
    0% {
        opacity: 0; /*初始状态 透明度为0*/
    }
    50% {
        opacity: 0; /*中间状态 透明度为0*/
    }
    100% {
        opacity: 1; /*结尾状态 透明度为1*/
    }
}
.index-vue-seatsetting {
    min-width: 1300px;
    height: 100%;
    display: flex;
    // overflow: hidden;
    & .left-side {
        min-width: 300px;
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
        min-width: 1000px;
        & h1 {
            font-size: 32px;
        }
        & h3 {
            font-size: 16px;
            text-align: left;
        }
        & .show-area {
            border: 1px solid black;
            background: white;
            display: flex;
            align-items: center;
            // justify-content: center;
            flex: 1;
            width: 100%;
            overflow-x: auto;
            overflow-y: auto;
            padding: 10px;
            .seat-area {
                width: fit-content;
                margin: auto;
                padding: 0 10px;
                &-row {
                    display: flex;
                    // justify-content: space-between;
                    flex-direction: row;
                    // padding: 10px 0;
                    &-item {
                        margin-right: 20px;
                        margin-bottom: 20px;
                        &:last-child {
                            margin-right: 0;
                        }
                        &.full {
                            height: 25px;
                            width: 25px;
                        }
                        & i {
                            font-size: 25px;
                            &.active-table {
                                color: orange;
                            }
                            &.active-stage {
                                color: blue;
                            }
                            &.active-door {
                                color: violet;
                            }
                        }
                    }
                }
            }
        }
        & .button-area {
            padding: 10px 0;
            display: flex;
            justify-content: flex-end;
            &.step_3 {
                justify-content: space-between;
            }
            & button {
                &:first-child {
                    margin-right: 10px;
                }
            }
        }
    }
}
</style>