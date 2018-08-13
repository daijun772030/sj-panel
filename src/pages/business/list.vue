<template>
    <div class="business">
       <el-form :inline="true"  label-width="5px" size="mini"  class="searchForm">
            <el-form-item class="float_left">
                <el-input  placeholder="搜索" clearable prefix-icon="el-icon-search" style="width:217px"></el-input>
            </el-form-item>
            <el-form-item class="float_left">
                <el-date-picker type="date" clearable placeholder="选择上传时间"  class="wd"></el-date-picker>
            </el-form-item>
            <el-form-item class="float_left">
                <el-date-picker type="date" clearable placeholder="选择最后编辑"  class="wd"></el-date-picker>
            </el-form-item>
            <el-form-item class="float_left">
                <el-select  placeholder="商品类型" clearable>
                    <el-option >
                    </el-option>
                </el-select>
            </el-form-item >
            <el-form-item class="float_left">
                <el-button type="primary">确定</el-button>
            </el-form-item>
            <el-form-item class="float_right">
                <el-button type="primary">添加商品</el-button>
            </el-form-item>
        </el-form>

    <!-- table列表展示页 -->
        <el-table class="list-table" height="calc(100%-150px)" border :data="list">
            <el-table-column  label="订单号" align="center"></el-table-column>
            <el-table-column  label="商品名称" align="center"></el-table-column>
            <el-table-column  label="收货时间" align="center"></el-table-column>
            <el-table-column  label="应收金额" align="center"></el-table-column>
            <el-table-column  label="商家优惠券" align="center"></el-table-column>
            <el-table-column  label="商家满减" align="center"></el-table-column>
            <el-table-column  label="实收金额" align="center"></el-table-column>
            <el-table-column  label="平台提成" align="center"></el-table-column>
            <el-table-column  label="实到" align="center"></el-table-column>
        </el-table>
        <!-- <el-table class="list-tableTwo">
            <el-table-column label="实到合计"></el-table-column>
        </el-table> -->
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
    // 商家列表
    export default {
        data () {
            return {
            paginObj: {
                pagnum:0,
                pageSize:3,
                currentPages: 1,
                currentPage: 1
            },
            pageNum: {

            },
            list:[],
            dataNum:[],//需要渲染的条数
            pagingnum: '',//一共有多少条
            tableData: []
        
        }
            },
        created(){
            // this.getList()
        },
        methods: {
            getList () {
            //这里用来组件一进来渲染的数据
            this.loading = true 
            this.$api('mock').then((data)=>{
                console.log(data)
            this.tableData = data.data.data.projects
            for(let i = 0; i<this.paginObj.pageSize&&i<this.tableData.length;i++) {
                this.dataNum.push(this.tableData[i])   
            }
            })
            this.loading = false
        },
        handleSizeChange(val) {
            console.log(val)
        },
        handleCurrentChange (val) {
            console.log(val)
        },
        getconfig () {
            this.dataNum = [1, 2, 3, 4, 5]
        }
    }
    }
</script>
<style lang="less" scoped>
    .business{
        height: 100%;
        width: 100%;
        // border:1px solid red;
        overflow: hidden;
    }
</style>
<style lang="less">
   .searchForm{
        padding:10px;
        // border: 1px solid blue;
        overflow: hidden;
    }
    .list-table{
        width:100%;
        height:calc(~"100% - 130px");
        margin-top: 10px;
        // background-color: red;
    }
    // .list-tableTwo{
    //     width:20%;
    //     // float: right;
    //     height:calc(~"100% - 200px");
    // }
    .list{
        background-color: red;
    }
    
</style>

