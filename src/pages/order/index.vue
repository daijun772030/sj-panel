<template>
    <div class="home">
        <!-- 搜索框的展示  -->

        
    <!-- 表格的展示 -->
        <el-table
            :data="list"
            empty-text="没有新东西"
            v-loading="loading" 
            :default-sort = "{prop: 'condition', order: 'descending'}"
            element-loading-text="加载中..."
            style="
            height: calc(100% -105px)"
            class="home-table">
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
        <div class="pageination">
            <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="searchObj.pageNum"
                :page-sizes="[10, 15, 20, 35]"
                :page-size="searchObj.pageSize"
                layout="total, sizes, prev, pager, next, jumper"
                :total="searchObj.totalCount">
            </el-pagination>
        </div>
    </div>
</template>
<script>
    // import DjObject from './object.js';
    export default {
    data(){
        return {
            loading:false,
            list:null,
            searchObj:{
            pageSize:10,
            pageNum:1,
            totalCount:0
        }
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
            this.$api("orderType",{params:{type:"1",orderId:scope.row.id,outTradeNo:scope.row.orderNum}}).then((res)=>{
                // debugger;
                console.log(res)
                var num = scope.$index
                console.log(num)
                this.list[num] = null;
                this.orderAll();
            })
        },
        //查询所有订单
        orderAll () {
            this.$api('orderAll',{params:{pageNum:"1",pageSize:"10",type:"0"}}).then((res)=>{
                console.log(res)
                var list = res.data.data.list;
                this.list = list;
                this.searchObj.pageSize = res.data.data.pageSize;
                this.searchObj.pageNum = res.data.data.pageNum;
                this.searchObj.totalCount = res.data.data.total;

            })
        },
        handleSizeChange (val) {//改变每页显示多少条
        this.searchObj.pageSize = val;
        this.orderAll()
      },
      handleCurrentChange (val) { //改变前往多少页
        this.searchObj.pageNum = val;
        this.orderAll()
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
        height: calc(100% - 60px);
        // border:1px solid blue;
    }
    .block{
        padding:10px;
    }
</style>



