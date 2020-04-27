<template>
    <div class="alert-cotainer">
        <Alert :type="data.type" show-icon closable @on-close="onclose">
            {{data.title}}
            <template v-if="data.desc" slot="desc">
                {{data.desc}}
            </template>
        </Alert>
    </div>
</template>
<script>
export default {
    name: 'AlertPopup',
    props: {
        data: {
            type: Object,
            default: function () {
                return {
                    type: '',
                    title: '',
                    desc: ''
                }
            }
        }
    },
    methods: {
        onclose() {
            this.$emit('onClose');
        }
    }
}
</script>
<style lang="scss" scoped>
.alert-cotainer {
    position: absolute;
}
</style>
