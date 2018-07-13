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

    <el-table
            element-loading-text="加载中..."
            style="height: calc(100% -50px)"
            class="list-table">

            <el-table-column
            align="center"
            label="订单编号"
            >
            <template slot-scope="scope">
                <i class="el-icon-time"></i>
                <span style="margin-left: 10px"></span>
            </template>
            </el-table-column>
            <el-table-column
            align="center"
            label="订单类型"
            >
            <template slot-scope="scope">
                <p style="color: red"></p>
            </template>
            </el-table-column>
            <el-table-column
            label="下单情况"
            align="center">
                <template slot-scope="scope">
                    <el-popover trigger="hover" placement="top">
                        <p>中心城市: </p>
                        <p>省份: </p>
                        <div slot="reference" class="name-wrapper">
                        <el-tag size="medium"></el-tag>
                        </div>
                </el-popover>
                </template>
            </el-table-column>
            <el-table-column
             align="center"
            label="是否接单"
           >
            <template slot-scope="scope">
                <p>{{scope.row.name}}</p>
            </template>
            </el-table-column>
            <el-table-column
             align="center"
             label="操作">
            <template slot-scope="scope">
                <el-button
                size="mini"
                @click="handleEdit(scope.$index, scope.row)">查看</el-button>
                <el-button
                size="mini"
                type="danger"
                @click="handleDelete(scope.$index, scope.row)">删除</el-button>
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
            dataNum:[],//需要渲染的条数
            pagingnum: '',//一共有多少条
            tableData: []
        
        }
            },
        created(){
            this.getList()
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

            
        }
    }
    }
</script>
<style lang="less" scoped>
    .business{
        height: 100%;
        width: 100%;
        border:1px solid red;
        overflow: hidden;
    }
    
    // .float_right{
    //     float: right;
    //     right: 10px;
    // }
</style>
<style lang="less">
   .searchForm{
        padding:10px;
        border: 1px solid blue;
        overflow: hidden;
    }
    .list-table{
        width:100%;
        height:calc(~"100% - 130px");
        margin-top: 10px;
        // background-color: red;
    }

    
    
</style>

