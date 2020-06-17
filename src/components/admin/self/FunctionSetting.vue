<template>
    <div class="index-vue-function-setting">
        <div class="button-area top">
            <!-- <Button type="primary" icon="md-add" @click="alertModal('add')">新增功能模块</Button>
            <Button type="primary" icon="md-trash" @click="deletes">删除功能模块</Button> -->
            <Select style="width: 100px" v-model="searchSelect">
                <Option value="user" label="功能名"></Option>
            </Select>
            <Input style="width: 200px; margin-left: 10px" v-model="searchInput" placeholder="输入功能名搜索"  @input="searchFun" />
        </div>
        <Table ref="table" border stripe :max-height="tableHeight" :width="1062" :loading="false" :columns="columns" :data="datas"  @on-selection-change="onSelectChange">
            <template slot-scope="{ row }" slot="disabled">
                <SwitchTab v-model="row.disabled" :disabled="!row.active" size="small" />
            </template>
            <template slot-scope="{ row }" slot="price">
                <span>￥{{ row.price | FormatNum }}</span>
            </template>
            <template slot-scope="{ row }" slot="action">
                <div class="button-area">
                    <Button type="primary" size="small" @click="row.active = !row.active">{{row.active ? '确认' : '编辑'}}</Button>
                </div>
            </template>
        </Table>
    </div>
</template>
<script>
import { confirmModal } from '../../../utils/index'
export default {
    name: 'FunctionSetting',
    data () {
        return {
            searchSelect: 'user',
            searchInput: '',
            searchFun: null,
            editEnable: false,
            tableHeight: 0,
            loading: false,
            columns: [
                {
                    type: 'selection',
                    width: 60,
                    align: 'center'
                },
                {
                    title: '功能名',
                    key: 'name',
                    width: 100
                },
                {
                    title: '所属模块',
                    key: 'module',
                    width: 100
                },
                {
                    title: '功能详情',
                    key: 'detail',
                    width: 200,
                    tooltip: true
                },
                {
                    title: '创建时间',
                    key: 'created_at',
                    width: 150,
                    sortable: true
                },
                {
                    title: '权限',
                    key: 'level',
                    align: 'center',
                    width: 150
                },
                {
                    title: '是否停用',
                    key: 'disabled',
                    slot: 'disabled',
                    align: 'center',
                    width: 100
                },
                {
                    title: '价格',
                    key: 'price',
                    slot: 'price',
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
            ],
            datas: [
                {
                    name: '模板选择',
                    module: '会场设置',
                    created_at: '2016-10-01 00:00:00',
                    updated_at: '2016-10-01 00:00:00',
                    detail: '介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍',
                    disabled: true,
                    price: 300.00,
                    level: 2,
                    active: false
                },{
                    name: '模板定义',
                    module: '会场设置',
                    created_at: '2016-10-02 00:00:00',
                    updated_at: '2016-10-02 00:00:00',
                    detail: '介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍',
                    disabled: false,
                    price: 200.05,
                    level: 2,
                    active: false
                }
            ],
            copyDatas: [],
            selection: []
        }
    },
    methods: {
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
        async sureUpdate() {
            // TODO: 根据ID更新列表
        }
    },
    created() {
        this.searchFun = _.debounce(this.debounceSearch, 1000);
    },
    beforeMount() {
        this.copyDatas = _.cloneDeep(this.datas);
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