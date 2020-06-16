<template>
    <div class="index-vue-forget-main">
        <Form ref="forgetF" :model="forgetForm" :rules="ruleValidate" class="forgetForm">
            <FormItem prop="account">
                <Input size="large" type="text" prefix="ios-contact" v-model.trim="forgetForm.account" :placeholder="'用户名'" clearable/>
            </FormItem>
            <Row>
                <ICol span="6" style="margin-right: 40px">
                    <FormItem>
                        <Select size="large" v-model="forgetForm.type">
                            <Option :value="1" :label="'手机号码'"></Option>
                            <Option :value="2" :label="'电子邮箱'"></Option>
                        </Select>
                    </FormItem>
                </ICol>
                <ICol span="16">
                    <FormItem prop="value">
                        <Input size="large" type="text" v-model.trim="forgetForm.value" :prefix="inputIcon" :placeholder="inputPlaceholder" />
                    </FormItem>
                </ICol>
            </Row>
            <Button size="large" class="submit" type="primary" @click="send">{{ inputButton }}</Button>
        </Form>
    </div>
</template>
<script>
export default {
    name: 'ForgetPawssword',
    data() {
        return {
            validatePhoneCheck: (rule, value, callback) => {
                let reg = new RegExp(/\d$/);
                if (value === '') {
                    callback(new Error('请输入手机号码'));
                } else if (!reg.test(value)) {
                    callback(new Error('请输入正确的手机号码'));
                } else if (value.length < 11) {
                    callback(new Error('请输入至少11位手机号码'));
                } else {
                    callback();
                }
            },
            ruleValidate: {
                account: [
                    { required: true, message: '请输入登录名', trigger: ['blur','change'] }
                ],
                value: [
                    { required: true, validator: this.validatePhoneCheck, trigger: ['blur','change'] }
                ]
            },
            forgetForm: {
                account: '',
                type: 1,
                value: ''
            },
            inputPlaceholder: '输入手机号码',
            inputIcon: 'md-call',
            inputButton: '发送短信',
        }
    },
    watch: {
        'forgetForm.type'(value) {
            this.forgetForm.value = '';
            this.ruleValidate.value = value === 1 ? 
            [
                { required: true, validator: this.validatePhoneCheck, trigger: ['blur','change'] }
            ] : [
                { required: true, message: '请输入电子邮箱', trigger: ['blur','change'] },
                { type: 'email', message: '请输入正确的电子邮箱', trigger: ['blur','change'] }
            ]
            this.inputIcon = value === 1 ? 'md-call' : 'md-mail';
            this.inputPlaceholder = value === 1 ? '手机号码' : '电子邮箱';
            this.inputButton = value === 1 ? '发送验证短信' : '发送验证邮件'
            this.$refs['forgetF'].resetFields();
        }
    },
    methods: {
        send() {
            this.$refs['forgetF'].validate((valid) => {
                if (valid && this.forgetForm.account && this.forgetForm.value) this.$Message.success('发送成功');
                else {
                    this.$Message.error('请填写登录名和选择找回方式');
                }
            });
        }
    },
    created() {
        this.ruleValidate.value = [
            { required: true, validator: this.validatePhoneCheck, trigger: ['blur','change'] }
        ]
    }
}
</script>
<style lang="scss" scoped>
.index-vue-forget-main {
    width: 80%;
    margin: 0 auto;
    height: 100%;
    background: #f3f7fd;
    display: flex;
    align-items: center;
    justify-content: center;
    ::v-deep .forgetForm {
        width: 500px;
    }
}
</style>