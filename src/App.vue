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
            // debugger;
            const that = this;
            this.$api("findBy",{params:{commodityid:'55'}}).then(res => {
                // 已登录
                // debugger;
                const { path } = that.$route;
                console.log(that.$route)
                if(res.data.retCode == 200) {
                    this.$api('orderAll',{params:{pageNum:1,pageSize:20,type:"5"}}).then((res)=>{
                        var list = res.data.data.list;
                        console.log(list)
                        var id = {
                            id:list[0].merchantid
                        }
                        this.store.commit('increment',id)
                        console.log(this.store.state.id);
                    })
                    console.log(path)
                    if(path === '/') {
                        that.$router.replace({ path: "/manager" });
                    }else {
                        that.$router.replace({ path });
                    }
                }else {
                    that.$router.replace({ path: "/login" });
                }
            // const { token } = res;
            // localStorage.setItem('token', token);
            }).catch(error => {
                this.$message({
                    message: '接口错误，请刷新页面',
                    center: true
                });
            });
        }
    }
}
</script>

<style lang="less" scoped>
</style>