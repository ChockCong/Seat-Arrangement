<template>
    <div class="index-vue-seatsetting">
        <div class="left-side">
            <div class="input-area">
                <p>{{'输入你所需要的最大行列数'}}</p>
                <div class="input-area-item">
                    <section class="item">
                        <label>行数: </label>
                        <Input type="number" :disabled="!editTag" style="width: 70%" v-model="rowNum" size="large" placeholder="输入数字"  />
                    </section>
                    <section class="item">
                        <label>列数: </label>
                        <Input type="number" :disabled="!editTag" style="width: 70%" v-model="colNum" size="large" placeholder="输入数字" />
                    </section>
                </div>
                <div class="input-area-button">
                    <b>查看图例</b>
                    <Button size="default" type="primary" @click="settingStart">确定生成</Button>
                </div>
            </div>
            <div class="button-area" v-if="!editTag && !previewTag">
                <p>{{'快捷方式'}}</p>
                <section  class="button-area-item">
                    <Button v-if="step < 4" :class="!posMutipliTag ? 'mutiply' : 'gary'" :type="'default'" @click="posSelectControl">
                        {{'单选位置'}}
                    </Button>
                    <Button v-if="step < 4" :class="posMutipliTag ? 'mutiply' : 'gary'" :type="'default'" @click="posSelectControl">
                        {{ '多选位置' }}
                    </Button>
                    <Button type="primary" @click="selectLeave(step)">{{ '全选剩余位置' }}</Button>
                    <Button type="primary" @click="selectLeave(0)">{{ '取消全选剩余位置' }}</Button>
                </section>
                <section  class="button-area-item" v-if="step === 4 && !previewTag">
                    <Button :class="!mutipliTag ? 'mutiply' : 'gary'" :type="'default'" @click="mutipliControl">
                        {{'调位排号'}}
                    </Button>
                    <Button :class="mutipliTag ? 'mutiply' : 'gary'" :type="'default'" @click="mutipliControl">
                        {{ '多选排号' }}
                    </Button>
                    <Button v-if="!mutipliTag" type="primary" :class="isRecover ? '' : 'gary'" :disable="!isRecover" @click="recoverNumber">
                        {{'撤销上一步排号'}}
                    </Button>
                    <Button v-else type="primary" :class="isMutipiliRecover ? '' : 'gary'" :disable="!isMutipiliRecover" @click="recoverNumber">
                        {{'撤销上一步排号'}}
                    </Button>
                </section>
            </div>
        </div>
        <div class="right-side">
            <h1>会场阵列图</h1>
            <h3 :class="bling ? 'red' : ''" v-if="step">
                <span>{{`第${step}步：${stepName}`}}</span>
                <span v-if="step === 1">{{ '(可多选)' }}</span>
            </h3>
            <div class="show-area">
                <div class="seat-area" ref="imageDom">
                    <div class="seat-area-row" v-for="(itemi, indexI) in seatList" :key="indexI">
                        <template v-for="(itemj, indexJ) in seatList[indexI]">
                             <!-- :style="fullColor(itemj.value)" full-->
                            <div :key="indexJ" v-if="itemj.value && itemj.value !== step" class="seat-area-row-item">
                                <Icon v-if="itemj.value === 1" :class="differentColor(itemj.value)" type="ios-bowtie" />
                                <Icon v-if="itemj.value === 2" :class="differentColor(itemj.value)" type="ios-star" />
                                <Icon v-if="itemj.value === 3" :class="differentColor(itemj.value)" type="md-cube" />
                                <div class="number-cycle" :class="itemj.active ? 'active' : ''" v-if="step === 4 && itemj.value === 3" @click="setNumber(indexI, indexJ)">{{itemj.No !== -1 ? itemj.No : ''}}</div>
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
            <div class="button-area">
                <section>
                    <Button class="reset" v-if="!editTag && !previewTag" size="default" type="primary" @click="clearSeat">{{'重置布置'}}</Button>
                    <Button v-if="previewTag" size="default" type="primary" @click="buildImage">{{'确定生成'}}</Button>
                    <Button v-if="step === 4" size="default" type="primary" @click="preview">
                        {{previewTag ? '取消预览' : '确定预览'}}
                    </Button>
                    <Button v-if="[1,2,3].includes(step)" size="default" type="primary" @click="nextStep">{{'下一步'}}</Button>
                    <Button v-if="[2,3,4].includes(step) && !previewTag" size="default" type="primary" @click="previewStep">{{'上一步'}}</Button>
                </section>
            </div>
        </div>
            <!-- @on-ok="ok" @on-cancel="cancel" -->
        <Modal v-model="modal" width="70%" title="最终会场展示">
            <div class="modal-form">
                <img :src="imgUrl" />
            </div>
        </Modal>
    </div>
</template>
<script>
// import AlertPopup from '../../frame/AlertPopup'
import { setInterval, setTimeout, clearInterval } from 'timers';
export default {
    name: 'Setting',
    // components: {AlertPopup},
    data() {
        return {
            rowNum: 0,
            colNum: 0,
            seatList: [],
            step: 0,
            editTag: true,
            previewTag: false, //预览标志
            mutipliTag: false, //排号多选标志
            posMutipliTag: false,
            modal: false, //弹窗控制
            imgUrl: null,
            opts: {
                logging: true, // 启用日志记录以进行调试 (发现加上对去白边有帮助)
                allowTaint: true, // 否允许跨源图像污染画布
                backgroundColor: 'white', // 解决生成的图片有白边
                useCORS: true // 如果截图的内容里有图片,解决文件跨域问题
            },
            bling: false, //提示名字闪烁控制
            timer: null, //闪烁计时器
            // seatsNumber: 0, //排号，或许没用
            originReplace: [],
            replace: [],
            originMutipliSelec: [],
            mutipliSelect: [], //多选记录数组
            mutipliRecord: 1, //多选的起始number
            timeReplace: [], //用于恢复时消失背景色
            posMutipliSelect: [],
            originPosMutipliSelect: []
        }
    },
    computed: {
        stepName() {
            let val = ''
            switch(this.step) {
                case 1 : val = '确定舞台位置'; break;
                case 2 : val =  '确定入口位置'; break;
                case 3 : val =  '确定座位位置'; break;
                case 4 : val =  '确定座位编号'; break;
            }
            return val;
        },
        isRecover() {
            return this.originReplace.length;
        },
        isMutipiliRecover() {
            return this.originMutipliSelec.length;
        }
    },
    watch: {
        step() {
            if (this.timer) return;
            this.timer = setInterval(() => {
                this.bling = !this.bling;
            }, 500);
            let timeout = setTimeout(() => {
                clearInterval(this.timer);
                this.bling = false;
                this.timer = null;
            }, 3000);
            clearTimeout(timeout);
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
                case 1 : return 'background-color: skyblue;';
                case 2 : return 'background-color: violet;';
                case 3 : return 'background-color: orange;';
                default: return '';
            }
        },
        settingStart() {
            if (this.previewTag) {
                return this.$Message.warning({content: '请取消预览再进行操作', closable: true});
            } else if (!this.editTag) {
                return this.$Message.warning({content: '请重置布局再进行操作', closable: true});
            }
            if (Number(this.rowNum) <= 0 || Number(this.colNum) <= 0) {
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
            // this.seatsNumber = Number(this.rowNum) * Number(this.colNum);
            this.editTag = false;
        },
        clearSeat() {
            this.seatList = [];
            this.rowNum = 0;
            this.colNum = 0;
            this.step = 0;
            this.posMutipliSelect = [];
            this.originReplace = [];
            this.replace = [];
            this.originMutipliSelec = [];
            this.mutipliSelect = [];
            this.mutipliRecord = 1;
            this.mutipliTag = false;
            this.editTag = true;
        },
        nextStep() {
            this.posMutipliTag = false;
            this.posMutipliSelect = [];
            if (this.step === 3) {
                let row = 0;
                this.seatList.forEach(item => {
                    let hasValue = item.filter(val => {
                        return val.value >= 3;
                    });
                    if (!hasValue.length) row += 1;
                });
                if (row === this.seatList.length)
                return this.$Message.warning({content: '请选择座位再进行下一步', closable: true});
            }
            this.step += 1;
            if (this.step === 4) {
                let idx = 1;
                this.seatList.forEach(item => {
                    item.forEach(val => {
                        if (val.value === 3) {
                            val.No = idx;
                            idx++;
                        }
                    })
                });
            }
        },
        previewStep() {
            if (this.step === 4) {
                this.mutipliTag = false;
                this.originReplace = [];
                this.originMutipliSelec = [];
                this.replace = [];
                this.mutipliSelect = [];
                this.seatList.forEach(item => {
                    item.forEach(val => {
                        if (val.active) delete val.active;
                    });
                });
            }
            this.posMutipliTag = false;
            this.posMutipliSelect = [];
            this.step -= 1;
            this.$forceUpdate();
        },
        posSelectControl() {
            this.posMutipliTag = !this.posMutipliTag;
            if (!this.posMutipliTag) this.posMutipliSelect = [];
        },
        selectItem(i, j) {
            if (this.previewTag || this.step === 4) return;
            if (this.step === 2) {
                const rowBol = i === 0 || j === 0;
                const colBol = i === this.seatList.length - 1 || j === this.seatList[0].length - 1;
                if (!rowBol && !colBol) {
                    return this.$Message.warning({content: '入口不能设置在这里', closable: true});
                }
            } else if (this.step === 3) {
                const rowBol = i === 0 || j === 0;
                const colBol = i === this.seatList.length - 1 || j === this.seatList[0].length - 1;
                if (rowBol || colBol) {
                    return this.$Message.warning({content: '座位不能设置在这里', closable: true});
                }
            }
            if (this.posMutipliTag) {
                this.mutipliPos(i, j);
            } else {
                this.seatList[i][j].value = this.seatList[i][j].value ? 0 : this.step;
            }
            this.$forceUpdate();
        },
        mutipliPos(i, j) {
            if (this.posMutipliSelect.length && i === this.posMutipliSelect[0].i && j === this.posMutipliSelect[0].j) return;
            this.seatList[i][j].value = this.step;
            this.posMutipliSelect.push({i, j});
            if (this.posMutipliSelect.length === 2) {
                let firstRow = this.posMutipliSelect[0].i > this.posMutipliSelect[1].i ? 1 : 0;
                let secondRow = firstRow === 1 ? 0 : 1;
                let firstCol = this.posMutipliSelect[0].j > this.posMutipliSelect[1].j ? 1 : 0;
                let secondCol = firstCol === 1 ? 0 : 1;
                console.log(firstRow, secondRow)
                //这里要计算所选两个数据之间的行列先选的是否比后选的大，就需要倒序循环
                for (let first = this.posMutipliSelect[firstRow].i; first <= this.posMutipliSelect[secondRow].i; first++) {
                    for (let second = this.posMutipliSelect[firstCol].j; second <= this.posMutipliSelect[secondCol].j; second++) {
                        let bol = !this.seatList[first][second].value || this.seatList[first][second].value === this.step;
                        if (this.step === 2) {
                            if (bol && (first === 0  || second === 0 || first === this.seatList.length - 1 || second === this.seatList[0].length - 1)) {
                                this.seatList[first][second].value = this.step;
                            }
                        } else if (this.step === 3) {
                            if (bol && (first !== 0  || second !== 0 || first !== this.seatList.length - 1 || second !== this.seatList[0].length - 1)) {
                                this.seatList[first][second].value = this.step;
                            }
                        } else {
                            if (bol) {
                                this.seatList[first][second].value = this.step;
                            }
                        }
                    }
                }
            }
            if (this.posMutipliSelect.length > 2) {
                this.posMutipliSelect.splice(0,2);
            }
        },
        selectLeave(type) {
            if (this.previewTag || this.step === 4) return;
            this.seatList.forEach((item, i) => {
                item.forEach((val, j) => {
                    if (![1,2].includes(val.value) && ![0, this.seatList.length - 1].includes(i) && ![0, item.length - 1].includes(j) && this.step === 3) val.value = type;
                    else if (![1,3].includes(val.value) && (i === 0  || j === 0 || i === this.seatList.length - 1 || j === this.seatList[0].length - 1) && this.step === 2) val.value = type;
                    else if (![2,3].includes(val.value) && this.step === 1) val.value = type;
                })
            });
            this.$forceUpdate();
        },
        setNumber(i, j) {
            if (this.mutipliTag) {
                this.selectMutipli(i, j);
                return;
            }
            this.replace.push({i,j});
            if(this.replace.length > 2) {
                delete this.seatList[this.replace[0].i][this.replace[0].j].active;
                delete this.seatList[this.replace[1].i][this.replace[1].j].active;
                this.replace.splice(0,2);
            }
            this.seatList[i][j].active = true;
            if (this.replace.length === 2) {
                if (this.replace[0].i === this.replace[1].i && this.replace[0].j === this.replace[1].j) {
                    delete this.seatList[this.replace[1].i][this.replace[1].j].active
                    this.replace = [];
                    this.$forceUpdate();
                    return;
                }
                let replaceItem = this.seatList[this.replace[0].i][this.replace[0].j];
                this.originReplace = this.originReplace.concat(this.replace);
                this.seatList[this.replace[0].i][this.replace[0].j] = JSON.parse(JSON.stringify(this.seatList[this.replace[1].i][this.replace[1].j]));
                this.seatList[this.replace[1].i][this.replace[1].j] = JSON.parse(JSON.stringify(replaceItem));
            }
            this.$forceUpdate();
        },
        selectMutipli(i, j) {
            if (this.seatList[i][j].No) return;
            this.mutipliSelect.push({i, j});
            if(this.mutipliSelect.length === 2) {
                this.originMutipliSelec = this.originMutipliSelec.concat(this.mutipliSelect);
            } 
            this.seatList[i][j].active = true;
            let rowTag = false;
            let colTag = false;
            if (this.mutipliSelect.length > 2) {
                rowTag = this.mutipliSelect[0].i > this.mutipliSelect[1].i ? true : false;
                colTag = this.mutipliSelect[0].j > this.mutipliSelect[1].j ? true : false;
                //这里要计算所选两个数据之间的行列先选的是否比后选的大，就需要倒序循环
                for (let first = this.mutipliSelect[0].i; rowTag ? first >= this.mutipliSelect[1].i : first <= this.mutipliSelect[1].i; rowTag ? first-- : first++) {
                    for (let second = this.mutipliSelect[0].j; colTag ? second >= this.mutipliSelect[1].j : second <= this.mutipliSelect[1].j; colTag ? second-- : second++) {
                        if (this.seatList[first][second].active && this.seatList[first][second].No > 0) {
                            delete this.seatList[first][second].active;
                        }
                    }
                }
                this.mutipliSelect.splice(0,2);
            }
            if (this.mutipliSelect.length === 2) {
                rowTag = this.mutipliSelect[0].i > this.mutipliSelect[1].i ? true : false;
                colTag = this.mutipliSelect[0].j > this.mutipliSelect[1].j ? true : false;
                //这里要计算所选两个数据之间的行列先选的是否比后选的大，就需要倒序循环
                for (let first = this.mutipliSelect[0].i; rowTag ? first >= this.mutipliSelect[1].i : first <= this.mutipliSelect[1].i; rowTag ? first-- : first++) {
                    for (let second = this.mutipliSelect[0].j; colTag ? second >= this.mutipliSelect[1].j : second <= this.mutipliSelect[1].j; colTag ? second-- : second++) {
                        this.seatList[first][second].active = true;
                        if (this.seatList[first][second].No > 0) continue;
                        else {
                            this.seatList[first][second].No = this.mutipliRecord;
                            this.seatList[i][j].active = true;
                            this.mutipliRecord += 1;
                        }
                    }
                }
            }
            this.$forceUpdate();
        },
        recoverNumber() {
            if (this.mutipliTag) {
                this.recoverMutipliNumber();
                return;
            }
            if (this.timeReplace.length) {
                delete this.seatList[this.timeReplace[0].i][this.timeReplace[0].j].active;
                delete this.seatList[this.timeReplace[1].i][this.timeReplace[1].j].active;
                this.timeReplace = [];
            }
            if (!this.originReplace.length) return this.$Message.warning({content: '这是原始数据', closable: true});
            if (this.replace.length === 1) {
                delete this.seatList[this.replace[0].i][this.replace[0].j].active;
                this.replace = [];
            }
            this.$forceUpdate();
            let first = this.originReplace[this.originReplace.length - 1];
            let second = this.originReplace[this.originReplace.length - 2];
            let replaceItem = this.seatList[first.i][first.j];
            this.seatList[first.i][first.j] = JSON.parse(JSON.stringify(this.seatList[second.i][second.j]));
            this.seatList[second.i][second.j] = JSON.parse(JSON.stringify(replaceItem));
            this.seatList[first.i][first.j].active = true;
            this.seatList[second.i][second.j].active = true;
            this.timeReplace = [
                first,second
            ];
            this.originReplace.pop();
            this.originReplace.pop();
            this.replace = [
                {i: first.i,j: first.j},
                {i: second.i,j: second.j},
            ];
            this.$forceUpdate();
            // this.originReplace.splice(this.originReplace.length - 3,this.originReplace.length);
        },
        recoverMutipliNumber() {
            // if (this.mutipliSelect.length % 2) {
            //     let index = this.mutipliSelect[this.mutipliSelect.length - 1];
            //     delete this.seatList[index.i][index.j].active;
            //     this.mutipliSelect.pop();
            //     this.$forceUpdate();
            //     return;
            // }
            if (!this.originMutipliSelec.length) return this.$Message.warning({content: '这是原始数据', closable: true});
            if (this.originMutipliSelec.length) {
                let firstv = {};
                let secondv = {};
                let rowTag = false;
                let colTag = false;
                if (this.mutipliSelect.length % 2 || this.mutipliSelect.length === 0) {
                    let index = this.mutipliSelect[this.mutipliSelect.length - 1];
                    delete this.seatList[index.i][index.j].active;
                    this.mutipliSelect.pop();
                } else {
                    console.log(this.mutipliSelect.length)
                    firstv = this.originMutipliSelec[this.originMutipliSelec.length - 1];
                    secondv = this.originMutipliSelec[this.originMutipliSelec.length - 2];
                    rowTag = firstv.i > secondv.i ? true : false;
                    colTag = firstv.j > secondv.j ? true : false;
                    //这里要计算所选两个数据之间的行列先选的是否比后选的大，就需要倒序循环
                    for (let first = firstv.i; rowTag ? first >= secondv.i : first <= secondv.i; rowTag ? first-- : first++) {
                        for (let second = firstv.j; colTag ? second >= secondv.j : second <= secondv.j; colTag ? second-- : second++) {
                            if (this.seatList[first][second].No > 0) {
                                this.seatList[first][second].No = 0;
                                delete this.seatList[first][second].active;
                                this.mutipliRecord--;
                            }
                        }
                    }
                    this.originMutipliSelec.pop();
                    this.originMutipliSelec.pop();
                }
                this.$forceUpdate();

                if (this.originMutipliSelec.length) {
                    firstv = this.originMutipliSelec[this.originMutipliSelec.length - 1];
                    secondv = this.originMutipliSelec[this.originMutipliSelec.length - 2];
                    this.mutipliSelect = [
                        firstv, secondv
                    ]
                    rowTag = firstv.i > secondv.i ? true : false;
                    colTag = firstv.j > secondv.j ? true : false;
                    //这里要计算所选两个数据之间的行列先选的是否比后选的大，就需要倒序循环
                    for (let first = firstv.i; rowTag ? first >= secondv.i : first <= secondv.i; rowTag ? first-- : first++) {
                        for (let second = firstv.j; colTag ? second >= secondv.j : second <= secondv.j; colTag ? second-- : second++) {
                            if (this.seatList[first][second].No > 0) {
                                this.seatList[first][second].active = true;
                            }
                        }
                    }
                }
                this.$forceUpdate();
            }
        },
        seatedNumber() {
            let arr = [];
            this.seatList.forEach(item => {
                item.forEach(val => {
                    if (val.value === 3 && val.No === -1) arr.push(val);
                })
            });
            return arr;
        },
        mutipliControl() {
            this.mutipliTag = !this.mutipliTag;
            this.timeReplace = [];
            if (!this.mutipliTag) {
                this.originMutipliSelec = [];
                this.mutipliRecord = 1;
                this.mutipliSelect = [];
                let idx = 1;
                this.seatList.forEach(item => {
                    item.forEach(val => {
                        if (val.value === 3) {
                            delete val.active;
                            val.No = idx;
                            idx++;
                        }
                    })
                });
            } else {
                this.originReplace = [];
                this.replace = [];
                this.seatList.forEach(item => {
                    item.forEach(val => {
                        if (val.value === 3) {
                            delete val.active;
                            val.No = 0;
                        }
                    })
                });
            }
        },
        preview() {
            this.previewTag = !this.previewTag;
            this.seatList.forEach(item => {
                item.forEach(val => {
                    if (val.active) delete val.active;
                });
            });
        },
        buildImage() {
            console.log(this.seatList);
            this.$Loading.start();
            this.html2canvas(this.$refs.imageDom, this.opts).then(canvas => {
                console.log(canvas)
                // 转成图片，生成图片地址
                this.imgUrl = canvas.toDataURL("image/png");
                if (this.imgUrl) {
                    this.$Loading.finish();
                    this.modal = true;
                } else {
                    this.$Loading.error();
                }
            });
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
        & .button-area {
            padding: 0 50px;
            & p {
                font-weight: bold;
                font-size: 14px;
                color: black;
                margin-top: 10px;
            }
            &-item {
                display: flex;
                flex-direction: column;
                // margin-top: 20px;
                & button {
                    margin-top: 20px;
                }
                & .gary {
                    background-color: gray;
                    color: white !important;
                }
                & .mutiply {
                    background-color: orangered !important;
                    color: white !important;
                }
            }
        }
    }
    & .right-side {
        flex: 1;
        padding: 10px 30px;
        display: flex;
        flex-direction: column;
        min-width: 1000px;
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
                        position: relative;
                        &:last-child {
                            margin-right: 0;
                        }
                        &.full {
                            //位置偏移调整
                            height: 30px;
                            width: 30px;
                        }
                        & .number-cycle {
                            position: absolute;
                            width: 20px;
                            height: 20px;
                            border: 1px solid black;
                            color: black;
                            line-height: 20px;
                            text-align: center;
                            background-color: white;
                            border-radius: 50%;
                            top: 17%;
                            left: 17%;
                            font-weight: bold;
                            cursor: pointer;
                            &.active {
                                background-color: black;
                                color: white;
                            }
                        }
                        & i {
                            font-size: 30px;
                            &.active-table {
                                color: orange;
                            }
                            &.active-stage {
                                color: skyblue;
                            }
                            &.active-door {
                                color: red;
                            }
                        }
                    }
                }
            }
        }
        & .button-area {
            padding: 10px 0;
            // display: flex;
            // justify-content: flex-end;
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
.modal-form {
    display: flex;
    padding: 50px 0;
    & img {
        margin: 0 auto;
        border: gray 1px solid;
        border-radius: 10px;
        // height: 100%;
        // width: 100%;
    }
}
</style>