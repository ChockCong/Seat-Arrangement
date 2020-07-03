<template>
    <div>
        <Input style="width: 200px; margin-bottom: 10px" v-model="searchFunctionInput" placeholder="输入功能名或模块名搜索"  @input="searchFunctionFun" />
        <Table ref="table" border stripe :height="functionTableHeight" :width="668" :loading="false" :columns="functionColumns" :data="functionList"></Table>
    </div>
</template>
<script>
import FunctionExpand from './FunctionListExpand';
export default {
    name: 'FunctionList',
    props: {
        sales: Boolean
    },
    components: { FunctionExpand },
    data() {
        return {
            functionTableHeight: 0,
            searchFunctionInput: '',
            searchFunctionFun: null,
            functionColumns: [
                {
                    type: 'expand',
                    width: 60,
                    render: (h, params) => {
                        return h(FunctionExpand, {
                            props: {
                                functionItem: params.row
                            },
                            on: { updateRole: this.updateRole }
                        })
                    }
                },
                {
                    title: '功能',
                    key: 'name',
                    align: 'center',
                    width: 100
                },
                {
                    title: '所属模块',
                    key: 'module',
                    align: 'center',
                    width: 100
                },
                {
                    title: '功能详情',
                    key: 'details',
                    align: 'left',
                    tooltip: true
                }
            ],
            functionList: [{
                id: 1,
                name: '模板选择',
                module: '会场设置',
                details: '介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍',
                price: 300.00,
                roles: [
                    { action_1: { role: [] } },
                    { action_2: { role: [] } }
                ],
                _expanded: false
            },{
                id: 2,
                name: '模板定义',
                module: '会场设置',
                details: '介绍介绍介绍介绍介绍介绍',
                price: 200.00,
                roles: [
                    { action_1: { role: [] } },
                    { action_2: { role: [] } }
                ],
                _expanded: false
            }],
            functionSelection: [],
            copyFunctionList: [],
        }
    },
    methods: {
        debounceSearchFunction() {
            if (this.searchFunctionInput) {
                let reg = new RegExp(this.searchFunctionInput, "i");
                this.functionList = this.copyFunctionList.filter(val => {
                    return reg.test(val.name) || reg.test(val.module);
                });
            } else {
                this.functionList = _.cloneDeep(this.copyFunctionList);
            }
            this.functionSelection = [];
        },
        onFunctionSelectChange(selection) {
            this.functionSelection = _.cloneDeep(selection);
            this.$emit('confirm', this.functionSelection);
        },
        updateRole(item, key) {
            this.copyFunctionList.forEach(element => {
                if (element.id === item.id) {
                    if(key === 'roles') element[key] = _.cloneDeep(item[key]);
                    else element[key] = item[key];
                }
            });
            if(key === 'roles') this.$Message.success({content: '设置功能权限成功', closable: true});
            this.debounceSearchFunction();
            // this.$forceUpdate();
        }
    },
    created() {
        this.searchFunctionFun = _.debounce(this.debounceSearchFunction, 1000);
    },
    beforeMount() {
        this.copyFunctionList = _.cloneDeep(this.functionList);
        if (this.sales) {
            this.functionColumns.push({
                title: '价格',
                key: 'price',
                align: 'center',
            });
        }
    },
    mounted() {
        this.functionTableHeight = window.innerHeight - this.$refs.table.$el.offsetTop - 500;
    }
}
</script>