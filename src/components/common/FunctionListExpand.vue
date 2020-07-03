<template>
    <div class="index-vue-func-expand">
        <div class="expand-row" v-for="(item, index) in row.roles" :key="index">
            <label>子功能{{index + 1}}</label>
            <CheckboxGroup class="group" v-model="item.role">
                <Checkbox label="管理员"></Checkbox>
                <Checkbox label="角色1"></Checkbox>
                <Checkbox label="角色2"></Checkbox>
                <Checkbox label="角色3"></Checkbox>
                <Checkbox label="角色4"></Checkbox>
            </CheckboxGroup>
        </div>
        <Button class="btn" type="primary" size="small" @click="updateRole">{{'确定'}}</Button>
    </div>
</template>
<script>
export default {
    name: 'FunctionExpand',
    data() {
        return {
            row: []
        }
    },
    props: {
        functionItem: Object
    },
    methods: {
        updateRole() {
            this.$emit('updateRole', this.row, 'roles');
        }
    },
    beforeMount() {
        this.row = _.cloneDeep(this.functionItem);
        this.row._expanded = true;
        this.$emit('updateRole', this.row, '_expanded');
    },
    beforeDestroy() {
        this.row._expanded = false;
        this.$emit('updateRole', this.row, '_expanded');
    }
}
</script>
<style lang="scss" scoped>
.index-vue-func-expand {
    // text-align: right;
    & .expand-row {
        display: flex;
        align-items: center;
        & label {
            width: 80px;
            padding: 10px 0;
        }
        ::v-deep .group {
            width: 100%;
            display: flex;
            justify-content: space-around;
        }
    }
}
</style>