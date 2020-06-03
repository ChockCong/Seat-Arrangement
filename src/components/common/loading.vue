<template>
    <Spin fix>
        <Icon type="ios-loading" size=18 class="demo-spin-icon-load"></Icon>
        <div>加载中</div>
    </Spin>
</template>
<script>
export default {
    name: 'Loading'
}
</script>
<style lang="scss" scoped>
.demo-spin-icon-load{
    animation: ani-demo-spin 1s linear infinite;
}
</style>