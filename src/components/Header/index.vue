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
        <!-- <audio v-if="true" src=""></audio> -->
         <el-dialog :modal-append-to-body="false" @close="close(changeShop)" :title="title" center :visible.sync="dialogVisible" :show-close="false" width="900px">
            <el-form :inline="true" :model='changeShop' ref="changeShop" label-width="150px" class="demo-form-inline"  size="small" >
                <el-form-item label="地址：" prop="address">
                    <el-input type="text" placeholder="店铺地址" v-model="this.changeShop.address"></el-input>
                </el-form-item>
                <el-form-item label="联系方式：" prop="phone" class="uniq">
                    <el-input type="text" placeholder="请输入联系电话" v-model="changeShop.phone"></el-input>
                </el-form-item>
                <el-form-item prop="shopName" label="商铺名称" class="uniq">
                    <el-input type="text" placeholder="请输入店铺名称" v-model="changeShop.shopName"></el-input>
                </el-form-item>
                <el-form-item prop="startTime" label="配送开始时间：" class="uniq">
                    <el-date-picker @change="changeStart"  type="datetime"  placeholder="选择取货时间" v-model="value1"></el-date-picker>
                </el-form-item>
                <el-form-item prop="endTime" label="配送结束时间：" class="uniq">
                    <el-date-picker  @change="changEndTime" type="datetime"  placeholder="选择配送结束时间" v-model="value2"></el-date-picker>
                </el-form-item>
                <el-form-item prop="takeoff" label="取送费：" class="uniq">
                    <el-input type="text" placeholder="请输入取送费" v-model="changeShop.takeoff"></el-input>
                    <template slot="append">
                        元                        
                    </template>
                </el-form-item>
                <el-form-item prop="riseoff" label="起送价格：" class="uniq">
                    <el-input type="text" placeholder="请输入起送价格" v-model="changeShop.riseoff"></el-input>
                    <template slot="append">
                        元                        
                    </template>
                </el-form-item>
                <el-form-item prop="status" label="营业状态：" class="uniq">
                    <el-select v-model="changeShop.status" clearable placeholder="请选择营业状态">
                         <el-option v-for="item in this.mystatus" :key="item.id" :label="item.name" :value="item.id"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item prop="notice" label="商家公告：" class="uniq">
                    <el-input autosize type="textarea" placeholder= "输入公告信息" v-model="changeShop.notice" size="large"></el-input>
                </el-form-item>
            </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancel" type="primary">取消</el-button>
        <el-button @click="save" type="primary">保存</el-button>
      </span>
    </el-dialog>
    </div>
</template>
<script>

import {pca,pcaa} from 'area-data';
    export default {
        data() {
            return {
                value1:null,
                value2:null,
                mystatus:[
                    {
                        id:0,
                        name:"营业中"
                    },
                    {
                        id:1,
                        name:'休息中'
                    }
                ],
                changeShop:{
                    id:null,
                    address:null,
                    phone:null,
                    shopName:null,
                    startTime:null,
                    endTime:null,
                    takeoff:null,
                    riseoff:null,
                    status:null,
                    notice:null
                },
                placeholders:['省','市','区'],
                pcaa:pcaa,
                pca:pca,
                selected:["510000","510100","510104"],
                formObj:[
                    {id:'1',
                    name:"dadadada"}
                    ],
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
            // this.change();
        },
        methods : {
            changEndTime(time) {
                var date = new Date(time);
                var year = date.getFullYear();
                var month= date.getMonth()+1<10 ? "0"+(date.getMonth()+1) : date.getMonth()+1;
                var day=date.getDate()<10 ? "0"+date.getDate() : date.getDate();
                var hours=date.getHours()<10 ? "0"+date.getHours() : date.getHours();
                var minutes=date.getMinutes()<10 ? "0"+date.getMinutes() : date.getMinutes();
                var seconds=date.getSeconds()<10 ? "0"+date.getSeconds() : date.getSeconds();
                // 拼接
                
                 time = year+"-"+month+"-"+day+" "+hours+":"+minutes+":"+seconds;
                //    console.log(time)
                this.value2 = time
            },
            changeStart (time) {
                var date = new Date(time);
                var year = date.getFullYear();
                var month= date.getMonth()+1<10 ? "0"+(date.getMonth()+1) : date.getMonth()+1;
                var day=date.getDate()<10 ? "0"+date.getDate() : date.getDate();
                var hours=date.getHours()<10 ? "0"+date.getHours() : date.getHours();
                var minutes=date.getMinutes()<10 ? "0"+date.getMinutes() : date.getMinutes();
                var seconds=date.getSeconds()<10 ? "0"+date.getSeconds() : date.getSeconds();
                // 拼接
                
                   time = year+"-"+month+"-"+day+" "+hours+":"+minutes+":"+seconds;
                //    console.log(time)
                this.value1 = time
                console.log(this.changeShop.startTime)
            },
                
            //保存商家信息的函数
            save(){
                this.change();
                this.dialogVisible= false;
            },
            //取消修改商家信息函数
            cancel () {
                this.dialogVisible = false;
            },
            //弹窗消失函数
            close(changeShop){
                console.log(changeShop)
            },
            archivesAll() {//查询商家信息
                this.$api("merchantChange").then((res)=>{
                    // debugger;
                    console.log(res.data)
                    this.changeShop.id = res.data.data.id;
                    this.changeShop.address = res.data.data.address;
                    this.changeShop.phone  = res.data.data.phone;
                    this.changeShop.shopName = res.data.data.shopName;
                    this.changeShop.startTime = res.data.data.startTime;
                    this.changeShop.endTime = res.data.data.endTime;
                    this.changeShop.takeoff = res.data.data.takeoff;
                    this.changeShop.riseoff = res.data.data.riseoff;
                    this.changeShop.status = res.data.data.status;
                    this.changeShop.notice = res.data.data.notice;
                    // this.changeShop.id = res.data.data.id
                    console.log(this.changeShop)
                })
            },
            change () {//这里是修改数据的函数
                // debugger;
                this.$api("updataByMer",{
                    id:this.changeShop.id,
                    address:this.changeShop.address,
                    phone:this.changeShop.phone,
                    endTime:this.value2,
                    startTime:this.value1,
                    takeoff:this.changeShop.takeoff,
                    riseoff:this.changeShop.riseoff,
                    shopName:this.changeShop.shopName,
                    status:this.changeShop.status,
                    notice:this.changeShop.notice

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
        margin: 20px 50px 0 5px ;
    } 
}
</style>
<style lang  = "less">
  .searchForm{
        padding: 10px;
    }
    el-form{
        overflow: hidden;
    }
    el-form-item{
        padding:20px 0;
    }
</style>


