<template>
    <div class="business">
        {{message}}
        <div @click="divd">点击按钮</div>
    </div>
</template>
<script>
    // 商家列表
    export default {
        data () {
            return {
                message: "商家订单的展示",
                array: []
            }
        },
        created(){
            
        },
        methods: {
            divd () {
                var _this = this
                _this.$axios.get('https://www.easy-mock.com/mock/5b3cb20beaf38c457dee359c/example/mock').then( function (data) {
                console.log(data.data.data.projects)
                _this.array = data.data.data.projects
                console.log(_this.array)
                console.log(_this.message)
            }) 
            }
        }
    }
</script>
<style lang="less" scoped>
    .business{

    }
</style>
