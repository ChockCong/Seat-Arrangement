<template>
    <div class="index-vue-seatusing" :class="editType ? 'edit-style' : ''">
        <Setting v-if="showEditModel" style="width: 100%;" :type="'template'" :editObj="seatListObj" :editList="seatList" @back="backUsing"></Setting>
        <div v-else class="right-side">
            <div class="edit-area" v-if="seeType || editType">
                <Button type="primary" icon="md-arrow-round-back" @click="() => { this.$emit('back') }">返回会场记录</Button>
                <span style="margin-left: 10px">{{'当前会场：'}}</span>
                <Tag style="margin-top: -2px;" size="large" color="success">{{ editData.name }}</Tag>
            </div>
            <div class="title-area">
                <Steps :current="step - 1" size="small" class="step-bar">
                    <Step :title="seeType ? '会场模板' : editType ? '会场重设' : '选择会场模板'" content=""></Step>
                    <Step :title="seeType ? '宾客名单' : '上传宾客名单'" content=""></Step>
                    <Step :title="'会场预览'" content=""></Step>
                    <!-- <Step :title="`第4步：确定座位编号`" content=""></Step> -->
                </Steps>
                <!-- <section  class="button-area-item" v-if="step === 4">
                </section> -->
            </div>
            <div class="show-area" ref="show">
                <template v-if="step === 1 && !editType">
                    <div class="button-area">
                        <Button v-if="!seeType" type="primary" icon="md-add" @click="addNew">新增模板</Button>
                        <!-- <Button v-if="!seeType" type="primary" icon="md-trash" @click="deleteNew">删除模板</Button> -->
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
                        <Button v-if="!seeType" type="primary" icon="ios-cloud-download-outline" @click="download">下载模板</Button>
                        <Button v-if="!seeType" icon="ios-cloud-upload-outline" type="primary" @click="clickFile">{{ hasFile ? '重新上传' : '上传文件' }}</Button>
                        <Button v-if="!seeType" type="primary" icon="md-add" @click="mModel = true">新增宾客</Button>
                        <Select style="width: 100px;" v-model="searchClientSelect">
                            <Option value="clientName" label="宾客名"></Option>
                            <Option value="seatNo" label="座位号"></Option>
                        </Select>
                        <Input style="width: 200px; margin: 0 10px" v-model="searchClientInput" placeholder="输入宾客名搜索"  @input="searchClientFun" />
                    </div>
                </template>
                <div class="template-box">
                    <template v-if="step === 1 && !editType">
                        <Table ref="table" border stripe :max-height="tableHeight" :width="1100" :loading="tableLoading" :columns="seatColumns" :data="seatDatas"  @on-selection-change="onSelectChange">
                            <template slot-scope="{ row }" slot="select">
                                <Checkbox :disabled="row.disabled" v-model="row.chceked" @on-change="onSelectChange(row)"></Checkbox>
                            </template>
                            <template slot-scope="{ row }" slot="action">
                                <Button type="primary" size="small" @click="preViewImage(row)">{{ '预览' }}</Button>
                                <Button v-if="!seeType" style="margin-left: 10px" type="primary" size="small" @click="editModel(row)">{{ '编辑' }}</Button>
                                <Button v-if="!seeType" style="margin-left: 10px" type="error" size="small" @click="deleteNew(row)">{{ '删除' }}</Button>
                            </template>
                        </Table>
                    </template>
                    <template v-if="step === 1 && editType">
                        <Setting :type="'seats'" :editObj="seatListObj" :editList="seatList"></Setting>
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
                                <Button v-if="!seeType" type="primary" size="small" @click="changePeoples(row, index)">{{ row.edit ? '保存' : '编辑' }}</Button>
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
                                        <Input :disabled="seeType" v-model="names" placeholder="输入会场名" />
                                    </div>
                                </div>
                                <!-- <div class="info-item">
                                    <p>会场详情</p>
                                    <div>
                                        <Input :disabled="seeType" v-model="details" placeholder="输入会场详情" />
                                    </div>
                                </div> -->
                                <div class="info-item flex">
                                    <div class="item-flex">
                                        <!-- <p>会场人数</p>
                                        <div>
                                            <Input :disabled="seeType" v-model="numbers" type="number" placeholder="输入参与会场人数" />
                                        </div> -->
                                        <p>会场详情</p>
                                        <div>
                                            <Input :disabled="seeType" v-model="details" placeholder="输入会场详情" />
                                        </div>
                                    </div>
                                    <div class="item-flex">
                                        <p>主办人</p>
                                        <div>
                                            <Input :disabled="seeType" v-model="holders" placeholder="输入主办人名" />
                                        </div>
                                    </div>
                                </div>
                                <div class="info-item">
                                    <p>举办时间</p>
                                    <div>
                                        <DatePicker :disabled="seeType" type="datetime" v-model="times.start" :format="'yyyy-MM-dd HH:mm:ss'" placeholder="输入开始时间"></DatePicker>
                                        <span style="margin: 0 10px; font-size: 14px">至</span>
                                        <DatePicker :disabled="seeType" type="datetime" v-model="times.end" :format="'yyyy-MM-dd HH:mm:ss'" placeholder="输入结束时间"></DatePicker>
                                    </div>
                                </div>
                                <div class="info-item">
                                    <p>可扫码入场时间</p>
                                    <div style="text-align: left;">
                                        <DatePicker type="datetime" :disabled="seeType" v-model="times.qrcode" :format="'yyyy-MM-dd HH:mm:ss'" placeholder="输入扫码开始时间"></DatePicker>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </template>
                    <div class="button-area-item" :class="!seeType && step === 2 ? 'step2' : ''">
                        <Button v-if="step === 2 && !seeType" type="error" icon="md-trash" @click="deletes">删除宾客</Button>
                        <section>
                            <Button type="primary" v-if="[2,3].includes(step)" @click="changeStep('pre')">{{ '上一步' }}</Button>
                            <Button type="primary" v-if="step < 3" @click="changeStep('next')">{{ '下一步' }}</Button>
                            <Button type="primary" v-if="step === 3 && !seeType" @click="finalSave">{{ '确认生成' }}</Button>
                        </section>
                    </div>
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
                    <img :src="mImage" />
                    <!-- <img :src="'http://testcodethunder.oss-cn-shenzhen.aliyuncs.com/images/seat20201216233408.jpg'" /> -->
                </div>
            </Modal>
        </div>
        <!-- <Loading v-if="true"></Loading> -->
    </div>
</template>
<script>
import { confirmModal, downloadFile, checkFiles, formatDateTime } from '@/utils/index'
import Setting from './Setting';
import { getTemplates, rTemplate, dTemplate, uploadCustomers, exportCustomers, cSeat, uSeat } from '@/api/seat_api'
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
            seatListObj: {},
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
                    width: 150
                },
                {
                    title: '详情',
                    key: 'keyName',
                    // width: 200
                },
                {
                    title: '类型',
                    key: 'category',
                    width: 100
                },
                {
                    title: '容纳人数',
                    key: 'number',
                    width: 100
                },
                {
                    title: '创建人',
                    key: 'creater',
                    width: 100
                },
                {
                    title: '创建时间',
                    key: 'created',
                    width: 180
                },
                {
                    title: '操作',
                    key: 'action',
                    slot: 'action',
                    align: 'center',
                    width: 180
                }
            ],
            seatDatas: [],
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
            mImage: '',
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
            seeType: false,
            holders: '',
            names: '',
            details: '',
            numbers: 0,
            times: {
                start: '',
                end:'',
                qrcode: ''
            },
            editType: false,
            tableLoading: false
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
                    this.seeType = false;
                    this.editType = false;
                    this.selectedModule = [];
                    this.$nextTick(() => {
                        this.seatDatas.forEach(item => {
                            item.disabled = false;
                            item.chceked = false;
                        });
                    });
                } else {
                    if (v.opType === 'see') this.seeType = true;
                    else if (v.opType === 'edit') this.editType = true;
                    if (this.editType) {
                        let val = _.cloneDeep(v);
                        val.ct_table_number = "-1,-1,-1,-1,-1,-1,1,2,3,-1,-1,4,-1,5,-1,-1,6,7,8,-1,-1,-1,-1,-1,-1";
                        val.ct_content = "0,0,0,0,0,0,3,3,3,0,0,3,1,3,0,0,3,3,3,0,0,0,0,0,2";
                        val.ct_row = 3;
                        val.ct_col = 3;
                        this.seatListObj = val
                        this.formatSeats(this.seatListObj);
                    }
                    this.holders = v.people;
                    this.names = v.name;
                    this.details = v.detail;
                    this.numbers = Number(v.Number);
                    this.times = {
                        start: v.start,
                        end:v.end,
                        qrcode: v.ctQRCodeTime
                    };
                }
            }
        }
    },
    methods: {
        async backUsing(reflash) {
            console.log(111, reflash)
            this.type = '';
            this.seatList = [];
            this.seatListObj = {};
            this.showEditModel = false;
            if (reflash) {
                await this.getList();
            }
        },
        formatSeats(row) {
            let values = row.ct_content.split(',');
            let nos = row.ct_table_number.split(',');
            if (values.length !== nos.length) this.$Message.warning('该模板数据错误不可修复，请联系管理员');
            let firstArr = values.map((value, index) => {
                return {
                    value: Number(value),
                    No: Number(nos[index])
                }
            })
            let secondArr = [];
            let sIndex = 0;
            for(let i = 0; i < row.ct_row + 2; i++) {
                secondArr[i] = [];
                for (let j = 0; j < row.ct_col + 2; j++) {
                    secondArr[i].push(firstArr[sIndex]);
                    sIndex++;
                }
            }
            this.seatList = _.cloneDeep(secondArr);
            secondArr = [];
            console.log(secondArr,this.seatList)
        },
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
        deleteNew(row) {
            // if (_.isEmpty(this.selectedModule)) return this.$Message.warning({content: '请先选择模板', closable: true});
            // let str = '';
            // this.selectedModule.forEach(val => {
            //     str += `<p>${val.moduleName}</p>`;
            // })
            confirmModal('confirm', '提示', `<p>是否确认删除这些模板？</p><br />${row.moduleName}`, this.deleteModule, { id: row.ct_id });
        },
        async deleteModule(obj = {id: 0}) {
            if (!obj.id) return this.$Message.error('删除失败请重试');
            const res = await dTemplate({ ctId: String(obj.id) });
            if (res) {
                this.$Message.error('删除成功');
                let copyDatas = _.cloneDeep(this.copyDatas);
                copyDatas.forEach(item => {
                    if (obj.id === item.ct_id) {
                        this.copyDatas.splice(this.copyDatas.findIndex(v => { return obj.id === v.ct_id; }), 1);
                    }
                });
                this.debounceSearch();
            }
        },
        async download() {
            this.$Message.loading({
                content: '正在下载，请稍后...',
                duration: 2
            });
            const res = await exportCustomers();
            // let dFile = new File(res, '1.xlsx');
            downloadFile(res, '宾客名单模板.xlsx');
        },
        async upload(e) {
            const file = e.target.files;
            this.file = file[0];
            console.log(this.file);
            if (!checkFiles(0, 'excel', this.file)) return;
            const res = await uploadCustomers({ ctId: String(this.selectedModule.ct_id), file: this.file });
            if (res) {
                this.$Message.success('上传成功')
                this.file = null;
                this.$refs.fileInput.value = null;
                this.excelDatas = res.data;
                this.copyDatas = _.cloneDeep(this.excelDatas);
                this.debounceClientsSearch();
            }
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
            let bol = selection.ct_id === this.selectedModule.ct_id;
            this.selectedModule = !bol ? _.cloneDeep(selection) : {};
            // console.log(this.selectedModule);
            if (!_.isEmpty(this.selectedModule)) {
                this.seatDatas.forEach(item => {
                    if (item.ct_id !== this.selectedModule.ct_id) {
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
            if (this.step === 1 && !this.editType) {
                if (!this.showSelected) return this.$Message.warning({content: '请先选择一个模板', closable: true});
            }
            if (this.step === 2 && type === 'next' && !this.seeType) {
                return confirmModal('confirm', '提示', `<p>是否确认宾客名单无误？</p>`, this.stepfun, type);
            }
            this.stepfun(type);
            this.$refs.show.scrollTop = 0;
        },
        onSelectClientChange(selection) {
            this.selectedClients = selection;
        },
        preViewImage(row) {
            this.mImage = row.ct_img_url
            this.nModel = true;
        },
        async editModel(row) {
            this.loading = true;
            const res = await rTemplate({ctId: row.ct_id});
            console.log(res);
            this.loading = false;
            this.seatListObj = row;
            this.formatSeats(this.seatListObj);
            // this.seatList = [[{"value":0,"No":-1},{"value":0,"No":-1},{"value":0,"No":-1},{"value":0,"No":-1},{"value":0,"No":-1}],[{"value":0,"No":-1},{"value":3,"No":1},{"value":3,"No":2},{"value":3,"No":3},{"value":0,"No":-1}],[{"value":0,"No":-1},{"value":3,"No":4},{"value":3,"No":5},{"value":3,"No":6},{"value":0,"No":-1}],[{"value":0,"No":-1},{"value":3,"No":7},{"value":3,"No":8},{"value":3,"No":9},{"value":0,"No":-1}],[{"value":0,"No":-1},{"value":0,"No":-1},{"value":0,"No":-1},{"value":0,"No":-1},{"value":0,"No":-1}]];
            this.showEditModel = true;
        },
        async getList() {
            this.tableLoading = true;
            const res = await getTemplates({});
            this.tableLoading = false;
            if (res && res.data && res.data.content) {
                let datas = res.data.content.map(item => {
                    item.moduleName = item.ct_name;
                    item.keyName = '';
                    item.category = item.ct_type;
                    item.img = name[1];
                    item.number = item.ct_number;
                    item.creater = item.ct_creator_name;
                    item.created = item.ct_create_time;
                    item.chceked = false;
                    item.disabled = false;
                    return item;
                })
                this.seatDatas = _.cloneDeep(datas);
            }
        },
        async finalSave() {
            let params = {
                ctTemplateId: this.selectedModule.ct_id,
                ctOrganizerName: this.holders,
                ctName: this.names,
                ctBeginTime: formatDateTime(this.times.start),
                ctEndTime: formatDateTime(this.times.end),
                ctQRCodeTime: formatDateTime(this.times.qrcode),
                ctDetails: '',
                ctStatus: 0
            };
            if (this.editType) params.ctId = this.editData.ct_id;
            const res = !this.editType ? await cSeat(params) : await uSeat(params);
            this.$Message.success(!this.editType ? '新增会场成功' : '编辑会场成功');
            this.$router.push('seat-list');
        }
    },
    created() {
        this.searchFun = _.debounce(this.debounceSearch, 1000);
        this.searchClientFun = _.debounce(this.debounceClientsSearch, 1000);
    },
    mounted() {
        this.tableHeight = window.innerHeight - this.$refs.table.$el.offsetTop - 110;
    },
    async beforeMount() {
        // for(let i = 0; i < 100; i++) {
        //     this.seatDatas.push({
        //             moduleName: 'xx婚宴',
        //             keyName: 'xxxx婚宴专用.....',
        //             category: '婚宴型',
        //             number: 100,
        //             chceked: false,
        //             disabled: false
        //         })
        // }
        await this.getList();
        this.copyDatas = _.cloneDeep(this.seatDatas);
        this.copyExcelDatas = _.cloneDeep(this.excelDatas);
        if (this.seeType) {
            this.$nextTick(() => {
                //TODO: 编辑
                console.log(this.seatDatas.find(item => { return item.ct_id === this.editData.id; }));
                this.selectedModule = _.cloneDeep(this.seatDatas.find(item => { return item.ct_id === this.editData.id; }));
                this.seatDatas.forEach(item => {
                    item.disabled = true;
                    if (item.ct_id === this.selectedModule.ct_id) {
                        // item.disabled = true;
                        item.chceked = true;
                    } 
                });
                this.$forceUpdate();
            });
        }
    }
}
</script>
<style lang="scss" scoped>
.index-vue-seatusing {
    min-width: 1000px;
    height: 100%;
    display: flex;
    &.edit-style {
        width: 100%;
        & .show-area {
            & .template-box {
                width: 100% !important;
                height: calc(100% - 55px);
            }
        }

    }
    & .right-side {
        flex: 1;
        padding: 10px;
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
            & .template-box {
                width: fit-content;
            }
            & .button-area-item {
                padding: 10px 0;
                text-align: right;
                & button {
                    margin-right: 10px;
                    &:last-child {
                        margin-right: 0;
                    }
                }
                &.step2 {
                    display: flex;
                    justify-content: space-between;
                    text-align: unset;
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
            height: 350px;
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