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
                        <Tag v-if="[0,1].includes(index)" :color="index === 1 ? 'orange' : 'blue'">{{index === 1 ? level(row.content) : row.content}}</Tag>
                        <b v-else>隐藏信息</b>
                    </div>
                </template>
            </Table>
            <Table :key="'tableEdit'" v-else  width="502" :show-header="false" :disabled-hover="true" :columns="columns" :data="datas">
                <template slot-scope="{ row, index }" slot="content">
                    <div class="content-box">
                        <Tag v-if="index === 1" color="orange" size="large">{{level(row.content)}}</Tag>
                        <Button v-if="index === 1" type="primary" @click="changeRule">修改</Button>
                        <Input v-if="index === 0" type="text" v-model="row.content" :placeholder="'输入昵称'" />
                        <Button v-if="index === 0" type="primary" :loading="row.loading" style="margin-left: 10px" @click="datasApi(row)">{{ '修改' }}</Button>
                        <div class="flex-box" v-if="[2,3].includes(index)">
                            <section>
                                <Input type="text" v-model="row.content" :disabled="index === 3 || !row.code.trim()" :placeholder="index === 2 ? '输入邮箱' : '输入手机号'" />
                                <Button type="primary" style="margin-left: 10px" @click="datasApi(row)" :disabled="!row.code.trim()">{{ index === 2 ? '修改邮箱' : '修改手机' }}</Button>
                            </section>
                            <section>
                                <Input type="text" v-model="row.code" :disabled="index === 3" :placeholder="index === 2 ? '输入邮箱验证码' : '输入手机验证码'" />
                                <Button type="primary" style="margin-left: 10px" @click="send(index, row.content)">{{ '发送验证码' }}</Button>
                            </section>
                        </div>
                    </div>
                </template>
            </Table>
            <div class="button-box">
                <Button class="button" :type="!edit ? 'primary': 'default'" @click="edit = !edit">{{ !edit ? '编辑信息' : '取消' }}</Button>
                <Button class="button" type="warning" @click="pwdModel = true">{{ '修改密码' }}</Button>
            </div>
        </div>
        <!-- <Modal
            v-model="functionModel"
            :title="'功能分配'"
            :loading="true"
            :width="700"
            @on-ok="() => { this.functionModel = false }"
            @on-cancel="() => { this.functionModel = false }">
            <FunctionList :sales="true" @confirm="confirmFunction"></FunctionList>
        </Modal> -->
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
// import FunctionList from '../../common/FunctionList';
import { getUserInfo, updateUserInfo, updatePhone, sendEmail, updateEmail } from '@/api/api';
export default {
    name: 'Info',
    // components: {FunctionList},
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
            originDatas: [],
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
            },
        }
    },
    computed: {
        ...mapGetters({
			adminInfo: 'getAdminInfo'
        }),
        isSave() {
            let tag = true;
            this.datas.forEach(item => {
                if (!item.content && !['邮箱地址','电话号码'].includes(item.title)) tag = false;
            });
            return tag && !_.isEqual(this.datas, this.originDatas);
        }
    },
    methods: {
        goToBuy() {
            this.$router.push('buy');
        },
        changeRule() {
            return this.$Message.info('暂时不能修改权限，如需修改请联系管理员');
        },
        async send(index, data) {
            if (index === 3) return this.$Message.info('暂时不能修改手机，如需修改请联系管理员');
             this.$Message.loading({
                content: '正在发送验证码，请稍后...',
                duration: 3
            });
            const res = await sendEmail();
            if (res) {
                return this.$Message.success('发送验证码成功，请前往邮箱查看');
            }
        },
        datasChange(e, title) {
            console.log(e, title)
            let data = this.datas.find(item => {
                return item.title === title;
            })
            if (data) {
                data.content = e.content;
                data.code = e.code
            }
            if (title === '昵称') {
                this.$store.commit('SET_ADMIN_NAME', {name: e.content});
            }
        },
        async datasApi(row) {
            if (row.title === '昵称') {
                if (!row.content || !row.content.trim()) return this.$Message.warning('昵称不能为空')
                this.datas[0].loading = true;
                const res = await updateUserInfo({
                    ctId: String(this.adminInfo.ctId),
                    ctName: row.content
                });
                if (res) {
                    setTimeout(() => {
                        this.datas[0].loading = false;
                        this.datasChange(row, row.title);
                        return this.$Message.success('修改成功');
                    }, 1000);
                }
            } else if (row.title === '邮箱地址') {
                if (!row.content || !row.content.trim()) return this.$Message.warning('邮箱地址不能为空')
            } else {
                if (!row.content || !row.content.trim()) return this.$Message.warning('电话号码不能为空')
            }
        },
        async allRequest() {
            let reqs = [];
            reqs[0] = await updateUserInfo({
                ctId: String(this.adminInfo.ctId),
                ctName: this.datas[0].content
            });
            reqs[1] = await updateEmail({
                ctId: String(this.adminInfo.ctId),
                tag: true,
                ctPhone: this.datas[2].content

            });
            reqs[2] = await updatePhone({
                ctId: String(this.adminInfo.ctId),
                tag: true,
                ctEmail: this.datas[3].content
            });
            let responses = new Promise();
            responses(resolve => {
                Promise.all(reqs).then(result => {
                    console.log(result);
                    resolve(true);
                }).catch(error => {
                    console.log(error);
                    resolve(false);
                });
            })
        },
        async editInfo() {
            if (this.edit && this.isSave) {
                const res = await this.allRequest();
                console.log(res);
                if (res && res.data) {
                    this.$Message.success('修改成功');
                    this.edit = !this.edit;
                } else {
                    // this.$Message.error('修改失败，请重试');
                }
            } else {
                this.edit = !this.edit;
            }
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
    async beforeMount() {
        this.datas = [{
            title: '昵称',
            content: this.adminInfo.ctName,
            loading: false
            // cellClassName: {
                // title: 'title-cell',
                // content: 'info-cell',
            // }
        },{
            title: '会员权限',
            content: this.adminInfo.ctType,
            loading: false
        },{
            title: '邮箱地址',
            content: this.adminInfo.ctEmail,
            code: '',
            loading: false
        },{
            title: '电话号码',
            content: this.adminInfo.ctPhone,
            code: '',
            loading: false
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
        const res = await getUserInfo({ ctId: this.adminInfo.ctId });
        this.originDatas = _.cloneDeep(this.datas);
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
    padding: 10px;
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
                margin-right: 10px;
                &:last-child {
                    margin-right: 0;
                }
            }
        }
        & .content-box {
            display: flex;
            align-items: center;
            & .flex-box {
                display: flex;
                flex-direction: column;
                width: 100%;
                margin: 5px 0;
                & section {
                    display: flex;
                    &:first-child {
                        margin-bottom: 5px;
                    }
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