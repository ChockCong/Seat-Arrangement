<template>
    <div class="index-vue-sub-accounts">
        <div class="button-area">
            <Button type="primary" icon="md-add" @click="alertModal('add')">新增子账户</Button>
            <Button type="primary" icon="md-trash" @click="deletes">删除子账户</Button>
        </div>
        <Table ref="table" border stripe :max-height="tableHeight" :width="862" :loading="false" :columns="columns" :data="datas"  @on-selection-change="onSelectChange">
            <template slot-scope="{ row, index }" slot="level">
                <Tag color="green">{{level(row.level)}}</Tag>
            </template>
            <template slot-scope="{ row, index }" slot="action">
                <Button type="primary" size="small" @click="alertModal('edit')">修改用户信息</Button>
            </template>
        </Table>
        <Modal
            v-model="modal"
            :title="modalType === 'add' ? '添加子账号' : '编辑用户信息'"
            :loading="modalLoading"
            @on-ok="asyncOK"
            @on-cancel="() => { this.modalType = ''; this.modal = false }">
        </Modal>
    </div>
</template>
<script>
import { confirmModal } from '../../../utils/index'
export default {
    name: 'SubAccounts',
    data () {
        return {
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
                    title: '子用户',
                    key: 'user',
                    width: 200
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
                    title: '权限',
                    key: 'level',
                    slot: 'level',
                    align: 'center',
                    width: 150
                },
                {
                    title: '操作',
                    key: 'action',
                    slot: 'action',
                    align: 'center',
                    width: 150
                }
            ],
            datas: [
                {
                    user: '子用户1',
                    created_at: '2016-10-01 00:00:00',
                    updated_at: '2016-10-01 00:00:00',
                    level: 3
                },{
                    user: '子用户2',
                    created_at: '2016-10-02 00:00:00',
                    updated_at: '2016-10-02 00:00:00',
                    level: 2
                }
            ],
            selection: []
        }
    },
    methods: {
        onSelect(selection) {
            console.log(selection)
        },
        onSelectAll(selection) {
            console.log(selection)
        },
        onSelectChange(selection) {
            console.log(selection);
            this.selection = _.cloneDeep(selection);
        },
        alertModal(type) {
            this.modalType = type;
            this.modal = true;
        },
        deletes() {
            if (!this.selection.length) {
                return this.$Message.warning({content: '请先选择子账号', closable: true});
            }
            let str = '';
            this.selection.forEach(val => {
                str += `<p>${val.user}</p>`;
            })
            confirmModal('confirm', '提示', `<p>是否确认删除这些账号？</p><br />${str}`, this.sureDelete);
        },
        asyncOK() {
            const fun = () => {
                let newItem = {
                    user: '子用户3',
                    created_at: '2016-10-03 00:00:00',
                    updated_at: '2016-10-03 00:00:00',
                    level: 1
                }
                this.datas.push(newItem);
            }
            this.selection = [];
            setTimeout(() => {
                if (this.modalType === 'add') fun();
                this.modal = false;
            }, 2000);
        },
        async sureDelete() {
            const fun = () => {
                let selected = this.selection.map(val => {
                    return val.user;
                });
                console.log(selected);
                let copyDatas = _.cloneDeep(this.datas);
                copyDatas.forEach(item => {
                    if (selected.includes(item.user) !== -1) {
                        this.datas.splice(this.datas.findIndex(v => { return item.user === v.user; }), 1);
                    }
                });
                this.selection = [];
            }
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    fun();
                    resolve(true);
                }, 2000);
            });
        }
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
        text-align: left;
        margin-bottom: 20px;
    }
}
</style>