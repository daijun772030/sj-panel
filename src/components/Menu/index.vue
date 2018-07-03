<template>
    <div class="menu">
        
    </div>
</template>
<script>
    export default {
        name: 'menu',
        data() {
            list: [
                { id: 1, name: 'index' }
            ]
        },
        created() {
            this.getList();
        },
        methods: {
            getList() {
                this.$api('get_menu');
            }
        }
    }
</script>
<style lang="less" scoped>

</style>
