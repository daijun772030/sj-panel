<template>
    <div class="home"> 
        <!-- 搜索框的展示  -->
        <el-form :inline="true" :model="formInline" class="searchForm">
            <el-form-item label="审批人">
                <el-input v-model="formInline.user" placeholder="审批人"></el-input>
            </el-form-item>
            <el-form-item label="活动区域">
                <el-select v-model="formInline.region" placeholder="活动区域">
                <el-option label="区域一" value="shanghai"></el-option>
                <el-option label="区域二" value="beijing"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-button type="primary">查询</el-button>
            </el-form-item>
        </el-form>
    <!-- 表格的展示 -->
        <el-table
            :data="tableData"
            style="
            height: calc(100% -60px)"
            class="home-table">

            <el-table-column
            align="center"
            label="日期"
            width="180">
            <template slot-scope="scope">
                <i class="el-icon-time"></i>
                <span style="margin-left: 10px">{{ scope.row.date }}</span>
            </template>
            </el-table-column>
            <el-table-column
             align="center"
            label="姓名"
            width="180">
            <template slot-scope="scope">
                <el-popover trigger="hover" placement="top">
                <p>姓名: {{ scope.row.name }}</p>
                <p>住址: {{ scope.row.address }}</p>
                <div slot="reference" class="name-wrapper">
                    <el-tag size="medium">{{ scope.row.name }}</el-tag>
                </div>
                </el-popover>
            </template>
            </el-table-column>
            <el-table-column
             align="center"
             label="操作">
            <template slot-scope="scope">
                <el-button
                size="mini"
                @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
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
            :current-page="paginObj.currentPage1"
            :page-sizes="[20, 30, 40, 60]"
            :page-size="paginObj.pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="paginObj.pagnum">
            </el-pagination>
  </div>
    </div>
</template>
<script>
export default {
    data(){
        return {
            formInline: {
            user: '',
            region: ''
        },
        paginObj: {
            currentPage1: 1,
            pagnum:0,
            pageSize:20,

        },
        dataNum:[],//需要渲染的条数
        pagingnum: '',//一共有多少条
        tableData: [{
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄'
        }, {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        }, 
        {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        }
        , {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        }
        , {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        }
        , {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        }
        , {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        }
        , {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        },
        {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        }
        , {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        }
        , {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        }
        , {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        }
        , {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        },
        {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        },
        {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        },
        {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        },
        {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        },
        {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        },
        {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        },
        {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        }
        ]
        }
    },
    created () {
        var val = this.paginObj.pageSize
        this.pagnum()
        this.handleSizeChange(val)
    },
    methods: {
        handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
        console.log(this.paginObj.pageSize)
        for(let i=( this.paginObj.currentPage1-1)*this.paginObj.pageSize;i< this.currentPage1*this.paginObj.pageSize&&i<this.tableData.length;i++){
            /*&&i<this.tableData.length*/
          if(i<this.tableData.length){
            this.dataNum.push(this.tableData[i])
          }
        }
        },
        handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
        },
        //一共有多少条
        pagnum () {
            console.log(this.tableData.length)
            this.paginObj.pagnum = this.tableData.length
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
        // background-color: aqua;
    }
    .searchForm{
        padding: 10px;

    }
</style>
<style lang="less">
    .home-table{
        width: 100%;
        height: calc(100% - 120px);
        // border:1px solid blue;
        overflow-x: auto;
        overflow-y: auto;
    }
    .block{
        padding:10px;
    }
    
</style>



