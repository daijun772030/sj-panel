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
         <el-dialog :modal-append-to-body="false" @close="close(changeShop)" :title="title" center :visible.sync="dialogVisible" :show-close="false" width="900px">
      <el-form :inline="false" :model='changeShop' ref="changeShop" label-width="100px" class="searchForm" rule='rules'>
        <el-form-item label="商家地址：" prop="address" class="uniq">
        </el-form-item>
        <el-form-item label="商家联系方式：" prop="phone" class="uniq">
        </el-form-item>
        <el-form-item prop="shopName" label="商铺名称" class="uniq">
        </el-form-item>
        <el-form-item prop="startTime" label="开始配送时间：" class="uniq">
        </el-form-item>
        <el-form-item prop="endTime" label="结束配送时间：" class="uniq">
        </el-form-item>
        <el-form-item prop="takeoff" label="取送费：" class="uniq">
        </el-form-item>
        <el-form-item prop="riseoff" label="起送价格" class="uniq">
        </el-form-item>
        <el-form-item prop="status" label="营业状态" class="uniq">
        </el-form-item>
        <el-form-item prop="notice" label="商家公告" class="uniq">
        </el-form-item>
      </el-form>
      <!-- <span slot="footer" class="dialog-footer">
        <el-button @click="cancel" type="primary">取消</el-button>
        <el-button @click="save" type="primary">保存</el-button>
      </span> -->
    </el-dialog>
    </div>
</template>
<script>

import {pca,pcaa} from 'area-data';
    export default {
        data() {
            return {
                placeholders:['省','市','区'],
                pcaa:pcaa,
                pca:pca,
                selected:["510000","510100","510104"],
                formObj:[
                    {id:'1',
                    name:"dadadada"}
                    ],
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
                },
                title:"修改商家信息",
                dialogVisible:false,
                object: {
                    region: ""
                },
                activeIndex : "1",
                status : "操作",  
            }
        },
        created () {
            // this.arhives();
            // this.orderAll();
            this.archivesAll();
            this.change();
        },
        methods : {
            //弹窗消失函数
            close(changeShop){
                console.log(changeShop)
            },
            archivesAll() {//查询商家信息
                this.$api("merchantChange").then((res)=>{
                    // debugger;
                    console.log(res.data.data)
                    this.changeShop.id=res.data.data.id;
                    this.changeShop.address = res.data.data.address;
                    this.changeShop.phone = res.data.data.phone;
                    this.changeShop.shopName = res.data.data.shopName;
                    this.changeShop.takeoff = res.data.data.takeoff;
                    this.changeShop.riseoff = res.data.data.riseoff;
                    this.changeShop.riseoff = res.data.data.status
                    console.log(this.changeShop)
                })
            },
            change () {
                // debugger;
                this.$api("updataByMer",{
                    id:"11",
                    address:"daddadadd",
                    phone:"1858158693",
                    endTime:"2018-08-03 15:48:39",
                    startTime:"2018-08-03 15:48:39",
                    takeoff:"2",
                    riseoff:"3",
                    shopName:"厉害了我的哥",
                    status:"1",
                    notice:"这家店有点牛皮。赶快进店消费哦"
                    }).then((res)=>{
                         console.log(this.changeShop)
                        console.log(res)
                    })
            },
            updata () {//营业中函数
                console.log(this.object.region)
            },
            download () {//休息中函数
                console.log(this.object.region)
            },
            orderAll() {
                this.$api('orderAll',{params:{pageNum:"1",pageSize:"12",type:"5"}}).then((res)=>{
                    console.log(res);
                })
                // this.$api('orderAll',{params:{pageNum:"1",pageSize:"12",type:"5"}}).then((res)=>{
                //     console.log(res);
                // })
            },
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
                // this.$api("updataByMer",{})
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

