<template>
    <div class="index-vue-function-setting">
        <div class="button-area top">
            <Button v-if="level(this.role, true)" type="primary" icon="md-add" @click="alertModal(true)">新增功能模块</Button>
            <!-- <Button type="primary" icon="md-trash" @click="deletes">删除功能模块</Button> -->
            <Select style="width: 100px" v-model="searchSelect">
                <Option value="user" label="功能名"></Option>
            </Select>
            <Input style="width: 200px; margin-left: 10px" v-model="searchInput" placeholder="输入功能名搜索"  @input="searchFun" />
        </div>
        <Table ref="table" border stripe :max-height="tableHeight"  :width="1262" :loading="loading" :columns="columns" :data="datas"  @on-selection-change="onSelectChange">
            <template slot-scope="{ row, index }" slot="disabled">
                <SwitchTab v-model="datas[index].disabled" :disabled="!datas[index].active" size="small" @on-change="switchs(index)" />
            </template>
            <template slot-scope="{ row, index  }" slot="name">
                <span v-if="!row.active">{{ row.name }}</span>
                <template v-else>
                    <Input type="text" v-model="datas[index].name" />
                </template>
            </template>
            <template slot-scope="{ row, index  }" slot="order">
                <span v-if="!row.active">{{ Number(row.order) }}</span>
                <template v-else>
                    <Input v-model="datas[index].order" @on-blur="datas[index].order = datas[index].order.replace(/[^0-9]/g, '')" />
                </template>
            </template>
            <template slot-scope="{ row, index  }" slot="detail">
                <span v-if="!row.active">{{ row.detail }}</span>
                <template v-else>
                    <Input type="text" v-model="datas[index].detail" />
                </template>
            </template>
            <template slot-scope="{ row }" slot="price">
                <span v-if="!row.active">￥{{ row.price | FormatNum }}</span>
                <template v-else>
                    <Input type="text" v-model="row.price" @on-blur="changePrice($event, row)">
                        <div style="padding-top: 6px;" slot="prefix">￥</div>
                    </Input>
                </template>
            </template>
            <template slot-scope="{ row, index }" slot="action">
                <div class="button-area">
                    <Button type="primary" size="small" @click="edit(index)">{{datas[index].active ? '确认' : '编辑'}}</Button>
                </div>
            </template>
        </Table>
        <Modal
            v-model="modal"
            :title="'新增功能模块'"
            :loading="modalLoading"
            @on-ok="sureOK"
            @on-cancel="() => { this.setSubForm();  }">
            <Form ref="subForm" :model="subForm" :rules="subFormRules" class="subForm">
                <FormItem label="" prop="ctName">
                    <Input type="text" v-model="subForm.ctName" placeholder="功能名" clearable />
                </FormItem>
                <FormItem label="" prop="ctMapping">
                    <Input v-model="subForm.ctMapping" placeholder="映射" clearable />
                </FormItem>
                <FormItem label="" prop="ctOrder">
                    <Input type="number" min prefix="ios-funnel" v-model.trim="subForm.ctOrder" placeholder="排序号" clearable />
                </FormItem>
                <FormItem label="" prop="ctDescription">
                    <Input prefix="ios-text" v-model.trim="subForm.ctDescription" placeholder="功能详情" clearable />
                </FormItem>
                <FormItem label="" prop="ctPrice">
                    <Input prefix="logo-usd" v-model.trim="subForm.ctPrice" @on-blur="subForm.ctPrice = changePrice(null, {}, subForm.ctPrice)"  placeholder="价格" />
                </FormItem>
            </Form>
        </Modal>
    </div>
</template>
<script>
// import { confirmModal } from '@/utils/index'
import { mapGetters } from 'vuex';
import { FormatNum, level } from '@/utils/index';
import { getFunctionList, addFunction, validateFunctionMap, updateFunction, disableFunction, getUserFunctionList } from '../../../api/api'
export default {
    name: 'FunctionSetting',
    data () {
         const validateMap = async (rule, value, callback) => {
            if (value === '') {
               return callback(new Error('请输入映射'));
            } else if (value) {
                // const res = true;
                const res = await validateFunctionMap({ ctMapping: value });
                console.log(res);
                return res.data.validate ? callback() : callback(new Error('映射已存在'));
            }
        };
        return {
            searchSelect: 'user',
            searchInput: '',
            searchFun: null,
            editEnable: false,
            tableHeight: 0,
            loading: false,
            modal: false,
            modalLoading: false,
            columns: [
                {
                    type: 'selection',
                    width: 50,
                    align: 'center'
                },
                {
                    title: '功能ID',
                    key: 'id',
                    width: 100,
                    tooltip: true
                },
                {
                    title: '序号',
                    key: 'order',
                    align: 'center',
                    slot: 'order',
                    width: 100,
                },
                {
                    title: '功能名',
                    key: 'name',
                    slot: 'name',
                    width: 100,
                },
                {
                    title: 'Mapping',
                    key: 'mapping',
                    width: 150,
                    tooltip: true
                },
                // {
                //     title: '所属模块',
                //     key: 'module',
                //     width: 100
                // },
                {
                    title: '功能详情',
                    key: 'detail',
                    slot: 'detail',
                    minWidth: 150,
                    tooltip: true
                },
                {
                    title: '创建时间',
                    key: 'created_at',
                    width: 150,
                    sortable: true,
                    tooltip: true
                },
                {
                    title: '权限',
                    key: 'level',
                    align: 'center',
                    width: 150
                },
                {
                    title: '价格',
                    key: 'price',
                    slot: 'price',
                    align: 'center',
                    minWidth: 100
                }
            ],
            datas: [],
            copyDatas: [],
            selection: [],
            subForm: {
                ctName: '',
                ctMapping: '',	
                ctOrder: '',
                ctDescription: '',
                ctPrice: 0
            },
            subFormRules: {
                ctName: [
                    { required: true, message: '请输入功能名', trigger: 'blur' }
                ],
                ctMapping: [
                    { required: true, message: '请输入映射', trigger: 'blur' },
                    { required: true, validator: validateMap, trigger: 'blur' }
                ],
                ctDescription: [
                    { required: true, message: '请输入功能详情', trigger: 'blur' },
                ],
                ctPrice: [
                    { required: true, message: '请输入价格', trigger: 'blur' },
                ]
            }
        }
    },
    computed: {
        ...mapGetters({
            role: 'getRole'
        })
    },
    methods: {
        alertModal(type) {
            this.modal = type;
        },
        cancelLoading(time) {
            setTimeout(() => {
                this.modalLoading = false;
                this.$nextTick(() => {
                    this.modalLoading = true;
                });
            }, time);
        },
        setSubForm(item = null) {
            if (item) {
                this.subForm = {
                    ctName: item.ctName,
                    ctMapping: item.ctMapping,	
                    ctOrder: item.ctOrder,
                    ctDescription: item.ctDescription,
                    ctPrice: item.ctPrice
                };
            } else {
                this.subForm = {
                    ctName: '',
                    ctMapping: '',	
                    ctOrder: '',
                    ctDescription: '',
                    ctPrice: 0
                };
            }
        },
        async sureOK() {
            const fun = async (params) => {
                const res = await addFunction(params);
                if (res) {
                    // let newItem = {
                    //     name: res.data.content.ct_name,
                    //     module: '',
                    //     created_at: res.data.content.ct_create_time,
                    //     updated_at: '',
                    //     detail: res.data.content.ct_description,
                    //     price: this.changePrice(null, {}, res.data.content.ct_price),
                    //     disabled: res.data.content.ct_is_effective,
                    //     active: false,
                    //     mapping: res.data.content.ct_mapping,
                    //     id: res.data.content.ct_id,
                    //     order: Number(res.data.content.ct_order)
                    // }
                    // this.datas.push(newItem);
                    await this.getFunctions();
                    return true;
                } else {
                    return false;
                }
            }
            this.selection = [];
            this.$refs.subForm.validate(async (valid) => {
                console.log(valid);
                if (valid) {
                    let isEmpty = false;
                    for(let k in this.subForm) {
                        if (!this.subForm[k] && k !== 'ctOrder') { isEmpty = true; break; }
                    }
                    if (!isEmpty && valid) {
                        const res = await fun(this.subForm);
                        this.cancelLoading(2000);
                        if (res) {
                            this.$Message.success('新增功能成功');
                            this.$refs.subForm.resetFields();
                            this.modal = false;
                        } else {
                            this.$Message.error('新增功能失败，请重试');
                        }
                    } else {
                        this.cancelLoading(500);
                        return this.$Message.error('新增功能失败，请重试');
                    }
                } else {
                    this.cancelLoading(500);
                    this.$Message.error('请输入正确的功能模块信息');
                }
            });
        },
        datasChange(e, title) {
            let data = this.datas.find(item => {
                return item.title === title;
            })
            if (data) data.content = e;
        },
        changePrice(e, row = {}, price = 0) {
            const findIndex = (row) => {
                return this.datas.findIndex(item => {
                    return item.id === row.id;
                })
            }
            if (!_.isEmpty(row)) {
                this.datas[findIndex(row)].price = FormatNum(e.target.value);
                this.datas[findIndex(row)].active = true;
            } else {
                price = FormatNum(price);
                console.log(price);
                return price;
            }
            // return value;
        },
        debounceSearch() {
            if (this.searchInput) {
                let reg = new RegExp(this.searchInput, "i");
                this.datas = this.copyDatas.filter(val => {
                    return reg.test(val.name);
                });
            } else {
                this.datas = _.cloneDeep(this.copyDatas);
            }
            this.selection = [];
        },
        onSelectChange(selection) {
            console.log(selection);
            this.selection = _.cloneDeep(selection);
        },
        async edit(index) {
            if (this.datas[index].active) {
                let params = {
                    ctId: Number(this.datas[index].id),
                    ct_name: this.datas[index].name,
                    ctTypeId: 1,
                    ctOrder: this.datas[index].order,
                    ctDescription: this.datas[index].detail,
                    ctPrice: Number(this.datas[index].price)
                }
                console.log(params);
                const res = await updateFunction(params);
                if (res) {
                    this.$Message.success('更新功能成功');
                } else {
                    this.$Message.error('更新功能失败，请重试');
                }
            }
            this.datas[index].active = !this.datas[index].active
        },
        async switchs(index) {
            console.log(this.datas[index]);
            const res = await disableFunction({
                ctId: this.datas[index].id,
                ctIsEffective: this.datas[index].disabled
            });
            console.log(res);
        },
        async sureUpdate() {
            // TODO: 根据ID更新列表
        },
        async getFunctions() {
            this.loading = true;
            const res = level(this.role, true) ? await getFunctionList() : await getUserFunctionList();
            this.loading = false;
            if (res && res.data) {
                this.datas = res.data.content.map(item => {
                    let newItem = {
                        name: item.ct_name,
                        module: '',
                        created_at: item.ct_create_time,
                        updated_at: '',
                        detail: item.ct_description,
                        price: this.changePrice(null, {}, item.ct_price),
                        disabled: item.ct_is_effective,
                        active: false,
                        mapping: item.ct_mapping,
                        id: item.ct_id,
                        order: Number(item.ct_order)

                    };
                    return newItem;
                });
                this.copyDatas = _.cloneDeep(this.datas);
            }
        }
    },
    created() {
        this.searchFun = _.debounce(this.debounceSearch, 1000);
        if (level(this.role, true)) {
            this.columns = this.columns.concat([
                {
                    title: '是否停用',
                    key: 'disabled',
                    slot: 'disabled',
                    align: 'center',
                    width: 100
                },
                {
                    title: '操作',
                    key: 'action',
                    slot: 'action',
                    align: 'center',
                    width: 100
                }
            ])
        }
    },
    async beforeMount() {
        await this.getFunctions();
    },
    mounted() {
        this.tableHeight = window.innerHeight - this.$refs.table.$el.offsetTop - 250;
    }
}
</script>
<style lang="scss" scoped>
.index-vue-function-setting {
    padding: 20px;
    & .button-area {
        & button {
            margin-right: 10px;
            &:last-child {
                margin-right: 0;
            }
        }
        &.top {
            text-align: left;
            margin-bottom: 20px;
        }
    }
}
</style>