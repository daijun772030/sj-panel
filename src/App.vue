<template>
    <router-view></router-view>
</template>

<script>
export default {
    data(){
        return {
            index : "/manager"
        }
    },
    created(){
        this.showPage();
    },
    methods : {
        async showPage(){
            // this.$api("islogin").then(res => {
            //     if(res.retCode == 200) this.index = "/manager";
            //     this.$router.push({ name : this.index });
            // const { token } = res;
            // localStorage.setItem('token', token);
            // });
            this.$router.replace({ path : this.index });
        }
    }
}
</script>

<style lang="less" scoped>

</style>