<template>
    <div class="index-vue-home">
        <img alt="Vue logo" src="../../assets/logo.png">
        <h1>{{ 'Welcome To Admin !' }}</h1>
    </div>
</template>
<script>
export default {
    name: 'Home'
}
</script>
<style lang="scss" scoped>
.index-vue-home {
    height: 100%;
    flex-direction: column;
    display: flex;
    align-items: center;
    justify-content: center;
    & img {
        height: 300px;
    }
    & h1 {
        font-size: 68px;
    }
}
</style>