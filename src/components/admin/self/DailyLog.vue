<template>
    <div class="index-vue-logs">
        <Table ref="table" border stripe highlight-row :max-height="tableHeight" :loading="false" :columns="columns1" :data="data2"></Table>
    </div>
</template>
<script>
    export default {
        name: 'DailyLog',
        data () {
            return {
                tableHeight: 0,
                columns1: [
                    {
                        title: '用户',
                        key: 'user',
                        width: 100
                    },
                    {
                        title: '操作时间',
                        key: 'date',
                        width: 200,
                        sortable: true
                    },
                    {
                        title: '操作',
                        key: 'operate',
                        width: 200
                    },
                    {
                        title: '请求',
                        key: 'request',
                        width: 100
                    },
                    {
                        title: '异常信息',
                        key: 'error',
                        tooltip: true
                    }
                ],
                data2: [
                    {
                        user: 'HHAdmin',
                        date: '2016-10-01 00:00:00',
                        operate: '创建子用户',
                        request: 'POST',
                        error: '[HMR] Waiting for update signal from WDS...'
                    },{
                        user: 'HHAdmin',
                        date: '2016-10-03',
                        operate: '创建子用户',
                        request: 'POST',
                        error: '[HMR] Waiting for update signal from WDS...'
                    },{
                        user: 'HHAdmin',
                        date: '2016-10-03',
                        operate: '创建子用户',
                        request: 'POST',
                        error: '[HMR] Waiting for update signal from WDS...'
                    },{
                        user: 'HHAdmin',
                        date: '2016-10-03',
                        operate: '创建子用户',
                        request: 'POST',
                        error: '[HMR] Waiting for update signal from WDS...'
                    },{
                        user: 'HHAdmin',
                        date: '2016-10-03',
                        operate: '创建子用户',
                        request: 'POST',
                        error: '[HMR] Waiting for update signal from WDS...'
                    },{
                        user: 'HHAdmin',
                        date: '2016-10-03',
                        operate: '创建子用户',
                        request: 'POST',
                        error: '[HMR] Waiting for update signal from WDS...'
                    },{
                        user: 'HHAdmin',
                        date: '2016-10-03',
                        operate: '创建子用户',
                        request: 'POST',
                        error: '[HMR] Waiting for update signal from WDS...'
                    },{
                        user: 'HHAdmin',
                        date: '2016-10-03',
                        operate: '创建子用户',
                        request: 'POST',
                        error: '[HMR] Waiting for update signal from WDS...'
                    },{
                        user: 'HHAdmin',
                        date: '2016-10-03',
                        operate: '创建子用户',
                        request: 'POST',
                        error: '[HMR] Waiting for update signal from WDS...'
                    },{
                        user: 'HHAdmin',
                        date: '2016-10-03',
                        operate: '创建子用户',
                        request: 'POST',
                        error: '[HMR] Waiting for update signal from WDS...'
                    },{
                        user: 'HHAdmin',
                        date: '2016-10-03',
                        operate: '创建子用户',
                        request: 'POST',
                        error: '[HMR] Waiting for update signal from WDS...'
                    },{
                        user: 'HHAdmin',
                        date: '2016-10-03',
                        operate: '创建子用户',
                        request: 'POST',
                        error: '[HMR] Waiting for update signal from WDS...'
                    },{
                        user: 'HHAdmin',
                        date: '2016-10-03',
                        operate: '创建子用户',
                        request: 'POST',
                        error: '[HMR] Waiting for update signal from WDS...'
                    },{
                        user: 'HHAdmin',
                        date: '2016-10-03',
                        operate: '创建子用户',
                        request: 'POST',
                        error: '[HMR] Waiting for update signal from WDS...'
                    },{
                        user: 'HHAdmin',
                        date: '2016-10-03',
                        operate: '创建子用户',
                        request: 'POST',
                        error: '[HMR] Waiting for update signal from WDS...'
                    },{
                        user: 'HHAdmin',
                        date: '2016-10-03',
                        operate: '创建子用户',
                        request: 'POST',
                        error: '[HMR] Waiting for update signal from WDS...'
                    },{
                        user: 'HHAdmin',
                        date: '2016-10-03',
                        operate: '创建子用户',
                        request: 'POST',
                        error: '[HMR] Waiting for update signal from WDS...'
                    },{
                        user: 'HHAdmin',
                        date: '2016-10-03',
                        operate: '创建子用户',
                        request: 'POST',
                        error: '[HMR] Waiting for update signal from WDS...'
                    },{
                        user: 'HHAdmin',
                        date: '2016-10-03',
                        operate: '创建子用户',
                        request: 'POST',
                        error: '[HMR] Waiting for update signal from WDS...'
                    },{
                        user: 'HHAdmin',
                        date: '2016-10-03',
                        operate: '创建子用户',
                        request: 'POST',
                        error: '[HMR] Waiting for update signal from WDS...'
                    },{
                        user: 'HHAdmin',
                        date: '2016-10-03',
                        operate: '创建子用户',
                        request: 'POST',
                        error: '[HMR] Waiting for update signal from WDS...'
                    },{
                        user: 'HHAdmin',
                        date: '2016-10-03',
                        operate: '创建子用户',
                        request: 'POST',
                        error: '[HMR] Waiting for update signal from WDS...'
                    },{
                        user: 'HHAdmin',
                        date: '2016-10-03',
                        operate: '创建子用户',
                        request: 'POST',
                        error: '[HMR] Waiting for update signal from WDS...'
                    },{
                        user: 'HHAdmin',
                        date: '2016-10-03',
                        operate: '创建子用户',
                        request: 'POST',
                        error: '[HMR] Waiting for update signal from WDS...'
                    },{
                        user: 'HHAdmin',
                        date: '2016-10-03',
                        operate: '创建子用户',
                        request: 'POST',
                        error: '[HMR] Waiting for update signal from WDS...'
                    },{
                        user: 'HHAdmin',
                        date: '2016-10-03',
                        operate: '创建子用户',
                        request: 'POST',
                        error: '[HMR] Waiting for update signal from WDS...'
                    },{
                        user: 'HHAdmin',
                        date: '2016-10-03',
                        operate: '创建子用户',
                        request: 'POST',
                        error: '[HMR] Waiting for update signal from WDS...'
                    },{
                        user: 'HHAdmin',
                        date: '2016-10-03',
                        operate: '创建子用户',
                        request: 'POST',
                        error: '[HMR] Waiting for update signal from WDS...'
                    },
                    {
                        user: 'HHAdmin',
                        date: '2020-06-09',
                        operate: '创建子用户',
                        request: 'POST',
                        error: '[HMR] Waiting for update signal from WDS...'
                    }
                ]
            }
        },
        mounted() {
            this.tableHeight = window.innerHeight - this.$refs.table.$el.offsetTop - 120;
        }
    }
</script>
<style lang="scss" scoped>
.index-vue-logs {
    position: relative;
    padding: 20px;
    height: 100%;
    // ::v-deep .ivu-table-wrapper {
    //     height: 100%;
    // }
}
</style>
