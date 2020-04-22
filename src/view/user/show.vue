<template>
    <div class="user-index">
        <div class="welcome-wrap">
            <img src="../../assets/logo.png" />
            <h1>欢迎光临XX联婚晚宴</h1>
        </div>
        <div class="search-wrap">
            <Input v-model.trim="value" placeholder="输入搜索全名/首字母缩写/模糊搜索" />
            <Button type="primary">搜索</Button>
        </div>
        <div class="ad-wrap">互动板块</div>
    </div>
</template>
<script>
export default {
    name: 'show',
    data () {
        return {
            value: ''
        }
    }
}
</script>
<style lang="scss" scoped>
.user-index {
    height: 100vh;
    display: flex;
    flex-direction: column;
    padding: 10px;
    & .welcome-wrap {
        height: 30vh;
        & img {
            height: 100%;
        }
    }
    & .search-wrap {
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        font-size: 28px;
        & button {
            width: 80%;
            font-size: 28px;
            margin-top: 40px;
        }
        ::v-deep .ivu-input {
            width: 80%;
            font-size: 0.8rem;
        }
    }
    & .ad-wrap {
        height: 20vh;
        border-top: #cccccc 1px solid
    }
}
</style>