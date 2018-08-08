<template>
    <div class="home">
        <!-- 搜索框的展示  -->

        <el-form :inline="true" :model="seachObject" label-width="5px" size="mini"  class="searchForm">
            <el-form-item class="float_left">
                <el-input v-model="seachObject.input" placeholder="搜索" clearable prefix-icon="el-icon-search" style="width:217px"></el-input>
            </el-form-item>
            <el-form-item class="float_left">
                <el-date-picker v-model="seachObject.starDate" type="date" clearable placeholder="起始日期"  class="wd"></el-date-picker>
            </el-form-item>
            <el-form-item class="float_left">
                <el-date-picker v-model="seachObject.endDate" type="date" clearable placeholder="结束日期"  class="wd"></el-date-picker>
            </el-form-item>
            <el-form-item class="float_left">
                <el-select v-model="seachObject.money" placeholder="金额区间" clearable>
                    <!-- <el-option >
                    </el-option> -->
                </el-select>
            </el-form-item >
            <el-form-item class="float_left">
                <el-select v-model="seachObject.state" placeholder="状态" clearable>
                    <!-- <el-option >
                    </el-option> -->
                </el-select>
            </el-form-item>
            <el-form-item class="float_left">
                <el-button @click="earchForm" type="primary">确定</el-button>
            </el-form-item>
            <el-form-item  class="float_right" prop="region">
                <el-select v-model="seachObject.region" placeholder="营业状态">
                <el-option label="营业中" value="shanghai"></el-option>
                <el-option label="休息中" value="beijing"></el-option>
                </el-select>
            </el-form-item>
        </el-form>
    <!-- 表格的展示 -->
        <el-table
            :data="list"
            empty-text="没有新东西"
            v-loading="loading" 
            :default-sort = "{prop: 'condition', order: 'descending'}"
            element-loading-text="加载中..."
            style="
            height: calc(100% -60px)"
            class="home-table">\
            <el-table-column prop="orderNum" align="center" label="订单号"></el-table-column>
            <el-table-column prop="commodityName"  align="center" label="商品名称"></el-table-column>
            <el-table-column prop="oddress" align="center" label="客户地址"></el-table-column>
            <el-table-column prop="phone" align="center" label="客户电话"></el-table-column>
            <el-table-column prop="startTime" align="center" label="取件时间"></el-table-column>
            <el-table-column prop="endTime" align="center" label="送件时间"></el-table-column>
            <el-table-column prop="status" align="center" label="支付状况"></el-table-column>
            <el-table-column prop="createTime" align="center" label="创建时间"></el-table-column>
            <el-table-column prop="remark" align="center" label="客户备注"></el-table-column>
            <el-table-column
             align="center"
             width="200px"
             label="操作">
            <template slot-scope="scope" width="80%">
                <el-button
                size="mini"
                @click="handleEdit(scope)">接单</el-button>
            </template>
            </el-table-column>
        </el-table>
        <div class="block">
            <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="paginObj.currentPage"
            background
            :page-sizes="[3, 5, 6, 8]"
            :page-size="paginObj.pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="tableData.length">
            </el-pagination>
        </div>
    </div>
</template>
<script>
    import DjObject from './object.js';
    export default {
    data(){
        return {
            list:null,
            right:null,//订单是否接单
            
            seachObject:{
                input:'',
                starDate: '',
                endDate: '',
                money: '',
                state: '',
                region: ''
            },
            scopeIndex:"",
            myObject:{},
            centerDialogVis: false,
            tableData:DjObject.tableData,
            loading: false,
            input1: '',
            formInline: {
                user: '',
                region: ''
            },
            paginObj: {
                pagnum:0,
                pageSize:3,
                currentPages: 1,
                currentPage: 1
            },
            addForm: {

            },
            dataNum:[],//需要渲染的条数
            pagingnum: '',//一共有多少条
        }
    },
    created () {
        // this.getList()
        this.orderAll();
    },
    computed: {

    },
    methods: {

        //这里做列表的轮询。。查看是不是有新订单
        //点击接单以后前往待发货状态
        handleEdit(scope) {
            console.log(scope)
            this.$api("orderType",{params:{type:"1",orderId:"1"}}).then((res)=>{
                debugger;
                console.log(res)
                var num = scope.$index
                console.log(num)
                this.list[num] = null;
                this.orderAll();
            })
        },
        //查询所有订单
        orderAll () {
            this.$api('orderAll',{params:{pageNum:"1",pageSize:"10",type:"5"}}).then((res)=>{
                console.log(res)
                var list = res.data.data.list;
                this.list = list;
            })
        },
        //测试接口的方法
        getList () {
            this.$api("test").then((data)=>{
                //  debugger;
                console.log(data)
            }).catch(err => {

            })
        },
        earchForm () {//这里请求接口进行搜索然后渲染
            console.log(this.seachObject)
        },
        // handleEdit (a,b) {//这个是点击编辑以后当前行的数据在input框中

        //     this.centerDialogVis = true;
        //     console.log(b)
        //     console.log(a)
        //     this.scopeIndex = a
        //     console.log(this.object[a])
        //     this.myObject =this.object[a]
        //     this.object[a]=this.myObject
        // },
        seach () {
            //在这里用来分页查询
            for(var i=( this.paginObj.currentPage-1)*this.paginObj.pageSize;i< this.paginObj.currentPage*this.paginObj.pageSize&&i<this.tableData.length;i++){
            /*&&i<this.tableData.length*/
                if(i<this.tableData.length){
                    this.dataNum.push(this.tableData[i])
                }
            }
        },
        handleSizeChange(val) {
            //选择显示多少条每页
            this.paginObj.pageSize = val
            this.dataNum = []
            this.seach()
        
        },
        handleCurrentChange(val) {
            // 选择第几页
            this.paginObj.currentPage = val
            this.dataNum = []
            this.seach()
        }
        }
    }
</script>
<style lang="less" scoped>
    .home{
        width: 100%;
        height:100%;
        text-align: center;
        color: black;
        color: rgba(0, 0, 0, 0.349)
        // background-color: aqua;
    }
    .searchForm{
        padding: 10px;

    }
    .searchForm1{
        display: flex;
        flex-wrap: wrap;
        justify-content:center;
        align-items: center;
    }
</style>
<style lang="less">
    .home-table{
        width: 100%;
        height: calc(100% - 120px);
        // border:1px solid blue;
    }
    .block{
        padding:10px;
    }
</style>



