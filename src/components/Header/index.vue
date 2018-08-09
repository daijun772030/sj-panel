<template>
    <div class="head">
            <!-- <div>
                <img src="~/static/images/logo.png" alt="">
            </div> -->
            <p style="text-aligin: center">营业状态：</p>
        <el-form class="earchForm">
            <el-form-item  prop="region">
                <el-select v-model="object.region"  command="updata" placeholder="营业状态">
                <el-option label="营业中" value="shanghai"></el-option>
                <el-option label="休息中" value="beijing"></el-option>
                </el-select>
            </el-form-item>
        </el-form>
        <el-dropdown class="head-option" @command="handler">
            <span class="el-dropdown-link">
                {{status}}<i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="loginout">注销</el-dropdown-item>
                <el-dropdown-item command="modifyPassword">修改个人信息</el-dropdown-item>
            </el-dropdown-menu>
        </el-dropdown>
        <audio v-if="true" src=""></audio>

    </div>
</template>
<script>
    export default {
        data() {
            return {
                dialogVisible:false,
                object: {
                    region: ""
                },
                activeIndex : "1",
                status : "操作",
                changeShop:{
                    id:null,//商家id
                    address:null,//地址
                    phone:null,//商家联系方式
                    endTime:null,//结束配送时间
                    startTime:null,//开始配送时间
                    takeoff:null,//取送费
                    riseoff:null,//起送价格
                    shopName:null,//商户名称
                    status:1,//营业状态
                    notice:null,//商家公告
                }
            }
        },
        created () {
            // this.arhives();
            // this.orderAll();
            this.archivesAll();
            this.change();
        },
        methods : {
            archivesAll() {//查询商家信息
                this.$api("archivesAll",{params:{pageNum:"1",pageSize:"20"}}).then((res)=>{
                    console.log(res)
                    this.changeShop.id=res.data.data.id;
                    this.changeShop.address = res.data.data.address;
                    this.changeShop.phone = res.data.data.contactPhone;
                    this.changeShop.shopName = res.data.data.shopName;
                })
            },
            change () {
                this.$api("updataByMer",{
                    id:this.changeShop.id,
                    address:this.address,
                    phone:this.changeShop.phone,
                    endTime:"2018-08-03 15:48:39",
                    startTime:"2018-08-03 15:48:39",
                    takeoff:"3",
                    riseoff:"15",
                    shopName:this.changeShop.shopName,
                    status:this.changeShop.status,
                    notice:"这家店有点牛皮。赶快进店消费哦"
                    }).then((res)=>{
                        console.log(res)
                    })
            },
            updata () {//营业中函数
                console.log(this.object.region)
            },
            download () {//休息中函数
                console.log(this.object.region)
            },
            // orderAll() {
            //     this.$api('orderAll',{params:{pageNum:"1",pageSize:"12",type:"5"}}).then((res)=>{
            //         console.log(res);
            //     })
            //     // this.$api('orderAll',{params:{pageNum:"1",pageSize:"12",type:"5"}}).then((res)=>{
            //     //     console.log(res);
            //     // })
            // },
            handler(option) {
                switch(option) {
                    case "loginout" : this.loginout(); break;
                    case "modifyPassword" : this.modifyPassword(); break;
                }
            },
            loginout() {
                // debugger;
            this.$api('cancellation').then((res)=>{
                if(res.data.retCode==-200){
                    this.$router.replace({ path : '/login' });
                }
                console.log(res)
            })
            },
            // arhives () {
            //     this.$api("archivesAll",{params:{pageNum:"1",pageSize:"1000"}}).then((res)=>{
            //         console.log(res);
            //     })
            // },
            modifyPassword() {
                this.dialogVisible= true;
                this.$api("updataByMer",{})
            }
        }
    }
</script>

<style lang="less" scoped>
.head{
    box-sizing: border-box;
    width: 100%;
    height: 50px;
    padding: 0 15px;
    overflow: hidden;
    display: flex;
    flex-flow: row nowrap;
    justify-content: flex-end;
    align-items: center;
    box-shadow: 0 5px 10px -2px #ccc;
    &-option{
        cursor: pointer;
    }
    .earchForm {
        margin-bottom: 0;
    }
    .el-form-item,.el-form-item--mini{
        margin: 0 50px 0 5px ;
    }
    
}
</style>

