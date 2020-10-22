<template>
    <div class="index-vue-func-expand">
        <div class="expand-row" v-for="(item, index) in row.roles" :key="index">
            <label>子功能{{index + 1}}</label>
            <CheckboxGroup class="group" :key="`rolegroup${index}`" v-model="item.action.role">
                <Checkbox :key="`role${index}1`" label="管理员" che></Checkbox>
                <Checkbox :key="`role${index}2`" label="角色1"></Checkbox>
                <Checkbox :key="`role${index}3`" label="角色2"></Checkbox>
                <Checkbox :key="`role${index}4`" label="角色3"></Checkbox>
                <Checkbox :key="`role${index}5`" label="角色4"></Checkbox>
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
            let openTag = false;
            this.row.roles.forEach(fun => {
                if (fun.action.role && fun.action.role.length) openTag = true;
            })
            this.row.isOpen = openTag;
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