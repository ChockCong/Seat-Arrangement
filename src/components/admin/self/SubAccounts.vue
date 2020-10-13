<template>
    <div class="index-vue-sub-accounts">
        <div class="button-area top">
            <Button type="primary" icon="md-add" @click="alertModal('add')">新增子账户</Button>
            <Button type="primary" icon="md-trash" @click="deletes">删除子账户</Button>
            <Select style="width: 100px; margin-left: 10px" v-model="searchSelect">
                <Option value="user" label="用户名"></Option>
            </Select>
            <Input style="width: 200px; margin-left: 10px" v-model="searchInput" placeholder="输入用户名搜索"  @input="searchFun" />
        </div>
        <Table ref="table" border stripe :max-height="tableHeight" :width="1153" :loading="false" :columns="columns" :data="datas"  @on-selection-change="onSelectChange">
            <template slot-scope="{ row }" slot="level">
                <Tag color="green">{{level(row.level)}}</Tag>
            </template>
            <template slot-scope="{ row, index }" slot="disabled">
                <SwitchTab v-model="row.disabled" size="small" @on-change="changeEffective(index, row)" />
            </template>
            <template slot-scope="{ row }" slot="action">
                <div class="button-area">
                    <Button type="primary" size="small" @click="alertModal('edit', row.user)">编辑</Button>
                    <Button type="primary" size="small" @click="alertFunctionModel(row.user)">功能权限</Button>
                </div>
            </template>
        </Table>
        <Modal
            v-model="modal"
            :title="modalType === 'add' ? '新增子账户' : '编辑账户信息'"
            :loading="modalLoading"
            @on-ok="sureOK"
            @on-cancel="() => { this.modalType = ''; this.modal = false }">
            <Form ref="subForm" :model="subForm" :rules="subFormRules" class="subForm">
                <FormItem label="" prop="stLoginName">
                    <Input type="text" prefix="md-contact" v-model="subForm.stLoginName" placeholder="登录名" clearable />
                </FormItem>
                <FormItem label="" prop="stName">
                    <Input prefix="md-happy" v-model="subForm.stName" placeholder="用户名" clearable />
                </FormItem>
                <FormItem label="" prop="stPhoneNum">
                    <Input min prefix="ios-phone-portrait" v-model.trim="subForm.stPhoneNum" placeholder="手机号码" clearable />
                </FormItem>
                <FormItem label="" prop="stEmail">
                    <Input prefix="md-mail" v-model.trim="subForm.stEmail" placeholder="邮箱地址" clearable />
                </FormItem>
                <FormItem label="" prop="stPassword">
                    <Input :type="seePwd ? 'text' : 'password'" prefix="ios-lock" v-model.trim="subForm.stPassword" placeholder="登录密码">
                        <Icon style="cursor: pointer;" @click="seePwd = !seePwd" :type="seePwd ? 'ios-eye' : 'ios-eye-off'" slot="suffix" />
                    </Input>
                </FormItem>
                <FormItem label="" prop="comfirmPassword">
                    <Input :type="seeSubPwd ? 'text' : 'password'" prefix="ios-lock-outline" v-model.trim="subForm.comfirmPassword" placeholder="确认密码">
                        <Icon style="cursor: pointer;" @click="seeSubPwd = !seeSubPwd" :type="seeSubPwd ? 'ios-eye' : 'ios-eye-off'" slot="suffix" />
                    </Input>
                </FormItem>
                <!-- <FormItem prop="">
                    <Select v-model="subForm.functions" multiple prefix="ios-settings" placeholder="选择需要的功能权限">
                        <Option v-for="(item, index) in functionList" :value="item.name" :label="item.label" :key="index"></Option>
                    </Select>
                </FormItem> -->
            </Form>
        </Modal>
        <Modal
            v-model="functionModel"
            :title="'功能分配'"
            :loading="modalLoading"
            :width="700"
            @on-ok="sureFunction"
            @on-cancel="() => { this.functionModel = false }">
            <FunctionList @confirm="confirmFunction"></FunctionList>
            <!-- <Input style="width: 200px; margin-bottom: 10px" v-model="searchFunctionInput" placeholder="输入功能名或模块名搜索"  @input="searchFunctionFun" />
            <Table ref="table" border stripe :height="functionTableHeight" :width="668" :loading="false" :columns="functionColumns" :data="functionList"  @on-selection-change="onFunctionSelectChange"></Table> -->
        </Modal>
    </div>
</template>
<script>
import { confirmModal } from '@/utils/index'
import FunctionList from '@/components/common/FunctionList'
import { getChildrenList, addChild, disableChild } from '@/api/api';
export default {
    name: 'SubAccounts',
    components: {FunctionList},
    data () {
        const validatePassWord = (rule, value, callback) => {
            let reg = new RegExp(/^(?=.*[a-zA-Z]+)(?=.*[0-9]+)[a-zA-Z0-9]+$/);
            if (value === '') {
                return callback(new Error('请输入密码'));
            } else if (!reg.test(value)) {
                return callback(new Error('密码必须包含英文和数字'));
            } else if (this.subForm.comfirmPassword && value !== this.subForm.comfirmPassword) {
                return callback(new Error('两次密码输入不一致请重新输入'));
            } else {
                return callback();
            }
        };
        const validatePassCheck = (rule, value, callback) => {
            if (value === '') {
                return callback(new Error('请二次输入确认密码'));
            } else if (this.subForm.stPassword && value !== this.subForm.stPassword) {
                return callback(new Error('两次密码输入不一致请重新输入'));
            } else {
                return callback();
            }
        };
        const validatePhoneCheck = (rule, value, callback) => {
            let reg = new RegExp(/\d$/);
            if (value === '') {
                return callback(new Error('请输入手机号码'));
            } else if (!reg.test(value)) {
                return callback(new Error('请输入正确的手机号码'));
            } else if (value.length < 11) {
                return callback(new Error('请输入至少11位手机号码'));
            } else {
                return callback();
            }
        };
        return {
            searchSelect: 'user',
            searchInput: '',
            searchFun: null,
            modal: false,
            modalType: '',
            modalLoading: true,
            tableHeight: 0,
            loading: false,
            columns: [
                {
                    type: 'selection',
                    width: 60,
                    align: 'center'
                },
                {
                    title: '权限',
                    slot: 'level',
                    key: 'level',
                    width: 110
                },
                {
                    title: '用户ID',
                    key: 'id',
                    tooltip:true,
                    width: 100
                },
                {
                    title: '用登录户名',
                    key: 'login',
                    tooltip:true,
                    width: 180
                },
                {
                    title: '用户名',
                    key: 'user',
                    tooltip:true,
                    width: 100
                },
                {
                    title: '创建时间',
                    key: 'created_at',
                    width: 150,
                    sortable: true
                },
                {
                    title: '最近登陆时间',
                    key: 'updated_at',
                    width: 150,
                    sortable: true
                },
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
                    width: 200
                }
            ],
            datas: [
                {
                    id: 111,
                    user: '子用户test',
                    created_at: '2016-10-01 00:00:00',
                    updated_at: '2016-10-01 00:00:00',
                    disabled: false,
                    level: 1
                }
            ],
            copyDatas: [],
            selection: [],
            functionModel: false,
            seePwd: false,
            seeSubPwd: false,
            subForm: {
                stName: '',
                stLoginName: '',
                stPassword: '',
                stPhoneNum: '',
                stEmail: '',
                comfirmPassword: '',
                functions: []
            },
            subFormRules: {
                stName: [
                    { required: true, message: '请输入用户名', trigger: 'blur' }
                ],
                stLoginName: [
                    { required: true, message: '请输入登录名', trigger: 'blur' }
                ],
                stPhoneNum: [
                    { required: true, validator: validatePhoneCheck, trigger: ['blur','change'] }
                ],
                stEmail: [
                    { required: true, message: '请输入邮箱', trigger: ['blur','change'] },
                    { required: true, type: 'email', message: '请输入正确邮箱', trigger: 'blur' }
                ],
                stPassword: [
                    { required: true, validator: validatePassWord, trigger: ['blur','change'] }
                ],
                comfirmPassword: { required: true, validator: validatePassCheck, trigger: ['blur','change'] }
            }
        }
    },
    methods: {
        cancelLoading(time) {
            setTimeout(() => {
                this.modalLoading = false;
                this.$nextTick(() => {
                    this.modalLoading = true;
                });
            }, time);
        },
        updateTable(datas) {
            this.datas = [];
            let copyDatas = datas;
            this.datas = _.cloneDeep(copyDatas);
        },
        debounceSearch() {
            if (this.searchInput) {
                let reg = new RegExp(this.searchInput, "i");
                this.datas = this.copyDatas.filter(val => {
                    return reg.test(val.user);
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
        alertModal(type, id = null) {
            this.modalType = type;
            if (this.modalType !== 'add' && id) this.updateItem(id);
            this.modal = true;
        },
        alertFunctionModel() {
            this.functionModel = true;
        },
        deletes() {
            if (!this.selection.length) {
                return this.$Message.warning({content: '请先选择子账户', closable: true});
            }
            let str = '';
            this.selection.forEach(val => {
                str += `<p>${val.user}</p>`;
            })
            confirmModal('confirm', '提示', `<p>是否确认删除这些账户？</p><br />${str}`, this.sureDelete);
        },
        async changeEffective(index, row) {
            let params = { ctId: row.id };
            let status = this.datas[index].disabled;
            const res = await disableChild(params);
            if (res) {
                this.$Message.success('停用账号成功');
            } else {
                this.$Message.error('停用账号失败，请重试');
                this.datas[index].disabled = status;
                setTimeout(() => {
                    this.updateTable(this.datas);
                }, 300);
            }
        },
        async updateItem(id) {
            let item = this.datas.find(val => {
                return val.user === id;
            });
            if (!_.isEmpty(item)) {
                this.subForm = _.cloneDeep(item);
                delete this.subForm['user'];
                delete this.subForm['created_at'];
                delete this.subForm['level'];
                delete this.subForm['updated_at'];
                delete this.subForm['disabled'];
            } else {
                this.modal = false;
            }
        },
        async sureOK() {
            const fun = async (params) => {
                const res = await addChild(params);
                if (res) {
                    let newItem = {
                        id: res.data.ctId,
                        login: res.data.ctLoginName,
                        user: res.data.ctName,
                        created_at: res.data.ctCreateTime,
                        updated_at: res.data.ctLastLoginTime,
                        disabled: !res.data.ctIsEffective,
                        level: res.data.ctType
                    }
                    this.datas.push(newItem);
                    return true;
                } else {
                    return false;
                }
            }
            this.selection = [];
            if (this.modalType === 'add') {
                this.$refs['subForm'].validate(async (valid) => {
                    console.log(valid);
                    if (valid) {
                        let isEmpty = false;
                        for(let k in this.subForm) {
                            if (!this.subForm[k]) { isEmpty = true; break; }
                        }
                        if (!isEmpty && valid) {
                            let params = {
                                ctLoginName: this.subForm.stLoginName,
                                ctName: this.subForm.stName,
                                ctPassword: this.subForm.stPassword
                            }
                            const res = await fun(params);
                            this.cancelLoading(2000);
                            if (res && res.data) {
                                this.$refs.subForm.resetFields();
                                this.modal = false;
                            } else {
                                this.$Message.error('新增子账号失败，请重试');
                            }
                        } else {
                            this.cancelLoading(500);
                            return this.$Message.error('新增子账号失败，请重试');
                        }
                    } else {
                        this.cancelLoading(500);
                        this.$Message.error('请输入正确的子账号信息');
                    }
                });
            } else {
                this.sureUpdate();
                this.$refs.subForm.resetFields();
                this.modal = false;
            }
        },
        async sureDelete() {
            const fun = () => {
                let selected = this.selection.map(val => {
                    return val.user;
                });
                console.log(selected);
                let copyDatas = _.cloneDeep(this.datas);
                copyDatas.forEach(item => {
                    if (selected.includes(item.user)) {
                        this.datas.splice(this.datas.findIndex(v => { return item.user === v.user; }), 1);
                    }
                });
                this.selection = [];
            }
            return new Promise((resolve) => {
                setTimeout(() => {
                    fun();
                    resolve(true);
                }, 2000);
            });
        },
        async sureUpdate() {
            // TODO: 根据ID更新列表
        },
        sureFunction() {
            this.functionModel = false;
        },
        confirmFunction(selection) {
            let select = selection;
            console.log(select);
        },
        async getChilds() {
            const res = await getChildrenList();
            console.log(res);
            if (res && res.data) {
                this.datas = res.data.map(item => {
                    let newItem = {
                        id: item.ctId,
                        login: item.ctLoginName,
                        user: item.ctName,
                        created_at: item.ctCreateTime,
                        updated_at: item.ctLastLoginTime,
                        disabled: !item.ctIsEffective,
                        level: item.ctType
                    };
                    return newItem;
                });
            }
        }
    },
    created() {
        this.searchFun = _.debounce(this.debounceSearch, 1000);
    },
    async beforeMount() {
        await this.getChilds();
        this.copyDatas = _.cloneDeep(this.datas);
    },
    mounted() {
        this.tableHeight = window.innerHeight - this.$refs.table.$el.offsetTop - 250;
    }
}
</script>
<style lang="scss" scoped>
.index-vue-sub-accounts {
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