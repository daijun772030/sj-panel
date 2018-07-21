<template>
    <router-view></router-view>
</template>

<script>
export default {
    data(){
        return {
            index : "login"
        }
    },
    created(){
        this.showPage();
    },
    methods : {
        async showPage(){
            this.$api("myshop",{"pageNum":'1',"pageSize":'1'}).then(res => {
                if(res.data.retCode == 200) this.index = "manager";
                this.$router.push({ name : this.index });
            // const { token } = res;
            // localStorage.setItem('token', token);
            });
            this.$router.replace({ path : this.index });
        }
    }
}
</script>

<style lang="less" scoped>

</style>