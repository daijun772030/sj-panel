<template>
    <div class="home">  
    <el-table class="table"
    :data="tableData"
    :slot="empty"
    style="width: 100%">
        <el-table-column
        label="日期"
        style="text-aligin:center"
        >
            <template slot-scope="scope">
                <i class="el-icon-time"></i>
                <span style="margin-left: 10px">{{ scope.row.date }}</span>
            </template>
        </el-table-column>
        <el-table-column
        label="状态">
            <template slot-scope="scope">
                <I class="el-icon-time"></i>
                <span style="margin-left:10px">{{scope.row.state}}</span>
            </template>
        </el-table-column>
        <el-table-column
        label="姓名"
       >
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
        <el-table-column label="操作" >
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
    <!-- <div class="pagination" v-show="searchObj.totalCount > 0">
        <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            background
            :current-page="searchObj.pageNum"
            :page-sizes="[15, 30, 45, 60]"
            layout="total, sizes, prev, pager, next, jumper"
            :page-size="searchObj.pageSize"
            :total="searchObj.totalCount">
        </el-pagination>
    </div> -->
    <div class="block">
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage4"
      :page-sizes="[100, 200, 300, 400]"
      :page-size="100"
      layout="total, sizes, prev, pager, next, jumper"
      :total="400">
    </el-pagination>
    </div>
    </div>
</template>
<script>
    // 首页
    export default {
        data () {
            return {
            djdata: [],
            tableData: [{
                state:'成功',
                date: '2016-05-02',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1518 弄'
                }, {
                state:'成功',
                date: '2016-05-04',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1517 弄'
                }, {
                state:'成功',
                date: '2016-05-01',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1519 弄'
                }, {
                state:'成功',
                date: '2016-05-03',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1516 弄'
                },{
                    state:'成功',
                    date: '2016-05-03',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1516 弄'
                },{
                    state:'成功',
                    date: '2016-05-03',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1516 弄'
                },{
                    state:'成功',
                    date: '2016-05-03',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1516 弄'
                },{
                    state:'成功',
                    date: '2016-05-03',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1516 弄'
                },{
                    state:'成功',
                    date: '2016-05-03',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1516 弄'
            },
            {
                state:'成功',
                date: '2016-05-02',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1518 弄'
                }, {
                state:'成功',
                date: '2016-05-04',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1517 弄'
                }, {
                state:'成功',
                date: '2016-05-01',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1519 弄'
                }, {
                state:'成功',
                date: '2016-05-03',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1516 弄'
                },{
                    state:'成功',
                    date: '2016-05-03',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1516 弄'
                },{
                    state:'成功',
                    date: '2016-05-03',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1516 弄'
                },{
                    state:'成功',
                    date: '2016-05-03',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1516 弄'
                },{
                    state:'成功',
                    date: '2016-05-03',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1516 弄'
                },{
                    state:'成功',
                    date: '2016-05-03',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1516 弄'
            },
            {
                state:'成功',
                date: '2016-05-02',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1518 弄'
                }, {
                state:'成功',
                date: '2016-05-04',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1517 弄'
                }, {
                state:'成功',
                date: '2016-05-01',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1519 弄'
                }, {
                state:'成功',
                date: '2016-05-03',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1516 弄'
                },{
                    state:'成功',
                    date: '2016-05-03',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1516 弄'
                },{
                    state:'成功',
                    date: '2016-05-03',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1516 弄'
                },{
                    state:'成功',
                    date: '2016-05-03',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1516 弄'
                },{
                    state:'成功',
                    date: '2016-05-03',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1516 弄'
                },{
                    state:'成功',
                    date: '2016-05-03',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1516 弄'
            },
            {
                state:'成功',
                date: '2016-05-02',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1518 弄'
                }, {
                state:'成功',
                date: '2016-05-04',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1517 弄'
                }, {
                state:'成功',
                date: '2016-05-01',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1519 弄'
                }, {
                state:'成功',
                date: '2016-05-03',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1516 弄'
                },{
                    state:'成功',
                    date: '2016-05-03',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1516 弄'
                },{
                    state:'成功',
                    date: '2016-05-03',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1516 弄'
                },{
                    state:'成功',
                    date: '2016-05-03',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1516 弄'
                },{
                    state:'成功',
                    date: '2016-05-03',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1516 弄'
                },{
                    state:'成功',
                    date: '2016-05-03',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1516 弄'
            }]
            }
        },
        methods: {
            handleEdit(index, row) {
                console.log(index, row);
            },
            handleDelete(index, row) {
                console.log(index, row);
            }
        },
        created () {

        }
         }
</script>
<style lang="less" scoped>
    .home{
        width: 100%;
        height: 100%;
        text-align: center;
        background-color: red;
    }
    .table{
        width:100%;
        height: calc(100%-50px); 
        overflow-x: auto;
        overflow-y: auto;
    }
    .block{
    box-sizing: border-box;
      width: 100%;
      height: 50px;
      padding: 0 15px;
      display: flex;
      flex-flow: row nowrap;
      justify-content: space-around;
      align-items: center;
      box-shadow: 0 5px 10px -2px #ccc;
    }
</style>
