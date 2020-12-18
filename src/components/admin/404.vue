<template>
<div class="index-vue-body">
    <!--效果html开始-->
    <i class="iconfont iconicon-test" :class="type === 'unlogin'?'dark' : ''"></i>
    <h1 align="center">该页面不存在，请检查网址</h1>
    <!-- (´･ω･`) -->
</div>
</template>
<script>
export default {
    props: {
        type: String
    }
}
</script>
<style lang="scss" scoped>
@charset"utf-8";
.index-vue-body {
    .iconfont {
        font-size: 450px;
        color: #409eff;
        &.dark {
            color: #515a6e;
        }
    }
    h1 {
        font-size: 40px;
    }
}

</style>