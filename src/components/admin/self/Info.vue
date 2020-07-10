<template>
    <div class="index-vue-info">
        <div class="img-line">
            <!-- <div class="user-img-c">
                <Icon type="logo-android" />
            </div> -->
            <!-- <div class="button-wrap">
                <Button type="warning" @click="goToBuy">会员升级</Button>
                <Button type="info"  @click="goToBuy">会员续费</Button>
            </div> -->
        </div>
        <div class="content-wrap">
            <Table stripe v-if="!edit" width="502" :show-header="false" :disabled-hover="true" :columns="columns" :data="datas">
                <template slot-scope="{ row, index }" slot="content">
                    <div class="content-box">
                        <Tag :color="index === 1 ? 'green' : 'blue'">{{index === 1 ? level(row.content) : row.content}}</Tag>
                    </div>
                </template>
            </Table>
            <Table :key="'tableEdit'" v-else  width="502" :show-header="false" :disabled-hover="true" :columns="columns" :data="datas">
                <template slot-scope="{ row, index }" slot="content">
                    <div class="content-box">
                        <Tag v-if="index === 1" color="blue">{{level(row.content)}}</Tag>
                        <Tag v-if="index === 1" color="primary">修改</Tag>
                        <Input v-if="index !== 1" type="text" v-model="row.content" />
                    </div>
                </template>
            </Table>
            <div class="button-box">
                <Button class="button" type="default" v-if="edit" @click="editInfo">{{ '取消' }}</Button>
                <Button class="button" type="primary" @click="editInfo">{{ edit ? '确认修改' : '编辑信息' }}</Button>
                <Button class="button" type="primary" @click="pwdModel = true">{{ '修改密码' }}</Button>
            </div>
        </div>
        <Modal
            v-model="functionModel"
            :title="'功能分配'"
            :loading="true"
            :width="700"
            @on-ok="() => { this.functionModel = false }"
            @on-cancel="() => { this.functionModel = false }">
            <FunctionList :sales="true" @confirm="confirmFunction"></FunctionList>
        </Modal>
        <Modal
            v-model="pwdModel"
            :title="'修改密码'"
            :loading="true"
            @on-ok="okPwd(true)"
            @on-cancel="okPwd(false)">
            <Form ref="subForm" :model="subForm" :rules="subFormRules" class="subForm">
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
            </Form>
        </Modal>
    </div>
</template>
<script>
import { mapGetters } from 'vuex';
import FunctionList from '../../common/FunctionList';
export default {
    name: 'Info',
    components: {FunctionList},
    data() {
        const validatePassWord = (rule, value, callback) => {
            let reg = new RegExp(/^(?=.*[a-zA-Z]+)(?=.*[0-9]+)[a-zA-Z0-9]+$/);
            if (value === '') {
                callback(new Error('请输入密码'));
            } else if (!reg.test(value)) {
                callback(new Error('密码必须包含英文和数字'));
            } else if (this.subForm.comfirmPassword && value !== this.subForm.comfirmPassword) {
                callback(new Error('两次密码输入不一致请重新输入'));
            } else {
                callback();
            }
        };
        const validatePassCheck = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请二次输入确认密码'));
            } else if (this.subForm.stPassword && value !== this.subForm.stPassword) {
                callback(new Error('两次密码输入不一致请重新输入'));
            } else {
                callback();
            }
        };
        return {
            edit: false,
            functionModel: false,
            columns: [{
                    title: '类目',
                    key: 'title',
                    width: 100,
                    align: 'center'
                },
                {
                    title: '内容',
                    key: 'content',
                    align: 'left',
                    slot: 'content',
                    width: 400
                }],
            datas: [],
            pwdModel: false,
            seePwd: false,
            seeSubPwd: false,
            subForm: {
                stPassword: '',
                comfirmPassword: '',
            },
            subFormRules: {
                stPassword: [
                    { required: true, validator: validatePassWord, trigger: ['blur','change'] }
                ],
                comfirmPassword: { required: true, validator: validatePassCheck, trigger: ['blur','change'] }
            }
        }
    },
    computed: {
        ...mapGetters({
			adminInfo: 'getAdminInfo'
        })
    },
    methods: {
        goToBuy() {
            this.$router.push('buy');
        },
        editInfo() {
            this.edit = !this.edit;
            this.$forceUpdate();
        },
        confirmFunction(selection) {
            let select = selection;
            console.log(select);
        },
        okPwd(type) {
            let bol = true;
            //TODO: 异步接收校验
            if (type) {
                this.$refs['subForm'].validate((valid) => {
                    bol = valid;
                });
            }
            if (!bol) return;
            this.$refs.subForm.resetFields();
            this.pwdModel = false;
        }
    },
    beforeMount() {
        this.datas = [{
            title: '用户名',
            content: this.adminInfo.ctName,
            cellClassName: {
                // title: 'title-cell',
                // content: 'info-cell',
            }
        },{
            title: '会员权限',
            content: this.adminInfo.ctType,
            cellClassName: {
                // title: 'title-cell',
                // content: 'info-cell',
            }
        },{
            title: '邮箱地址',
            content: this.adminInfo.ctEmail,
            cellClassName: {
                // title: 'title-cell',
                // content: 'info-cell',
            }
        },{
            title: '电话号码',
            content: this.adminInfo.ctPhone,
            cellClassName: {
                // title: 'title-cell',
                // content: 'info-cell',
            }
        },
        // {
        //     title: '公司名称',
        //     content: this.adminInfo.company.name,
        //     cellClassName: {
        //         title: 'title-cell',
        //         content: 'info-cell',
        //     }
        // },{
        //     title: '公司地址',
        //     content: this.adminInfo.company.address,
        //     cellClassName: {
        //         title: 'title-cell',
        //         content: 'info-cell',
        //     }
        // }
        ];
    }
}
</script>
<style lang="scss" scoped>
.appear-enter-active, .appear-leave-active {
    transition: all .5s ease;
}
.appear-enter, .appear-leave-to /* .fade-leave-active below version 2.1.8 */ {
    transform: translateY(-10px);
    opacity: 0;
}
.index-vue-info {
    height: 100%;
    padding: 20px;
    & .img-line {
        position: relative;
        display: flex;
        align-items: center;
        & .user-img-c {
            width: 50px;
            height: 50px;
            background: gray;
            border-radius: 50%;
            overflow: hidden;
            display: flex;
            justify-content: center;
            margin-right: 10px;
            align-items: center;
            & i {
                font-size: 30px;
                color: #6af64a
            }
        }
        & button {
            margin-right: 10px;
        }
        margin-bottom: 20px;
    }
    & .content-wrap {
        & .button-box {
            padding: 20px 0;
            text-align: left;
            & .button {
                &:first-child {
                    margin-right: 10px;
                }
            }
        }
        ::v-deep .title-cell {
            // background-image: linear-gradient(to bottom right, #2d8cf0, #9ddafb);
            background-image: linear-gradient(to bottom right, #20222A, #515a6e);
            color: white;
            font-weight: bold;
        }
        ::v-deep .info-cell {
            overflow: hidden;
            display: flex;
            align-items: center;
            & .ivu-table-cell {
                width: 100%;
            }
        }
    }
}
</style>