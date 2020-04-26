<template>
    <div class="index-vue-info">
        <ul>
            <li>用户名：管理员</li>
            <li>角色：管理页</li>
            <li>密码: **********</li>
            <li>是否会员: 是</li>
        </ul>
    </div>
</template>
<script>
export default {
    name: 'Info'
}
</script>
<style lang="scss" scoped>
.index-vue-info {
    font-size: 18px;
    height: 100%;
    flex-direction: column;
    display: flex;
    align-items: center;
    justify-content: center; 
}
</style>