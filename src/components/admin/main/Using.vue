<template>
    <div class="index-vue-seatusing">
        <div class="right-side">
            <div class="title-area">
                <Steps :current="step - 1" size="small" class="step-bar">
                    <Step :title="`选择会场模板`" content=""></Step>
                    <Step :title="`上传宾客名单`" content=""></Step>
                    <Step :title="`生成预览`" content=""></Step>
                    <!-- <Step :title="`第4步：确定座位编号`" content=""></Step> -->
                </Steps>
                <section  class="button-area-item">
                    <Button type="primary" v-if="[2,3].includes(step)" @click="changeStep('pre')">{{ '上一步' }}</Button>
                    <Button type="primary" v-if="step < 3" @click="changeStep('next')">{{ '下一步' }}</Button>
                    <Button type="primary" v-if="step === 3">{{ '确认生成' }}</Button>
                </section>
                <!-- <section  class="button-area-item" v-if="step === 4">
                </section> -->
            </div>
            <div class="show-area">
                <template v-if="step === 1">
                    <div class="button-area">
                        <Select style="width: 100px;" v-model="searchSelect">
                            <Option value="seatName" label="会场模板名"></Option>
                        </Select>
                        <Input style="width: 200px; margin: 0 10px" v-model="searchInput" placeholder="输入用户名搜索"  @input="searchFun" />
                        <span style="display: flex; align-items: center">
                            <span>{{'当前已选模板：'}}</span>
                            <Tag v-if="showSelected" color="blue">{{ selectedModule.moduleName }}</Tag>
                            <span v-else>无</span>
                        </span>
                    </div>
                    <Table ref="table" border stripe :max-height="tableHeight" :width="1100" :loading="false" :columns="columns" :data="datas"  @on-selection-change="onSelectChange">
                        <template slot-scope="{ row }" slot="select">
                            <Checkbox :disabled="row.disabled" v-model="row.chceked" @on-change="onSelectChange(row)"></Checkbox>
                        </template>
                        <template slot-scope="{ row }" slot="action">
                            <Button type="primary" size="small" @click="preViewImage(row)">{{ '预览' }}</Button>
                        </template>
                    </Table>
                </template>
                <template v-if="step === 2">
                    <div class="button-area">
                        <Upload action="//jsonplaceholder.typicode.com/posts/">
                            <Button icon="ios-cloud-upload-outline" type="primary">{{ hasFile ? '重新上传' : '上传文件' }}</Button>
                        </Upload>
                    </div>
                </template>
            </div>
            <Modal v-model="nModel" :title="'模板预览'">
                <div class="modal-form">
                    <img :src="'../../../assets/logo.png'" />
                </div>
            </Modal>
        </div>
        <!-- <Loading v-if="true"></Loading> -->
    </div>
</template>
<script>
export default {
    name: 'Using',
    data() {
        return {
            step: 1,
            loading: false,
            searchSelect: 'seatName',
            searchInput: '',
            selectedModule: {},
            searchFun: null,
            nModel: false,
            tableHeight: 0,
            columns: [
                {
                    title: '选择',
                    key: 'select',
                    width: 60,
                    align: 'center',
                    slot: 'select',
                },
                {
                    title: '会场模板名',
                    key: 'moduleName',
                    width: 200
                },
                {
                    title: '详情',
                    key: 'keyName',
                    // width: 200
                },
                {
                    title: '类型',
                    key: 'category',
                    width: 200
                },
                {
                    title: '容纳人数',
                    key: 'number',
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
                    moduleName: 'xx婚宴',
                    keyName: 'xxxx婚宴专用.....',
                    category: '婚宴型',
                    number: 100,
                    chceked: false,
                    disabled: false
                },{
                    moduleName: 'xx会议',
                    keyName: '会堂会议专用.......',
                    category: '会议型',
                    number: 200,
                    chceked: false,
                    disabled: false
                },{
                    moduleName: 'xx酒席1',
                    keyName: 'xxxx酒席专用.....',
                    category: '婚宴型',
                    number: 100,
                    chceked: false,
                    disabled: false
                },{
                    moduleName: 'xx酒席2',
                    keyName: 'xxxx酒席专用.....',
                    category: '婚宴型',
                    number: 100,
                    chceked: false,
                    disabled: false
                },{
                    moduleName: 'xx酒席3',
                    keyName: 'xxxx酒席专用.....',
                    category: '婚宴型',
                    number: 100,
                    chceked: false,
                    disabled: false
                },{
                    moduleName: 'xx酒席4',
                    keyName: 'xxxx酒席专用.....',
                    category: '婚宴型',
                    number: 100,
                    chceked: false,
                    disabled: false
                },{
                    moduleName: 'xx酒席5',
                    keyName: 'xxxx酒席专用.....',
                    category: '婚宴型',
                    number: 100,
                    chceked: false,
                    disabled: false
                },{
                    moduleName: 'xx酒席6',
                    keyName: 'xxxx酒席专用.....',
                    category: '婚宴型',
                    number: 100,
                    chceked: false,
                    disabled: false
                },{
                    moduleName: 'xx酒席7',
                    keyName: 'xxxx酒席专用.....',
                    category: '婚宴型',
                    number: 100,
                    chceked: false,
                    disabled: false
                },{
                    moduleName: 'xx酒席8',
                    keyName: 'xxxx酒席专用.....',
                    category: '婚宴型',
                    number: 100,
                    chceked: false,
                    disabled: false
                },{
                    moduleName: 'xx酒席9',
                    keyName: 'xxxx酒席专用.....',
                    category: '婚宴型',
                    number: 100,
                    chceked: false,
                    disabled: false
                },{
                    moduleName: 'xx酒席10',
                    keyName: 'xxxx酒席专用.....',
                    category: '婚宴型',
                    number: 100,
                    chceked: false,
                    disabled: false
                }
            ],
            file: {}
        }
    },
    computed: {
        showSelected() {
            return !_.isEmpty(this.selectedModule);
        },
        hasFile() {
            return !_.isEmpty(this.file);
        }
    },
    methods: {
        debounceSearch() {
            if (this.searchInput) {
                let reg = new RegExp(this.searchInput, "i");
                this.datas = this.copyDatas.filter(val => {
                    return reg.test(val.moduleName);
                });
            } else {
                this.datas = _.cloneDeep(this.copyDatas);
            }
            if (!_.isEmpty(this.selectedModule)) {
                this.onSelectChange(this.selectedModule);
            }
        },
        onSelectChange(selection) {
            let bol = selection.moduleName === this.selectedModule.moduleName;
            this.selectedModule = !bol ? _.cloneDeep(selection) : {};
            console.log(this.selectedModule);
            if (!_.isEmpty(this.selectedModule)) {
                this.datas.forEach(item => {
                    if (item.moduleName !== this.selectedModule.moduleName) {
                        item.disabled = true;
                    } else {
                        item.chceked = true;
                    }
                });
            } else {
                this.datas.forEach(item => {
                    item.chceked = false;
                    item.disabled = false;
                });
            }
            this.$forceUpdate();
        },
        changeStep(type) {
            if (this.step === 1) {
                if (!this.showSelected) return this.$Message.warning({content: '请先选择一个模板', closable: true});
            }
            this.step = type === 'next' ? this.step + 1 : this.step - 1;
        },
        preViewImage(row) {
            this.nModel = true;
        }
    },
    created() {
        this.searchFun = _.debounce(this.debounceSearch, 1000);
    },
    mounted() {
        this.tableHeight = window.innerHeight - this.$refs.table.$el.offsetTop - 80;
    },
    beforeMount() {
        // for(let i = 0; i < 200; i++) {
        //     this.datas.push({
        //             moduleName: 'xx婚宴',
        //             keyName: 'xxxx婚宴专用.....',
        //             category: '婚宴型',
        //             number: 100,
        //             chceked: false,
        //             disabled: false
        //         })
        // }
        this.copyDatas = _.cloneDeep(this.datas);
    }
}
</script>
<style lang="scss" scoped>
.index-vue-seatusing {
    min-width: 1000px;
    height: 100%;
    display: flex;
    & .right-side {
        flex: 1;
        padding: 20px;
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
        & .title-area {
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            padding: 10px 0;
            border-bottom: 2px solid #e8eaec;
            & .step-bar {
                width: 60%;
                text-align: left;
                // height: 40px;
            }
            @media screen and (max-width: 1350px) {
               & .step-bar {
                    width: 730px;
                    // text-align: left;
                }
            }
            & .button-area {
                // padding: 0 50px;
                // & p {
                //     font-weight: bold;
                //     font-size: 14px;
                //     color: black;
                //     margin-top: 10px;
                // }
                &-item {
                    display: flex;
                    // flex-direction: column;
                    // margin-top: 20px;
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
            // border: 1px solid lightgray;
            // border-radius: 10px;
            // // box-shadow: 1px 1px 5px gray;
            // background: white;
            // display: flex;
            // align-items: center;
            // justify-content: center;
            flex: 1;
            width: 100%;
            overflow-x: auto;
            overflow-y: auto;
            // padding: 10px;
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
            &.
        }
    }
}
.modal-form {
        display: flex;
        padding: 50px 0;
        overflow: auto;
        & img {
            margin: 0 auto;
            // border-radius: 10px;
            // border: gray 1px solid;
            // padding: 10px;
            // height: 100%;
            // width: 100%;
        }
    }
</style>