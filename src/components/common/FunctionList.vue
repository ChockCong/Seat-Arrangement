<template>
    <div>
        <Input style="width: 200px; margin-bottom: 10px" v-model="searchFunctionInput" placeholder="输入功能名或模块名搜索"  @input="searchFunctionFun" />
        <Table ref="table" border stripe :height="functionTableHeight" :width="668" :loading="false" :columns="functionColumns" :data="functionList">
            <template slot-scope="{ row, index }" slot="open">
                <SwitchTab v-model="functionList[index].isOpen" size="small" @on-change="changeEffective(row, index)" />
            </template>
        </Table>
    </div>
</template>
<script>
import { changeSubAuth } from '@/api/api';
import FunctionExpand from './FunctionListExpand';
export default {
    name: 'FunctionList',
    props: {
        originFunctions: Array,
        user: Object,
        sales: Boolean
    },
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
                            key: 'expendComponent',
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
                },
                {
                    title: '开关',
                    key: 'open',
                    slot: 'open',
                    align: 'center',
                    width: 70
                }
            ],
            functionList: [],
            functionSelection: [],
            copyFunctionList: [],
        }
    },
    watch: {
        originFunctions:{
            immediate: true,
            handler: function(value) {
                this.functionList = value.map(item => {
                    item.isOpen = false;
                    item._expanded = false;
                    let openTag = false;
                    item.roles.forEach(fun => {
                        if (fun.action.role && fun.action.role.length) openTag = true;
                    })
                    item.isOpen = openTag;
                    return item;
                });
                 this.copyFunctionList = _.cloneDeep(this.functionList);
                if (this.sales) {
                    this.functionColumns.push({
                        title: '价格',
                        key: 'price',
                        align: 'center',
                    });
                }
            }
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
        updateRole(item, key, response = false) {
            this.copyFunctionList.forEach(element => {
                if (element.id === item.id) {
                    if(key === 'roles') {
                        if (response) {
                            element[key] = _.cloneDeep(item[key]);
                            element['isOpen'] = item['isOpen'];
                        } else {}
                    } else element[key] = item[key];
                }
            });
            if(key === 'roles' && response) this.$Message.success({content: '设置功能权限成功', closable: true});
            this.debounceSearchFunction();
            // this.$forceUpdate();
        },
        async changeEffective(row, index) {
            const res = await changeSubAuth({
                ctId: 1318818705353769000,
                ctOrgId: this.user.id,
                ctIsEffective: !this.copyFunctionList[index].isOpen
            })
            if (res && res.data) {
                this.copyFunctionList[index].isOpen = !this.copyFunctionList[index].isOpen;
                this.copyFunctionList[index].roles.forEach(fun => {
                    fun.action.role = this.copyFunctionList[index].isOpen ? ['管理员'] : [];
                });
                this.copyFunctionList[index]._expanded = false;
                this.updateRole(this.copyFunctionList[index], 'roles', true);
            } else {
                this.updateRole(this.copyFunctionList[index], 'roles', false);
            }
            this.$forceUpdate();
            
        }
    },
    created() {
        this.searchFunctionFun = _.debounce(this.debounceSearchFunction, 1000);
    },
    async beforeMount() {},
    mounted() {
        this.functionTableHeight = window.innerHeight - this.$refs.table.$el.offsetTop - 500;
    },
    beforeDestroy() {
        this.functionList = [];
        this.copyFunctionList = _.cloneDeep(this.functionList);
    }
}
</script>