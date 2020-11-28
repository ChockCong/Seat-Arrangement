<template>
    <div class="index-vue-seatusing">
        <Setting v-if="showEditModel" style="width: 100%;" :editListName="seatListName" :editList="seatList" @back="() => { this.showEditModel = false; }"></Setting>
        <div v-else class="right-side">
            <div class="edit-area" v-if="editType">
                <Button type="primary" icon="md-arrow-round-back" @click="() => { this.$emit('back') }">返回会场记录</Button>
                <span style="margin-left: 10px">{{'当前会场：'}}</span>
                <Tag style="margin-top: -2px;" size="large" color="success">{{ editData.name }}</Tag>
            </div>
            <div class="title-area">
                <Steps :current="step - 1" size="small" class="step-bar">
                    <Step :title="`选择会场模板`" content=""></Step>
                    <Step :title="`上传宾客名单`" content=""></Step>
                    <Step :title="`预览会场`" content=""></Step>
                    <!-- <Step :title="`第4步：确定座位编号`" content=""></Step> -->
                </Steps>
                <!-- <section  class="button-area-item" v-if="step === 4">
                </section> -->
            </div>
            <div class="show-area">
                <template v-if="step === 1">
                    <div class="button-area">
                        <Button type="primary" icon="md-add" @click="addNew">新增模板</Button>
                        <Button type="primary" icon="md-trash" @click="deleteNew">删除模板</Button>
                        <Select style="width: 100px;" v-model="searchSelect">
                            <Option value="seatName" label="会场模板名"></Option>
                        </Select>
                        <Input style="width: 200px; margin: 0 10px" v-model="searchInput" placeholder="输入用户名搜索"  @input="searchFun" />
                        <span style="display: flex; align-items: center">
                            <span>{{'当前已选模板：'}}</span>
                            <Tag v-if="showSelected" color="blue">{{ selectedModule.moduleName }}</Tag>
                            <span v-else>无</span>
                        </span>
                    </div>
                </template>
                <template v-if="step === 2">
                    <div class="button-area clear-flex">
                        <input type="file" ref="fileInput" hidden accept="application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" @change="upload"/>
                        <Button icon="ios-cloud-upload-outline" type="primary" @click="clickFile">{{ hasFile ? '重新上传' : '上传文件' }}</Button>
                        <Button type="primary" icon="md-add" @click="mModel = true">新增宾客</Button>
                        <Button type="primary" icon="md-trash" @click="deletes">删除宾客</Button>
                        <Select style="width: 100px;" v-model="searchClientSelect">
                            <Option value="clientName" label="宾客名"></Option>
                            <Option value="seatNo" label="座位号"></Option>
                        </Select>
                        <Input style="width: 200px; margin: 0 10px" v-model="searchClientInput" placeholder="输入宾客名搜索"  @input="searchClientFun" />
                    </div>
                </template>
                <div style="width: fit-content">
                    <template v-if="step === 1">
                        <Table ref="table" border stripe :max-height="tableHeight" :width="1100" :loading="false" :columns="seatColumns" :data="seatDatas"  @on-selection-change="onSelectChange">
                            <template slot-scope="{ row }" slot="select">
                                <Checkbox :disabled="row.disabled" v-model="row.chceked" @on-change="onSelectChange(row)"></Checkbox>
                            </template>
                            <template slot-scope="{ row }" slot="action">
                                <Button type="primary" size="small" @click="editModel(row)">{{ '编辑' }}</Button>
                                <Button style="margin-left: 10px" type="primary" size="small" @click="preViewImage(row)">{{ '预览' }}</Button>
                            </template>
                        </Table>
                    </template>
                    <template v-if="step === 2">
                        <Table v-if="hasFile || hasClients" ref="table" border stripe :max-height="tableHeight" :width="650" :loading="false" :columns="excelColumns" :data="excelDatas"  @on-selection-change="onSelectClientChange">
                            <template slot-scope="{ row }" slot="client_name">
                                <template v-if="!row.edit">{{ row.client_name }}</template>
                                <Input v-else v-model="row.client_name" />
                            </template>
                            <template slot-scope="{ row }" slot="seat_no">
                                <template v-if="!row.edit">{{ row.seat_no }}</template>
                                <Input v-else v-model="row.seat_no" />
                            </template>
                            <template slot-scope="{ row }" slot="des">
                                <template v-if="!row.edit">{{ row.des }}</template>
                                <Input v-else v-model="row.des" />
                            </template>
                            <template slot-scope="{ row, index }" slot="action">
                                <Button type="primary" size="small" @click="changePeoples(row, index)">{{ row.edit ? '保存' : '编辑' }}</Button>
                            </template>
                        </Table>
                    </template>
                    <template v-if="step === 3">
                        <div class="preview">
                            <div class="preview-img">
                                <div class="image">会场图</div>
                            </div>
                            <div class="info">
                                <div class="info-item">
                                    <p>会场名</p>
                                    <div>
                                        <Input v-model="names" placeholder="输入会场名" />
                                    </div>
                                </div>
                                <div class="info-item">
                                    <p>会场详情</p>
                                    <div>
                                        <Input v-model="details" placeholder="输入会场详情" />
                                    </div>
                                </div>
                                <div class="info-item flex">
                                    <div class="item-flex">
                                        <p>会场人数</p>
                                        <div>
                                            <Input v-model="numbers" type="number" placeholder="输入参与会场人数" />
                                        </div>
                                    </div>
                                    <div class="item-flex">
                                        <p>主办人</p>
                                        <div>
                                            <Input v-model="holders" placeholder="输入主办人名" />
                                        </div>
                                    </div>
                                </div>
                                <div class="info-item">
                                    <p>举办时间</p>
                                    <div>
                                        <DatePicker type="datetime" v-model="times.start" format="yyyy-MM-dd HH:mm:ss" placeholder="输入开始时间"></DatePicker>
                                        <span style="margin: 0 10px; font-size: 14px">至</span>
                                        <DatePicker type="datetime" v-model="times.end" format="yyyy-MM-dd HH:mm:ss" placeholder="输入结束时间"></DatePicker>
                                    </div>
                                </div>
                                <div class="info-item">
                                    <p>可扫码入场时间</p>
                                    <div style="text-align: left;">
                                        <DatePicker type="datetime" v-model="times.qrcode" format="yyyy-MM-dd HH:mm:ss" placeholder="输入扫码开始时间"></DatePicker>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </template>
                    <section  class="button-area-item">
                        <Button type="primary" v-if="[2,3].includes(step)" @click="changeStep('pre')">{{ '上一步' }}</Button>
                        <Button type="primary" v-if="step < 3" @click="changeStep('next')">{{ '下一步' }}</Button>
                        <Button type="primary" v-if="step === 3">{{ editType ? '完成编辑' : '确认生成' }}</Button>
                    </section>
                </div>
            </div>
            <Modal
                v-model="mModel"
                :title="'新增宾客'"
                @on-ok="sureOK"
                @on-cancel="() => { this.mModel = false }">
                <Form ref="subForm" :model="Form" :rules="FormRules" class="subForm">
                    <FormItem label="" prop="client_name">
                        <Input type="text" v-model="Form.client_name" placeholder="宾客名" clearable />
                    </FormItem>
                    <FormItem label="" prop="seat_no">
                        <Input type="number" v-model="Form.seat_no" placeholder="座位号" clearable />
                    </FormItem>
                </Form>
            </Modal>
            <Modal v-model="nModel" :title="'模板预览'">
                <div class="modal-form">
                    <img :src="'@/assets/logo.png'" />
                </div>
            </Modal>
        </div>
        <!-- <Loading v-if="true"></Loading> -->
    </div>
</template>
<script>
import { confirmModal } from '@/utils/index'
import Setting from './Setting';
export default {
    name: 'Using',
    components: {Setting},
    data() {
        return {
            step: 1,
            loading: false,
            searchSelect: 'seatName',
            searchInput: '',
            selectedModule: {},
            searchFun: null,
            nModel: false,
            tableHeight: 0,
            showEditModel: false,
            seatListName: '',
            seatList: [],
            seatColumns: [
                {
                    title: '选择',
                    key: 'select',
                    width: 60,
                    align: 'center',
                    slot: 'select',
                },
                {
                    title: '会场模板名',
                    key: 'moduleName',
                    width: 200
                },
                {
                    title: '详情',
                    key: 'keyName',
                    // width: 200
                },
                {
                    title: '类型',
                    key: 'category',
                    width: 200
                },
                {
                    title: '容纳人数',
                    key: 'number',
                    width: 100
                },
                {
                    title: '操作',
                    key: 'action',
                    slot: 'action',
                    align: 'center',
                    width: 200
                }
            ],
            seatDatas: [
                {
                    moduleName: 'xx婚宴',
                    keyName: 'xxxx婚宴专用.....',
                    category: '婚宴型',
                    number: 100,
                    chceked: false,
                    disabled: false
                },{
                    moduleName: 'xx会议',
                    keyName: '会堂会议专用.......',
                    category: '会议型',
                    number: 200,
                    chceked: false,
                    disabled: false
                },{
                    moduleName: 'xx酒席1',
                    keyName: 'xxxx酒席专用.....',
                    category: '婚宴型',
                    number: 100,
                    chceked: false,
                    disabled: false
                },{
                    moduleName: 'xx酒席2',
                    keyName: 'xxxx酒席专用.....',
                    category: '婚宴型',
                    number: 100,
                    chceked: false,
                    disabled: false
                },{
                    moduleName: 'xx酒席3',
                    keyName: 'xxxx酒席专用.....',
                    category: '婚宴型',
                    number: 100,
                    chceked: false,
                    disabled: false
                },{
                    moduleName: 'xx酒席4',
                    keyName: 'xxxx酒席专用.....',
                    category: '婚宴型',
                    number: 100,
                    chceked: false,
                    disabled: false
                },{
                    moduleName: 'xx酒席5',
                    keyName: 'xxxx酒席专用.....',
                    category: '婚宴型',
                    number: 100,
                    chceked: false,
                    disabled: false
                },{
                    moduleName: 'xx酒席6',
                    keyName: 'xxxx酒席专用.....',
                    category: '婚宴型',
                    number: 100,
                    chceked: false,
                    disabled: false
                },{
                    moduleName: 'xx酒席7',
                    keyName: 'xxxx酒席专用.....',
                    category: '婚宴型',
                    number: 100,
                    chceked: false,
                    disabled: false
                },{
                    moduleName: 'xx酒席8',
                    keyName: 'xxxx酒席专用.....',
                    category: '婚宴型',
                    number: 100,
                    chceked: false,
                    disabled: false
                },{
                    moduleName: 'xx酒席9',
                    keyName: 'xxxx酒席专用.....',
                    category: '婚宴型',
                    number: 100,
                    chceked: false,
                    disabled: false
                },{
                    moduleName: 'xx酒席10',
                    keyName: 'xxxx酒席专用.....',
                    category: '婚宴型',
                    number: 100,
                    chceked: false,
                    disabled: false
                }
            ],
            file: null,
            excelColumns: [
                {
                    type: 'selection',
                    width: 60,
                    align: 'center'
                },
                {
                    title: '宾客姓名',
                    key: 'client_name',
                    slot: 'client_name',
                    // align: 'center',
                    width: 120,
                    tooltip: true
                },
                {
                    title: '座位号',
                    key: 'seat_no',
                    slot: 'seat_no',
                    // align: 'center',
                    width: 100,
                    sortable: true
                },
                {
                    title: '备注',
                    key: 'des',
                    slot: 'des',
                    // align: 'center',
                    minWidth: 100,
                    tooltip: true
                },
                {
                    title: '操作',
                    key: 'action',
                    slot: 'action',
                    align: 'center',
                    width: 80
                }
            ],
            excelDatas: [
                {
                    client_name: '测试宾客1',
                    seat_no:1,
                    des: '',
                    edit: false,
                },
                {
                    client_name: '测试宾客2',
                    seat_no:1,
                    des: '',
                    edit: false
                },
                {
                    client_name: '张三',
                    seat_no:2,
                    des: '小学同学',
                    edit: false
                },
                {
                    client_name: '李四',
                    seat_no:3,
                    des: '',
                    edit: false
                },
                {
                    client_name: '张三',
                    seat_no:5,
                    des: '初中同学',
                    edit: false
                }
            ],
            copyExcelDatas: [],
            searchClientFun: null,
            selectedClients: [],
            searchClientSelect: 'clientName',
            searchClientInput: '',
            mModel: false,
            Form: {
                client_name: '',
                seat_no: 0
            },
            FormRules: {
                client_name: [
                    { required: true, message: '请输入宾客名', trigger: ['blur','change'] }
                ],
                seat_no: [
                    { required: true, message: '请输入台号', trigger: ['blur','change'] },
                ]
            },
            editType: false,
            holders: '',
            names: '',
            details: '',
            numbers: 0,
            times: {
                start: '',
                end:'',
                qrcode: ''
            }
        }
    },
    props: {
        editData: Object
    },
    computed: {
        showSelected() {
            return !_.isEmpty(this.selectedModule);
        },
        hasFile() {
            return this.file;
        },
        hasClients() {
            return this.excelDatas.length;
        }
    },
    watch:{
        searchClientSelect() {
            this.searchClientInput = '';
            this.debounceClientsSearch();
        },
        editData: {
            deep:true,
            immediate: true,
            handler:function(v) {
                console.log(v);
                if (!v) {
                    this.editType = false;
                    this.selectedModule = [];
                    this.$nextTick(() => {
                        this.seatDatas.forEach(item => {
                            item.disabled = false;
                            item.chceked = false;
                        });
                    });
                } else {
                    this.editType = true;
                    this.$nextTick(() => {
                        //TODO: 编辑
                        this.selectedModule = _.cloneDeep(this.seatDatas[v.id - 1]);
                        this.seatDatas.forEach(item => {
                            if (item.moduleName !== this.selectedModule.moduleName) {
                                item.disabled = true;
                            } else {
                                item.chceked = true;
                            }
                        });
                    });
                }
            }
        }
    },
    methods: {
        changePeoples(row, index) {
          if (!row.edit) return this.excelDatas[index].edit = !row.edit;
          let { client_name, seat_no, des } = row;
          this.excelDatas[index].client_name = client_name;
          this.excelDatas[index].seat_no = seat_no;
          this.excelDatas[index].des = des;
          this.excelDatas[index].edit = !row.edit;
        },
        addNew() {
            this.$router.push('seat-setting');
        },
        deleteNew() {
            if (_.isEmpty(this.selectedModule)) return this.$Message.warning({content: '请先选择模板', closable: true});
            // let str = '';
            // this.selectedModule.forEach(val => {
            //     str += `<p>${val.moduleName}</p>`;
            // })
            confirmModal('confirm', '提示', `<p>是否确认删除这些模板？</p><br />${this.selectedModule.moduleName}`);
        },
        async upload(e) {
            const file = e.target.files;
            this.file = file[0];
            console.log(this.file);
            this.$refs.fileInput.value = null;
        },
        clickFile() {
            this.$refs.fileInput.click();
        },
        sureOK() {
            this.copyExcelDatas.push(Object.assign({}, this.Form, { edit: false }));
            this.debounceClientsSearch();
            this.mModel = false;
        },
        deletes() {
            if (!this.selectedClients.length) {
                return this.$Message.warning({content: '请先选择宾客', closable: true});
            }
            let str = '';
            this.selectedClients.forEach(val => {
                str += `<p>${val.client_name}</p>`;
            })
            confirmModal('confirm', '提示', `<p>是否确认删除这些宾客？</p><br />${str}`, this.sureDelete);
        },
        async sureDelete() {
            const fun = () => {
                let selected = this.selectedClients.map(val => {
                    return val.client_name;
                });
                console.log(selected);
                let copyDatas = _.cloneDeep(this.copyExcelDatas);
                copyDatas.forEach(item => {
                    if (selected.includes(item.client_name)) {
                        this.copyExcelDatas.splice(this.copyExcelDatas.findIndex(v => { return item.client_name === v.client_name; }), 1);
                    }
                });
                this.selectedClients = [];
                this.debounceClientsSearch();
            }
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    fun();
                    resolve(true);
                }, 2000);
            });
        },
        debounceSearch() {
            if (this.searchInput) {
                let reg = new RegExp(this.searchInput, "i");
                this.seatDatas = this.copyDatas.filter(val => {
                    return reg.test(val.moduleName);
                });
            } else {
                this.seatDatas = _.cloneDeep(this.copyDatas);
            }
            if (!_.isEmpty(this.selectedModule)) {
                this.onSelectChange(this.selectedModule);
            }
        },
        debounceClientsSearch() {
            if (this.searchClientInput) {
                let reg = new RegExp(this.searchClientInput, "i");
                this.excelDatas = this.copyExcelDatas.filter(val => {
                    return this.searchClientSelect === 'clientName' ? reg.test(val.client_name) : reg.test(val.seat_no);
                });
            } else {
                this.excelDatas = _.cloneDeep(this.copyExcelDatas);
            }
        },
        onSelectChange(selection) {
            let bol = selection.moduleName === this.selectedModule.moduleName;
            this.selectedModule = !bol ? _.cloneDeep(selection) : {};
            // console.log(this.selectedModule);
            if (!_.isEmpty(this.selectedModule)) {
                this.seatDatas.forEach(item => {
                    if (item.moduleName !== this.selectedModule.moduleName) {
                        item.disabled = true;
                    } else {
                        item.chceked = true;
                    }
                });
            } else {
                this.seatDatas.forEach(item => {
                    item.chceked = false;
                    item.disabled = false;
                });
            }
            this.$forceUpdate();
        },
        stepfun(type) {
            this.step = type === 'next' ? this.step + 1 : this.step - 1;
        },
        changeStep(type) {
            if (this.step === 1) {
                if (!this.showSelected) return this.$Message.warning({content: '请先选择一个模板', closable: true});
            }
            if (this.step === 2 && type === 'next') {
                return confirmModal('confirm', '提示', `<p>是否确认宾客名单无误？</p>`, this.stepfun, type);
            }
            this.stepfun(type);
        },
        onSelectClientChange(selection) {
            this.selectedClients = selection;
        },
        preViewImage(row) {
            this.nModel = true;
        },
        editModel(row) {
            this.seatListName = row.moduleName;
            this.seatList = [[{"value":0,"No":-1},{"value":0,"No":-1},{"value":0,"No":-1},{"value":0,"No":-1},{"value":0,"No":-1}],[{"value":0,"No":-1},{"value":3,"No":1},{"value":3,"No":2},{"value":3,"No":3},{"value":0,"No":-1}],[{"value":0,"No":-1},{"value":3,"No":4},{"value":3,"No":5},{"value":3,"No":6},{"value":0,"No":-1}],[{"value":0,"No":-1},{"value":3,"No":7},{"value":3,"No":8},{"value":3,"No":9},{"value":0,"No":-1}],[{"value":0,"No":-1},{"value":0,"No":-1},{"value":0,"No":-1},{"value":0,"No":-1},{"value":0,"No":-1}]];
            this.showEditModel = true;
        }
    },
    created() {
        this.searchFun = _.debounce(this.debounceSearch, 1000);
        this.searchClientFun = _.debounce(this.debounceClientsSearch, 1000);
    },
    mounted() {
        this.tableHeight = window.innerHeight - this.$refs.table.$el.offsetTop - 80;
    },
    beforeMount() {
        // for(let i = 0; i < 200; i++) {
        //     this.seatDatas.push({
        //             moduleName: 'xx婚宴',
        //             keyName: 'xxxx婚宴专用.....',
        //             category: '婚宴型',
        //             number: 100,
        //             chceked: false,
        //             disabled: false
        //         })
        // }
        this.copyDatas = _.cloneDeep(this.seatDatas);
        this.copyExcelDatas = _.cloneDeep(this.excelDatas);
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
        padding: 20px;
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
        & .edit-area {
            text-align: left;
            padding: 0 0 10px 0;
            border-bottom: 2px dashed #e8eaec;
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
                &-item {
                    display: flex;
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
            flex: 1;
            width: 100%;
            overflow-x: auto;
            overflow-y: auto;
            // padding: 10px;
            & .button-area-item {
                padding: 10px 0;
                text-align: right;
                & button {
                    margin-right: 10px;
                    &:last-child {
                        margin-right: 0;
                    }
                }
            }
        }
        & .ivu-checkbox-wrapper {
            margin-right: 0;
        }
        & .button-area {
            width: 100%;
            padding: 10px 0;
            text-align: left;
            display: flex;
            align-items: center;
            &.clear-flex {
                display: block;
            }
            & button {
                margin-right: 10px;
            }
        }
        & .preview {
            display: flex;
            &-img {
                box-sizing: border-box;
                width: 500px;
                padding: 10px;
                & .image {
                    border: 1px solid black;
                    width: 100%;
                    height: 100%;
                }
            }
        }
        & .info {
            &-item {
                padding: 10px 0;
                text-align: left;
                & p {
                    font-size: 14px;
                }
                &.flex {
                    display: flex;
                }
                & .item-flex {
                    flex: 1;
                    &:first-child {
                        margin-right: 34px;
                    }
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