<template>
    <div class="index-vue-seatlist">
        <div v-show="!editType" class="right-side">
            <div class="show-area">
                <div class="button-area">
                    <Button type="primary" icon="md-add" @click="() => { this.$router.push('seat-using'); }">新增会场</Button>
                    <!-- <Button type="primary" icon="md-trash">删除会场</Button> -->
                    <Select style="width: 100px;" v-model="searchSelect" @on-change="searchFun">
                        <Option value="name" label="会场名"></Option>
                        <Option value="people" label="主办人名"></Option>
                    </Select>
                    <Input style="width: 200px; margin: 0 10px" v-model="searchInput" placeholder="输入用户名搜索"  @input="searchFun" />
                </div>
                <div style="width: fit-content">
                    <Table ref="table" border stripe :max-height="tableHeight" :width="1100" :loading="false" :columns="seatColumns" :data="seatDatas">
                        <template slot-scope="{ row, index }" slot="action">
                            <Button type="primary" size="small" @click="seeRow(row, index)">{{ '查看' }}</Button>
                            <Button style="margin-left: 10px" type="primary" size="small" @click="editRow(row, index)">{{ '编辑' }}</Button>
                            <Button style="margin-left: 10px" type="primary" size="small" @click="uploadRow(row, index)">{{ '上传名单' }}</Button>
                        </template>
                    </Table>
                </div>
            </div>
            <Modal
                v-model="mModel"
                :title="'上传宾客名单'"
                width="682px"
                :footer-hide="true">
                <div class="file-modal">
                    <div class="button-area clear-flex">
                        <Button type="primary" icon="ios-cloud-download-outline" @click="download">下载模板</Button>
                        <input type="file" ref="fileInput" hidden accept="application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" @change="upload"/>
                        <Button icon="ios-cloud-upload-outline" type="primary" @click="clickFile">{{ '上传文件' }}</Button>
                        <Button type="primary" icon="md-add" @click="adds">新增宾客</Button>
                        <Select style="width: 100px;" v-model="searchClientSelect">
                            <Option value="clientName" label="宾客名"></Option>
                            <Option value="seatNo" label="座位号"></Option>
                        </Select>
                        <Input style="width: 200px; margin: 0 10px" v-model="searchClientInput" placeholder="输入宾客名搜索"  @input="searchClientFun" />
                    </div>
                    <Table ref="table" border stripe :max-height="tableHeight - 200" :width="650" :loading="false" :columns="excelColumns" :data="excelDatas"  @on-selection-change="onSelectClientChange">
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
                            <Button type="primary" size="small" v-if="showEditOne(index)" @click="changePeoples(row, index)">{{ row.edit ? '保存' : '编辑' }}</Button>
                        </template>
                    </Table>
                    <div class="button-area bottom">
                        <Button type="error" icon="md-trash" @click="deletes">删除宾客</Button>
                        <Button type="primary" :loading="fileLoading" @click="sureCilents">{{ '确认上传' }}</Button>
                    </div>
                </div>
            </Modal>
        </div>
        <Using v-if="editType" :editData="editData" @back="backRow"></Using>
    </div>
</template>
<script>
import { confirmModal, downloadFile, formatDateTime, checkFiles } from '@/utils/index'
import Using from './Using';
import { getSeats, uploadCustomers, exportCustomers, importCustomers } from '@/api/seat_api';
export default {
    name: 'List',
    data() {
        return {
            tableHeight: 0,
            searchSelect: 'name',
            searchInput: '',
            searchFun: null,
            seatColumns: [
                {
                    title: '会场名',
                    key: 'name',
                    width: 150,
                    tooltip: true
                },
                {
                    title: '详情',
                    key: 'detail',
                    width: 200,
                    tooltip: true
                },
                {
                    title: '主办人',
                    key: 'people',
                    width: 100
                },
                {
                    title: '会场人数',
                    key: 'number',
                    width: 90
                },
                {
                    title: '开始时间',
                    key: 'start',
                    minWidth: 45
                },
                {
                    title: '结束时间',
                    key: 'end',
                    minWidth: 45
                },
                {
                    title: '操作',
                    key: 'action',
                    slot: 'action',
                    align: 'center',
                    width: 250
                }
            ],
            seatDatas: [],
            copySeatDatas: [],
            mModel: false,
            fileLoading: false,
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
            changeCopyPeopleIndex: -1,
            excelDatas: [],
            copyExcelDatas: [],
            searchClientFun: null,
            selectedClients: [],
            searchClientSelect: 'clientName',
            searchClientInput: '',
            editType: false,
            editData: undefined
        }
    },
    components: {Using},
    computed: {
        hasClients() {
            return this.excelDatas.length;
        },
        hasFile() {
            return this.file;
        },
    },
    watch:{
        searchClientSelect() {
            this.searchClientInput = '';
            this.debounceClientsSearch();
        }
    },
    methods: {
        async download() {
            const res = await exportCustomers();
            // let dFile = new File(res, '1.xlsx');
            downloadFile(res, '宾客名单模板.xlsx');
        },
        debounceSearch() {
            if (this.searchInput) {
                // let reg = new RegExp(this.searchInput, "i");
                let tag = this.searchSelect;
                this.seatDatas = this.copySeatDatas.filter(val => {
                    return val[tag].indexOf(this.searchInput) > -1;
                });
            } else {
                this.seatDatas = _.cloneDeep(this.copySeatDatas);
            }
        },
        backRow() {
            if (this.editType) {
                this.editType = false;
                this.editData = undefined;
            }
        },
        seeRow(row, index) {
            if (this.editType) {
                this.editType = false;
                this.editData = undefined;
                return;
            }
            this.editData = _.cloneDeep(row);
            this.editData.opType = 'see'
            this.editType = true;
        },
        editRow(row, index) {
            if (this.editType) {
                this.editType = false;
                this.editData = undefined;
                return;
            }
            this.editData = _.cloneDeep(row);
            this.editData.opType = 'edit'
            this.editType = true;
        },
        uploadRow(row, index) {
            if (this.mModel) {
                this.mModel = false;
                this.editData = undefined;
                return;
            }
            this.editData = _.cloneDeep(row);
            this.mModel = true;
        },
        clickFile() {
            this.$refs.fileInput.click();
        },
        adds() {
            this.excelDatas.push({
                client_name: '',
                seat_no: 0,
                des: '',
                edit: true
            });
            this.debounceClientsSearch();
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
            return new Promise((resolve) => {
                setTimeout(() => {
                    fun();
                    resolve(true);
                }, 2000);
            });
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
        onSelectClientChange(selection) {
            this.selectedClients = selection;
        },
        async upload(e) {
            const file = e.target.files;
            this.file = file[0];
            console.log(this.file);
            if (!checkFiles(0, 'excel', this.file)) return;
            const res = await uploadCustomers({ file: this.file });
            if (res) {
                this.$Message.success('新增宾客成功')
                this.file = null;
                this.$refs.fileInput.value = null;
                this.excelDatas = res.data.map(item => {
                    return {
                        client_name: item.name,
                        seat_no: item.tableNumber,
                        des: item.description,
                        edit: false
                    }
                });
                this.copyExcelDatas = _.cloneDeep(this.excelDatas);
                this.$forceUpdate();
                this.debounceClientsSearch();
            }
            this.$refs.fileInput.value = null;
            
        },
        async sureCilents() {
            this.fileLoading = true;
            let list = this.excelDatas.filter(item => {
                return item.client_name && item.seat_no;
            });
            let _this = this;
            if (list.length) {
                list = list .map(item => {
                    return {
                        name: item.client_name,
                        tableNumber: item.seat_no,
                        description: item.des,
                    }
                })
                const res = await importCustomers({ ctId: this.editData.id, customer: list })
                if (res) {
                    _this.fileLoading = false;
                    _this.$Message.success('上传成功');
                    _this.mModel = false;
                }
            }
        },
        changePeoples(row, index) {
            if (!row.edit) {
                return this.excelDatas[index].edit = !row.edit;
                // this.changeCopyPeopleIndex = this.copyExcelDatas.findIndex(item => {
                //     return item.client_name === client_name && item.seat_no === seat_no && item.des === des;
                // });
                // return;
            }
            let { client_name, seat_no, des } = row;
            if (!client_name || !seat_no || !des) return this.$Message.warning('请填写姓名和座位号')
            this.excelDatas[index].client_name = client_name;
            this.excelDatas[index].seat_no = seat_no;
            this.excelDatas[index].des = des;
            this.excelDatas[index].edit = !row.edit;
            let changeCopyPeopleIndex = this.copyExcelDatas.findIndex(item => {
                return item.client_name === client_name && item.seat_no === seat_no && item.des === des;
            });
            if (changeCopyPeopleIndex === -1) this.copyExcelDatas.push(this.excelDatas[index]);
            else this.$set(this.copyExcelDatas, changeCopyPeopleIndex, this.excelDatas[index]);
            this.debounceClientsSearch();
        },
        showEditOne(index) {
            return !this.excelDatas.some(item => {return item.edit; }) || this.excelDatas[index].edit
        },
        async getList() {
            const res = await getSeats();
            if (res && res.data && res.data.content) {
                let datas = res.data.content.map(item => {
                    item.id = item.ct_id;
                    item.name = item.ct_name;
                    item.detail = item.ct_description;
                    item.people = item.ct_organizer_name;
                    item.number = item.ct_number;
                    item.start = formatDateTime(item.ct_begin_time);
                    item.end = formatDateTime(item.ct_end_time);
                    return item;
                })
                this.seatDatas = _.cloneDeep(datas);
            }
        }
    },
    mounted() {
        this.tableHeight = window.innerHeight - this.$refs.table.$el.offsetTop - 80;
    },
    beforeMount() {
        this.getList();
        this.searchClientFun = _.debounce(this.debounceClientsSearch, 1000);
        this.searchFun = _.debounce(this.debounceSearch, 1000);
        this.copyExcelDatas = _.cloneDeep(this.excelDatas);
        this.copySeatDatas = _.cloneDeep(this.seatDatas);
    }
}
</script>
<style lang="scss" scoped>
.index-vue-seatlist {
    min-width: 1000px;
    height: 100%;
    display: flex;
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
}
::v-deep .ivu-modal {
    .file-modal {
        // width: ;
        & .button-area {
            display: flex;
            padding-bottom: 10px;
            & .ivu-btn { margin-right: 10px; }
            &.bottom {
                padding: 10px 0;
                justify-content: space-between;
                & .ivu-btn { margin-right: 0; }
            }
        }
    }
}
</style>