<template>
    <div class="test">
        {{item}}
    </div>
</template>
<script>
export default {
    name: 'Test',
    data() {
        return {
            item: '这是我们的项目'
        }
    }
}
</script>
<style lang="scss" scoped>
.test {
    width: 100%;
    height: 100px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 36px;
}
</style>