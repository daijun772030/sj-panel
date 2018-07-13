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
            :data="dataNum"
            v-loading="loading" 
            element-loading-text="加载中..."
            style="
            height: calc(100% -60px)"
            class="home-table">

            <el-table-column
            align="center"
            label="日期"
            >
            <template slot-scope="scope">
                <i class="el-icon-time"></i>
                <span style="margin-left: 10px">{{ scope.row.number }}</span>
            </template>
            </el-table-column>
            <el-table-column
            align="center"
            label="等级"
            >
            <template slot-scope="scope">
                <p style="color: red">{{scope.row.string}}</p>
            </template>
            </el-table-column>
            <el-table-column
            label="地址"
            align="center">
                <template slot-scope="scope">
                    <el-popover trigger="hover" placement="top">
                        <p>中心城市: {{ scope.row.object}}</p>
                        <p>省份: {{ scope.row.object }}</p>
                        <div slot="reference" class="name-wrapper">
                        <el-tag size="medium">{{ scope.row.address }}</el-tag>
                        </div>
                </el-popover>
                </template>
            </el-table-column>
            <el-table-column
             align="center"
            label="用途"
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
export default {
    data(){
        return {
            loading: false,
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
        dataNum:[],//需要渲染的条数
        pagingnum: '',//一共有多少条
        tableData: []
        
        }
    },
    created () {
        this.getList()
    },
    computed: {

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
        // console.log(this.paginObj.pageSize)
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



