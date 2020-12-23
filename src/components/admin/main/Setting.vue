<template>
<div style="height: 100%" :style="type === 'seats' ? 'border-bottom: 2px solid #e8eaec;' : ''">
    <div v-if="editList.length && type === 'template'" class="index-vue-settingedit-title">
        <Button type="primary" class="back" icon="md-arrow-round-back" @click="() => { this.$emit('back', this.reflash) }">返回会场模板</Button>
        <span style="margin-left: 10px">当前会场模板：</span>
        <Tag style="margin-top: -2px;" size="large" color="success">{{ editObj.moduleName }}</Tag>
    </div>
    <div class="index-vue-seatsetting">
        <div class="transition-area" style="position: relative;">
            <transition name="draw">
                <div class="left-side"  v-show="startModal" :style="!startModal ? 'min-width: 0' : 'min-width: 300px;'">
                    <div class="input-area" v-if="startModal">
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
                            <section class="item">
                                <label>模板名字: </label>
                                <Input style="width: 70%" v-model="totalOthers.totalName" size="large" placeholder="输入名字"  />
                            </section>
                            <section class="item">
                                <label>模板类型: </label>
                                <Select v-model="totalOthers.totalType" style="width: 70%; margin-left: 10px;text-align: left" size="large" placeholder="输入选项">
                                    <Option :value="'宴会型'">{{ '宴会型' }}</Option>
                                    <Option :value="'会议型'">{{ '会议型' }}</Option>
                                </Select>
                            </section>
                            <section class="item">
                                <label>容纳人数: </label>
                                <Input type="number" style="width: 70%" v-model="totalOthers.totalNumber" size="large" placeholder="输入数字"  />
                            </section>
                            <section class="item">
                                <label>备注: </label>
                                <Input type="textarea" style="width: 70%" v-model="totalOthers.totalContent" size="large" :autosize="{ minRows: 4, maxRows: 8 }" placeholder="输入备注"  />
                            </section>
                        </div>
                        <div class="input-area-button">
                            <b>查看图例</b>
                            <Button size="default" type="primary" @click="settingStart">确定生成</Button>
                        </div>
                    </div>
                </div>
            </transition>
            <div class="hide-start" @click="showStart()">
                <Icon :type="!startModal ? 'ios-arrow-forward' : 'ios-arrow-back'"></Icon>
                <!-- {{!startModal ? '展开' : '收起'}} -->
            </div>
        </div>
        <div class="right-side">
            <div class="title-area" v-if="step">
                <!-- <h3 :class="bling ? 'red' : ''" v-if="step">
                    <span>{{`第${step}步：${stepName}`}}</span>
                    <span v-if="step === 1">{{ '(可多选)' }}</span>
                    <span v-if="step === 4" style="color:#f60;">{{ mutipliTag ? '(多选模式)':'(调位模式)' }}</span>
                </h3> -->
                <Steps :current="step - 1" size="small" class="step-bar">
                    <Step :title="`确定舞台位置`" content=""></Step>
                    <Step :title="`确定入口位置`" content=""></Step>
                    <Step :title="`确定座位位置`" content=""></Step>
                    <Step :title="`确定座位编号`" :content="step === 4 ? (mutipliTag ? '(多选模式)':'(调位模式)') : ''"></Step>
                </Steps>
                <section  class="button-area-item" v-if="step < 4">
                    <Button :class="!posMutipliTag ? '' : 'gary'" :type="'primary'" size="small" shape="circle" @click="posSelectControl(false)">
                        {{'单选位置'}}
                    </Button>
                    <Button :class="posMutipliTag ? '' : 'gary'" :type="'primary'" size="small" shape="circle" @click="posSelectControl(true)">
                        {{ '多选位置' }}
                    </Button>
                    <Button size="small" shape="circle" @click="selectLeave(step)">{{ '全选位置' }}</Button>
                    <Button size="small" shape="circle" @click="selectLeave(0)">{{ '取消全选' }}</Button>
                </section>
                <section  class="button-area-item" v-if="step === 4">
                    <!-- <Button :class="mutipliTag ? 'mutiply' : 'gary'" :type="'default'" @click="mutipliControl">
                        {{ '多选排号' }}
                    </Button>
                    <Button :class="!mutipliTag ? 'mutiply' : 'gary'" :type="'default'" @click="mutipliControl">
                        {{'调位排号'}}
                    </Button> -->
                    <Button v-if="!mutipliTag" type="primary" size="small" shape="circle" :class="isRecover ? '' : 'gary'" :disable="!isRecover" @click="recoverNumber">
                        {{'上一步排号'}}
                    </Button>
                    <Button v-else type="primary" shape="circle" size="small" :class="isMutipiliRecover ? '' : 'gary'" :disable="!isMutipiliRecover" @click="recoverNumber">
                        {{'上一步排号'}}
                    </Button>
                    <Button class="reset" size="small" shape="circle" @click="defaultNumber">{{'重置排号'}}</Button>
                    <Button class="reset" size="small" shape="circle" @click="numberModal = true">{{'重置模式'}}</Button>
                </section>
            </div>
            <div class="show-area">
                <div class="seat-area" ref="imageDom">
                    <div class="seat-area-row" v-for="(itemi, indexI) in seatList" :key="indexI">
                        <template v-for="(itemj, indexJ) in seatList[indexI]">
                             <!-- :style="fullColor(itemj.value)" full-->
                            <div :key="indexJ" v-if="itemj.value && itemj.value !== step" class="seat-area-row-item">
                                <!-- <Icon v-if="itemj.value === 1" :class="differentColor(itemj.value)" type="ios-bowtie" />
                                <Icon v-if="itemj.value === 2" :class="differentColor(itemj.value)" type="ios-star" />
                                <Icon v-if="itemj.value === 3" :class="differentColor(itemj.value)" type="md-cube" /> -->
                                <i v-if="itemj.value === 1"  class="iconfont icon-diban big selected" :class="differentColor(itemj.value)"></i>
                                <i v-else-if="itemj.value === 2"  class="iconfont icon-men" :class="differentColor(itemj.value)"></i>
                                <i v-else-if="itemj.value === 3"  class="iconfont icon-efbdddbe" :class="differentColor(itemj.value)"></i>
                                <div class="number-cycle" :class="itemj.active ? 'active' : ''" v-if="step === 4 && itemj.value === 3" @click="setNumber(indexI, indexJ)">{{itemj.No > 0 ? itemj.No : ''}}</div>
                            </div>
                            <!-- :class="previewTag ? 'full' : ''" -->
                            <div v-else :key="indexJ" class="seat-area-row-item" @click="selectItem(indexI, indexJ)">
                                <!-- v-if="!previewTag" -->
                                <template>
                                    <i v-if="step === 2 && itemj.value !== 1 && (indexJ === 0 || indexI === 0 || indexI === seatList.length - 1 || indexJ === seatList[indexI].length - 1)" class="iconfont icon-men" :class="differentColor(itemj.value)"></i>
                                    <i v-else-if="step === 3 && itemj.value !== 1 && ((indexI > 0 && indexI < seatList.length - 1) && (indexJ > 0 &&indexJ < seatList[indexI].length - 1))" class="iconfont icon-efbdddbe" :class="differentColor(itemj.value)"></i>
                                    <i v-else-if="step === 1" class="iconfont icon-diban big" :class="differentColor(itemj.value)"></i>
                                    <div v-else class="full-icon"></div>
                                    <!-- <Icon :class="differentColor(itemj.value)" type="md-cube" /> -->
                                </template>
                                <!-- <template v-else>
                                    <i v-if="itemj.value" class="iconfont icon-diban" :class="differentColor(itemj.value)"></i>
                                </template> -->
                            </div>
                        </template>
                    </div>
                </div>
            </div>
            <div class="button-area">
                <section>
                    <!-- && !previewTag -->
                    <Button class="reset" v-if="!editTag" size="default" type="primary" @click="clearSeat">{{'重置会场'}}</Button>
                    <!-- v-if="previewTag" -->
                    <Button size="default" v-if="step === 4 && !mutipliTag" type="primary" @click="buildImage">{{'确定生成'}}</Button>
                    <!-- <Button v-if="step === 4 && !mutipliTag" size="default" type="primary" @click="preview">
                        {{previewTag ? '取消预览' : '确定预览'}}
                    </Button> -->
                    <Button v-if="step === 4 && mutipliTag" size="default" type="primary" @click="toNotMutiply">
                        {{'下一步'}}
                    </Button>
                    <Button v-if="[1,2,3].includes(step)" size="default" type="primary" @click="nextStep">{{!editType ? '下一步' : '会场下一步'}}</Button>
                     <!-- && !previewTag -->
                    <Button v-if="[2,3,4].includes(step)" size="default" type="primary" @click="previewStep">{{!editType ? '上一步' : '会场上一步'}}</Button>
                </section>
            </div>
        </div>
        <Modal v-model="numberModal" :closable="isStartNumberMode ? true : false" :mask-closable="isStartNumberMode ? true : false">
            <p slot="header" style="color:#f60; text-align:center">
                <Icon type="md-analytics" />
                <span style="margin-left:10px;" >{{ '排号模式' }}</span>
            </p>
            <div style="text-align:left">
                <p>排号模式说明：</p>
                <p>1.多选排号模式您可以自由排列位置，然后再通过调换排号模式微调。</p>
                <br />
                <p>2.调位排号模式系统将为你自动排列所有位置</p>
            </div>
            <div slot="footer" style="display: flex;">
                <Button type="error" style="flex: 1;" size="large" @click="sureNumberModal(true)">{{'多选模式'}}</Button>
                <Button type="error" style="flex: 1;" size="large" @click="sureNumberModal(false)">{{'调位模式'}}</Button>
            </div>
        </Modal>
        <Modal v-model="passModal" width="20%" title="" :closable="false">
            <p slot="header" style="color:#f60; text-align:center">
                <span style="margin-left:10px;" >{{ '提示' }}</span>
            </p>
            <div style="">
                <p>接下来将进入调位模式，该步骤内你也可以选择直接生成预览</p>
            </div>
            <div slot="footer" style="display: flex;">
                <Button type="error" style="flex: 1;" size="large" @click="passModal = false">{{'确定'}}</Button>
            </div>
        </Modal>
        <Modal v-model="modal" width="70%" :scrollable="true" title="最终会场展示">
            <div class="modal-form">
                <img :src="imgUrl" />
            </div>
            <div slot="footer" style="text-align: right">
                <Button type="default" size="large" @click="modal = false">{{'取消'}}</Button>
                <Button type="primary" size="large" :loading="saveLoading" @click="saveImage">{{ oss_url ? '确定' : '保存会场'}}</Button>
            </div>
        </Modal>
        <Loading v-if="loading"></Loading>
    </div>
</div>
</template>
<script>
import Loading from '@/components/common/loading.vue';
import { dataURLtoFile } from '@/utils/index'
import { client } from '@/utils/oss'
import { cTemplate, uTemplate } from '@/api/seat_api'
// import { setInterval, setTimeout, clearInterval } from 'timers';
export default {
    name: 'Setting',
    components: {Loading},
    props: {
        type: String,
        editList: {
            type: Array,
            default: () =>{
                return [];
            }
        },
        editObj: Object
    },
    data() {
        return {
            editType: false,
            rowNum: 0,
            colNum: 0,
            seatList: [],
            copySeatList: [],
            step: 0,
            startModal: true,
            modal: false, //弹窗控制
            numberModal: false,
            passModal: false,
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
            editTag: true,
            previewTag: false, //预览标志
            mutipliTag: true, //排号多选标志
            posMutipliTag: false,
            isStartNumberMode: false, //判断是第一次进入排位还是需要重置排位
            originReplace: [],
            replace: [],
            mutipliSelect: [], //多选记录数组
            mutipliRecord: 1, //多选的起始number
            mutipliStep: 0, //多选的整体步骤，记录在seatList内
            timeReplace: [], //用于恢复时消失背景色
            posMutipliSelect: [],
            originPosMutipliSelect: [],
            loading: false,
            oss_url: '',
            saveLoading: false,
            totalOthers: {
                totalName: '',
                totalType: '',
                totalNumber: '',
                totalContent: ''
            },
            reflash: false
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
            return this.mutipliStep;
        }
    },
    watch: {
        step() {
            // if (this.timer) return;
            // this.timer = setInterval(() => {
            //     this.bling = !this.bling;
            // }, 500);
            // let timeout = setTimeout(() => {
            //     clearInterval(this.timer);
            //     this.bling = false;
            //     this.timer = null;
            // }, 3000);
            // clearTimeout(timeout);
        },
        editObj: {
            immediate: true,
            deep: true,
            handler: function (value) {
                if (!value || _.isEmpty(value)) return;
                this.totalOthers = {
                    totalName: value.ct_name,
                    totalType: value.ct_type,
                    totalNumber: value.ct_number,
                    totalContent: ''
                }
            }
        },
        editList: {
            immediate: true,
            deep: true,
            handler: function (value) {
                if (this.editList.length) {
                    this.editType = true
                    this.step = 4;
                    this.seatList = _.cloneDeep(value);
                    this.rowNum = this.seatList.length - 2;
                    this.colNum = this.seatList[0].length - 2;
                    this.editTag = false;
                    this.startModal = false;
                    this.mutipliTag = false;
                } else {
                    this.editType = false
                }
            }
        }
    },
    activated() {
        // console.log(222);
    },
    methods: {
        showStart(type = null) {
            if (type == null) this.startModal = !this.startModal;
            else this.startModal = type;
        },
        monitorWindowSize() {
            let w = document.documentElement.clientWidth || document.body.clientWidth
            if (w < 800) {
                this.showStart(false)
            }
            window.onresize = () => {
                // 可视窗口宽度太小 自动收缩侧边栏
                // console.log(w);
                if (w < 800 && w > (document.documentElement.clientWidth || document.body.clientWidth)) {
                    this.showStart(false)
                }
                w = document.documentElement.clientWidth || document.body.clientWidth
            }
        },
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
            let reg = new RegExp(/\d/);
            // if (this.previewTag) {
            //     return this.$Message.warning({content: '请取消预览再进行操作', closable: true});
            // } else 
            if (!this.editTag) {
                return this.$Message.warning({content: '请重置布局再进行操作', closable: true});
            }
            if (!reg.test(Number(this.rowNum)) || !reg.test(Number(this.colNum))) {
                return this.$Message.warning({content: '请输入数字', closable: true});
            }
            if (Number(this.rowNum) <= 0 || Number(this.colNum) <= 0) {
                return this.$Message.warning({content: '请输入数字大于0', closable: true});
            }
            let empty = Object.keys(this.totalOthers).some(key => { return key !== 'totalContent' && !String(this.totalOthers[key]); });
            if (empty) {
                return this.$Message.warning({content: '请输入所有内容，备注可选', closable: true});
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
            this.showStart();
        },
        clearSeat() {
            this.seatList = [];
            this.rowNum = 0;
            this.colNum = 0;
            this.step = 0;
            this.posMutipliSelect = [];
            this.originReplace = [];
            this.replace = [];
            this.mutipliSelect = [];
            this.mutipliRecord = 1;
            this.mutipliStep = 0;
            this.mutipliTag = true;
            this.isStartNumberMode = false;
            this.imgUrl = null;
            this.copySeatList = [];
            this.editTag = true;
            // this.previewTag = false;
            this.oss_url = '';
            this.totalOthers = {
                totalName: '',
                totalType: '',
                totalNumber: '',
                totalContent: ''
            }
            this.showStart(true);
        },
        nextStep() {
            this.step += 1;
            if (this.step === 4) {
                let row = 0;
                this.seatList.forEach(item => {
                    let hasValue = item.filter(val => {
                        return val.value >= 3;
                    });
                    if (!hasValue.length) row += 1;
                });
                if (row === this.seatList.length) {
                    this.step = 3;
                    return this.$Message.warning({content: '请选择座位再进行下一步', closable: true});
                } else this.numberModal = true;
            }
            this.posMutipliTag = false;
            this.posMutipliSelect = [];
        },
        previewStep() {
            if (this.step === 4) {
                this.mutipliTag = true;
                this.originReplace = [];
                this.replace = [];
                this.mutipliSelect = [];
                this.mutipliStep = 0;
                this.copySeatList = [];
                this.isStartNumberMode = false;
                this.clearActive(false);
                this.clearNumber(false);
            }
            this.posMutipliTag = false;
            this.posMutipliSelect = [];
            this.step -= 1;
            this.$forceUpdate();
        },
        sureNumberModal(type) {
            this.copySeatList = [];
            this.mutipliRecord = 1;
            this.mutipliStep = 0;
            this.mutipliSelect = [];
            this.originReplace = [];
            this.timeReplace = [];
            this.replace = [];
            this.isStartNumberMode = true;
            this.mutipliTag = type;
            this.defaultNumber();
            this.numberModal = false;
        },
        defaultNumber() {
            if (this.step === 4) {
                if (!this.mutipliTag) {
                    let idx = 1;
                    if (!this.copySeatList.length) {
                        this.seatList.forEach(item => {
                            item.forEach(val => {
                                if (val.value === 3) {
                                    val.No = idx;
                                    idx++;
                                }
                            })
                        });
                    } else {
                        this.seatList = _.cloneDeep(this.copySeatList);
                    }
                    this.originReplace = [];
                    this.timeReplace = [];
                    this.replace = [];
                } else {
                   this.seatList.forEach(item => {
                        item.forEach(val => {
                            if (val.value === 3) {
                                val.No = 0;
                            }
                        })
                    });
                    this.mutipliRecord = 1;
                    this.mutipliStep = 0;
                    this.mutipliSelect = [];
                }
                this.clearActive(false);
                this.$forceUpdate();
            }
        },
        posSelectControl(type) {
            this.posMutipliTag = type;
            if (!this.posMutipliTag) this.posMutipliSelect = [];
        },
        selectItem(i, j) {
            // this.previewTag || 
            if (this.step === 4) return;
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
            if (this.posMutipliSelect.length === 1 && i === this.posMutipliSelect[0].i && j === this.posMutipliSelect[0].j) return;
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
            // this.previewTag || 
            if (this.step === 4) return;
            this.seatList.forEach((item, i) => {
                item.forEach((val, j) => {
                    if (![1,2].includes(val.value) && ![0, this.seatList.length - 1].includes(i) && ![0, item.length - 1].includes(j) && this.step === 3) val.value = type;
                    else if (![1,3].includes(val.value) && (i === 0  || j === 0 || i === this.seatList.length - 1 || j === this.seatList[0].length - 1) && this.step === 2) val.value = type;
                    else if (![2,3].includes(val.value) && this.step === 1) val.value = type;
                })
            });
            this.$forceUpdate();
        },
        toNotMutiply() {
            let zeroLen = 0;
            this.seatList.forEach(item => {
                let rowZero = item.filter(val => { return val.value === 3 && !val.No; });
                zeroLen += rowZero.length; 
            });
            if (zeroLen) return this.$Message.warning({content: '请把全部号码设置完毕', closable: true});
            else {
                this.passModal = true;
                this.copySeatList = _.cloneDeep(this.seatList);
                this.mutipliRecord = 1;
                this.mutipliStep = 0;
                this.mutipliSelect = [];
                this.mutipliTag = false;
                this.clearActive();
                
            }
        },
        setNumber(i, j) {
            if (this.mutipliTag) {
                this.selectMutipliNumber(i, j);
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
        selectMutipliNumber(i, j) {
            if (this.seatList[i][j].No) return;
            this.mutipliSelect.push({i, j});
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
                this.mutipliStep += 1; //步骤+1，用于撤销
                //这里要计算所选两个数据之间的行列先选的是否比后选的大，就需要倒序循环
                for (let first = this.mutipliSelect[0].i; rowTag ? first >= this.mutipliSelect[1].i : first <= this.mutipliSelect[1].i; rowTag ? first-- : first++) {
                    for (let second = this.mutipliSelect[0].j; colTag ? second >= this.mutipliSelect[1].j : second <= this.mutipliSelect[1].j; colTag ? second-- : second++) {
                        // this.seatList[first][second].active = true;
                        if (this.seatList[first][second].value !== 3 || this.seatList[first][second].No > 0) continue;
                        else {
                            this.seatList[first][second].No = this.mutipliRecord;
                            this.seatList[first][second].active = true;
                            this.mutipliRecord += 1;
                            this.seatList[first][second].step = this.mutipliStep;
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
            if (!this.originReplace.length) {
                this.$Message.warning({content: '这是原始数据', closable: true});
                return this.clearActive();
            }
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
            if (!this.mutipliStep) return this.$Message.warning({content: '这是原始数据', closable: true});
            let rowPreItemsIndex = [];
            let colPreItemsIndex = [];
            if (this.mutipliSelect.length === 1) {
                delete this.seatList[this.mutipliSelect[0].i][this.mutipliSelect[0].j].active;
                // this.mutipliSelect = [];
                this.seatList.forEach((item, i) => {
                    item.forEach((val, j) => {
                        if (_.has(val, 'step') && val.step === this.mutipliStep) {
                            val.active = true;
                            rowPreItemsIndex.push(i)
                            colPreItemsIndex.push(j);
                        }
                    })
                });
            } else {
                let vituralPreStep = this.mutipliStep - 1;
                this.seatList.forEach((item, i) => {
                    item.forEach((val, j) => {
                        if (_.has(val, 'step')) {
                            delete val.active;
                            if (val.step === this.mutipliStep) {
                                val.No = 0;
                                delete val.step;
                                this.mutipliRecord--;
                            }
                            if (val.step === vituralPreStep) {
                                val.active = true;
                                rowPreItemsIndex.push(i)
                                colPreItemsIndex.push(j);
                            }
                        }
                    })
                });
                this.mutipliStep -= 1;
            }
            rowPreItemsIndex = rowPreItemsIndex.sort((a, b) => {return a - b;});
            colPreItemsIndex = colPreItemsIndex.sort((a, b) => {return a - b;});
            this.mutipliSelect = [
                {i: rowPreItemsIndex[0], j: colPreItemsIndex[0]},
                {i: rowPreItemsIndex[rowPreItemsIndex.length - 1], j: colPreItemsIndex[colPreItemsIndex.length - 1]}
            ]
            this.$forceUpdate();
        },
        // mutipliControl() {
        //     this.mutipliTag = !this.mutipliTag;
        //     this.timeReplace = [];
        //     if (!this.mutipliTag) {
        //         this.mutipliRecord = 1;
        //         this.mutipliSelect = [];
        //         let idx = 1;
        //         this.seatList.forEach(item => {
        //             item.forEach(val => {
        //                 if (val.value === 3) {
        //                     delete val.active;
        //                     val.No = idx;
        //                     idx++;
        //                 }
        //             })
        //         });
        //     } else {
        //         this.originReplace = [];
        //         this.replace = [];
        //         this.seatList.forEach(item => {
        //             item.forEach(val => {
        //                 if (val.value === 3) {
        //                     delete val.active;
        //                     val.No = 0;
        //                 }
        //             })
        //         });
        //     }
        // },
        // preview() {
        //     this.previewTag = !this.previewTag;
        //     this.clearActive();
            // this.seatList.forEach(item => {
            //     item.forEach(val => {
            //         if (val.active) delete val.active;
            //     });
            // });
        // },
        clearActive(isLoad = true) {
            this.seatList.forEach(item => {
                item.forEach(val => {
                    if (val.active) delete val.active;
                });
            });
            if (isLoad) this.$forceUpdate();
        },
        clearNumber(isLoad = true) {
            this.seatList.forEach(item => {
                item.forEach(val => {
                    if (val.value === 3) val.No = -1;
                });
            });
            if (isLoad) this.$forceUpdate();
        },
        renameFile() {
            let time = new Date();
            let str = String(time.getFullYear()) + String(time.getMonth() + 1) + String(time.getDate()) + String(time.getHours()) + String(time.getMinutes()) + String(time.getSeconds());
            let rand = Math.floor(Math.random() * 10)
            return `images/seat${str}${rand}.jpg`;
        },
        async buildImage() {
            this.clearActive();
            this.$nextTick(() => {
                this.$Loading.start();
                this.loading = true;
                this.html2canvas(this.$refs.imageDom, this.opts).then(async canvas => {
                    // console.log(canvas)
                    // 转成图片，生成图片地址
                    this.imgUrl = canvas.toDataURL("image/png");
                    if (this.imgUrl) {
                        this.$Loading.finish();
                        this.loading = false;
                        this.modal = true;
                    } else {
                        this.$Loading.error();
                        this.loading = false;
                    }
                });
            });
        },
        async saveImage() {
            if (this.oss_url) return this.modal = false;
            this.saveLoading = true;
            let file = dataURLtoFile(this.imgUrl,'image/jpeg');
            const res = await client().put(this.renameFile(), file);
            this.saveLoading = false;
            console.log(res);
            if (res.res.status === 200) {
                this.oss_url = res.url;
                const sres = await this.finalSave();
                if (sres) {
                    this.$Message.success('保存会场成功');
                    this.reflash = true;
                    this.modal = false;
                    this.clearSeat();
                    if (this.editType) this.$emit('back', this.reflash);
                    else this.$router.push('seat-using');
                }
            } else {
                this.$Message.error('保存会场失败，请取消后重试或刷新');
            }
        },
        async finalSave() {
            let tableContent = '';
            let tableNumber = '';
            this.seatList.forEach((items, i) => {
                items.forEach((item, j) => {
                    tableContent += item.value;
                    tableNumber += item.No;
                    if (j !== items.length - 1) {
                        tableContent += ',';
                        tableNumber += ',';
                    }
                })
                if (i !== this.seatList.length - 1) {
                    tableContent += ',';
                    tableNumber += ',';
                }
            });
            let params = {
                ctName: this.totalOthers.totalName,
                ctRow: Number(this.rowNum),
                ctCol: Number(this.rowNum),
                ctContent: tableContent,
                ctTableNumber: tableNumber,
                ctType: this.totalOthers.totalType,
                ctNumber: Number(this.totalOthers.totalNumber),
                ctImgUrl: this.oss_url
            };
            if (this.type === 'template') {
                //编辑模板
                params.ctId = this.editObj.ct_id;
                const res = await uTemplate(params);
                return res;
            }
            const res = await cTemplate(params);
            return res;
        }
    },
    mounted() {
        this.monitorWindowSize();
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
.index-vue-settingedit-title {
    text-align: left;
    // font-size: 13px;
    // font-weight: 700;
    color: #666;
    padding: 10px 5px;
    border-bottom: 2px dashed #e8eaec;
    & .back {
        background: black;
        border-color: black;
        &:hover {
            background: grey;
            border-color: grey;
        }
    }
}
.index-vue-seatsetting {
    min-width: 1000px;
    height: 100%;
    display: flex;
    .draw-enter-active, .draw-leave-active {
        transition: all .5s ease;
    }
    .draw-enter, .draw-leave-to /* .fade-leave-active below version 2.1.8 */ {
        min-width: 0
    }
    & .left-side {
        height: 100%;
        position: relative;
        background-color: #f3f7fd;
        border-right: 1px solid lightgray;
        // box-shadow: 1px 1px 5px lightgray;
        & .input-area {
            padding: 20px;
            // border-bottom: 1px solid lightgray;
            &-item {
                & .item {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
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
    & .hide-start {
        cursor: pointer;
        position: absolute;
        background-color: #2d8cf0;
        color: white;
        border: 1px solid lightgray;
        padding: 2px 0;
        border-left: 0;
        border-top: 0;
        // border-top-right-radius: 10px;
        border-bottom-right-radius: 10px;
        box-shadow: 1px 1px 5px lightgray;
        top: 0;
        right: -21px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        width: 20px;
        height: 50px;
        font-weight: bold;
        font-size: 14px;
        & i {
            font-size: 14px;
        }
    }
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
            padding: 10px 0 5px 0;
            & .step-bar {
                width: 60%;
                height: 40px;
                text-align: left;
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
            border: 1px solid lightgray;
            border-radius: 10px;
            // box-shadow: 1px 1px 5px gray;
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
                padding: 15px;
                width: fit-content;
                margin: auto;
                // padding: 0 10px;
                &-row {
                    display: flex;
                    line-height: 1;
                    flex-direction: row;
                    // line-height: normal;
                    // padding: 10px 0;
                    &-item {
                        // margin-right: 20px;
                        // margin-bottom: 20px;
                        position: relative;
                        // &:nth-last-child(2) {
                        //     margin-right: 0;
                        // }
                        // &:last-child {
                        //     margin-right: 0;
                        //     margin-left: 20px;
                        // }
                        &.full {
                            //位置偏移调整
                            height: 50px;
                            width: 50px;
                        }
                        & .full-icon {
                            //位置偏移调整
                            height: 50px;
                            width: 50px;
                        }
                        & .number-cycle {
                            position: absolute;
                            width: 20px;
                            height: 20px;
                            border: 1px solid gray;
                            color: black;
                            line-height: 20px;
                            text-align: center;
                            background-color: white;
                            border-radius: 50%;
                            top: 12%;
                            left: 31%;
                            font-weight: bold;
                            font-size: 12px;
                            cursor: pointer;
                            &.active {
                                border-color: #409eff;
                                box-shadow: 0 0 5px rgba(0,113,241,1);
                            }
                        }
                        & i {
                            display: block;
                            font-size: 30px;
                            margin: 10px;
                            color: lightgray;
                            &.active-table {
                                color: orange;
                            }
                            &.active-stage {
                                background-color: #e3b78c;
                            }
                            &.active-door {
                                color: #4caf50;
                            }
                            &.icon-efbdddbe {
                                font-size: 27px;
                            }
                            &.big {
                                margin: 0;
                                font-size: 50px;
                            }
                            &.selected {
                                color: black;
                                border-radius: 5px;
                            }
                        }
                    }
                }
            }
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
.modal-form {
    display: flex;
    padding: 50px 0;
    overflow: auto;
    & img {
        margin: 0 auto;
        // border-radius: 10px;
        // border: gray 1px solid;
        // padding: 10px;
        // height: 100%;
        // width: 100%;
    }
}
</style>