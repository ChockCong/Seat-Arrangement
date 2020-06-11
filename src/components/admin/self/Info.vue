<template>
    <div class="index-vue-info">
        <div class="img-line">
            <!-- <div class="user-img-c">
                <Icon type="logo-android" />
            </div> -->
            <div class="button-wrap">
                <Button type="warning" @click="functionModel = true">会员升级</Button>
                <Button type="info"  @click="functionModel = true">会员续费</Button>
            </div>
        </div>
        <div class="content-wrap">
            <Table v-if="!edit" width="502" :show-header="false" :disabled-hover="true" :columns="columns" :data="datas">
                <template slot-scope="{ row, index }" slot="content">
                    <div class="content-box">
                        <Tag color="blue">{{index === 1 ? level(row.content) : row.content}}</Tag>
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
                <Button type="primary" @click="editInfo">{{ edit ? '保存信息' : '编辑信息' }}</Button>
            </div>
        </div>
        <Modal
            v-model="functionModel"
            :title="'功能分配'"
            :loading="true"
            :width="700"
            @on-ok="() => { this.functionModel = true }"
            @on-cancel="() => { this.functionModel = false }">
            <FunctionList :sales="true" @confirm="confirmFunction"></FunctionList>
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
            datas: []
        }
    },
    computed: {
        ...mapGetters({
			adminInfo: 'getAdminInfo'
        })
    },
    methods: {
        editInfo() {
            this.edit = !this.edit;
            this.$forceUpdate();
        },
        confirmFunction(selection) {
            let select = selection;
            console.log(select);
        }
    },
    beforeMount() {
        this.datas = [{
            title: '用户名',
            content: this.adminInfo.username,
            cellClassName: {
                title: 'title-cell',
                content: 'info-cell',
            }
        },{
            title: '会员权限',
            content: this.adminInfo.level,
            cellClassName: {
                title: 'title-cell',
                content: 'info-cell',
            }
        },{
            title: '邮箱地址',
            content: this.adminInfo.email,
            cellClassName: {
                title: 'title-cell',
                content: 'info-cell',
            }
        },{
            title: '电话号码',
            content: this.adminInfo.phoneNo,
            cellClassName: {
                title: 'title-cell',
                content: 'info-cell',
            }
        },{
            title: '公司名称',
            content: this.adminInfo.company.name,
            cellClassName: {
                title: 'title-cell',
                content: 'info-cell',
            }
        },{
            title: '公司地址',
            content: this.adminInfo.company.address,
            cellClassName: {
                title: 'title-cell',
                content: 'info-cell',
            }
        }];
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