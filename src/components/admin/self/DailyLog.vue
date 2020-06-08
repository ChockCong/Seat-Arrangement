<template>
    <div class="index-vue-logs">
        <Table height="700" :columns="columns1" :data="data2"></Table>
    </div>
</template>
<script>
    export default {
        name: 'DailyLog',
        data () {
            return {
                columns1: [
                    {
                        title: '日期时间',
                        key: 'date',
                        width: 200
                    },
                    {
                        title: '事件',
                        key: 'element'
                    }
                ],
                data2: [
                    {
                        date: '2016-10-03',
                        element: '[HMR] Waiting for update signal from WDS...'
                    },{
                        date: '2016-10-03',
                        element: '[HMR] Waiting for update signal from WDS...'
                    },{
                        date: '2016-10-03',
                        element: '[HMR] Waiting for update signal from WDS...'
                    },{
                        date: '2016-10-03',
                        element: '[HMR] Waiting for update signal from WDS...'
                    },{
                        date: '2016-10-03',
                        element: '[HMR] Waiting for update signal from WDS...'
                    },{
                        date: '2016-10-03',
                        element: '[HMR] Waiting for update signal from WDS...'
                    },{
                        date: '2016-10-03',
                        element: '[HMR] Waiting for update signal from WDS...'
                    },{
                        date: '2016-10-03',
                        element: '[HMR] Waiting for update signal from WDS...'
                    },{
                        date: '2016-10-03',
                        element: '[HMR] Waiting for update signal from WDS...'
                    },{
                        date: '2016-10-03',
                        element: '[HMR] Waiting for update signal from WDS...'
                    },{
                        date: '2016-10-03',
                        element: '[HMR] Waiting for update signal from WDS...'
                    },{
                        date: '2016-10-03',
                        element: '[HMR] Waiting for update signal from WDS...'
                    },{
                        date: '2016-10-03',
                        element: '[HMR] Waiting for update signal from WDS...'
                    },{
                        date: '2016-10-03',
                        element: '[HMR] Waiting for update signal from WDS...'
                    },{
                        date: '2016-10-03',
                        element: '[HMR] Waiting for update signal from WDS...'
                    },{
                        date: '2016-10-03',
                        element: '[HMR] Waiting for update signal from WDS...'
                    },{
                        date: '2016-10-03',
                        element: '[HMR] Waiting for update signal from WDS...'
                    },{
                        date: '2016-10-03',
                        element: '[HMR] Waiting for update signal from WDS...'
                    },{
                        date: '2016-10-03',
                        element: '[HMR] Waiting for update signal from WDS...'
                    },{
                        date: '2016-10-03',
                        element: '[HMR] Waiting for update signal from WDS...'
                    },{
                        date: '2016-10-03',
                        element: '[HMR] Waiting for update signal from WDS...'
                    },{
                        date: '2016-10-03',
                        element: '[HMR] Waiting for update signal from WDS...'
                    },{
                        date: '2016-10-03',
                        element: '[HMR] Waiting for update signal from WDS...'
                    },{
                        date: '2016-10-03',
                        element: '[HMR] Waiting for update signal from WDS...'
                    },{
                        date: '2016-10-03',
                        element: '[HMR] Waiting for update signal from WDS...'
                    },
                ]
            }
        }
    }
</script>
<style lang="scss" scoped>
.index-vue-logs {
    padding: 20px;
    height: 100%;
}
</style>
