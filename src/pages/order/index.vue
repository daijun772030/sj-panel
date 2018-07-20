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
            :data="tableData"
            empty-text="没有新东西"
            v-loading="loading" 
            :default-sort = "{prop: 'condition', order: 'descending'}"
            element-loading-text="加载中..."
            style="
            height: calc(100% -60px)"
            class="home-table">

            <el-table-column
            align="center"
            label="订单号"
            >
            <template slot-scope="scope">
                <p>{{scope.row.orderNum}}</p>
            </template>
            </el-table-column>
            <el-table-column
            align="center"
            width="80px"
            label="姓名"
            >
            <template slot-scope="scope">
                <p style="color: red">{{scope.row.name}}</p>
            </template>
            </el-table-column>
            <el-table-column
            label="电话号码"
            align="center">
                <template slot-scope="scope">
                    <p>{{scope.row.phone}}</p>
                </template>
            </el-table-column>
            <el-table-column
             align="center"
            label="地址"
           >
            <template slot-scope="scope">
                <p>{{scope.row.textarea}}</p>
            </template>
            </el-table-column>
            <el-table-column
            align="center"
            label="物品详情">
                <template slot-scope="scope">
                <p>{{scope.row.details}}</p>
            </template>
            </el-table-column>
            <el-table-column
            align="center"
            label="付款时间"
            width="100px">
                <template slot-scope="scope">
                    <p>{{scope.row.time}}</p>
                </template>
                
            </el-table-column>
            <el-table-column
            align="center"
            label="付款方式">
                <template slot-scope="scope">
                    <p>{{scope.row.paymentMethod}}</p>
                </template>
            </el-table-column>
            <el-table-column
            label="标签价格(元 )"
            align="center"
            width="80px">
                <template slot-scope="scope">
                    <p>{{scope.row.price}}</p>
                </template>
            </el-table-column>
            <el-table-column
            align="center"
            label="实际价格(元)"
            width="70px">
            <template slot-scope="scope">
                <p>{{scope.row.price}}</p>
            </template>
            </el-table-column>
            <el-table-column
            align="center"
            label="客户备注">
            <template slot-scope="scope">
                <el-popover
                placement="bottom"
                title="客户备注详情:"
                width="200"
                trigger="hover"
                :content="scope.row.remark">
                    <el-button slot="reference">备注详情</el-button>
                </el-popover>
            </template>    
            </el-table-column>
            <el-table-column align="center"
            label="取送时间">
            <template slot-scope="scope">
                <p>{{scope.row.takeTime}}</p>
            </template>
            </el-table-column>
            <el-table-column
            label="状态"
            align="center">
                <template slot-scope="scope">
                    <p>{{scope.row.condition}}</p>
                </template>
            </el-table-column>
            <el-table-column
             align="center"
             width="200px"
             label="操作">
            <template slot-scope="scope">
                <el-button
                size="mini"
                @click="handleEdit(scope.$index, scope.row)">接单</el-button>
                <el-button
                size="mini"
                type="danger"
                @click="handleDelete(scope.$index, scope.row)">不接单</el-button>
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
        <el-dialog
            title="订单修改"
            :show-close="false"
            :visible.sync="centerDialogVis"
            :modal-append-to-body="false" 
            width="50%"
            center>
            <!-- <span>需要注意的是内容是默认不居中的</span> -->
            <el-form :model="myObject" label-width="100px" class="searchForm1" :inline="true">
                <el-form-item style="width: 40%"  label="订单号：">
                    <input v-model="myObject.orderNum" :disabled="true" type="text">
                </el-form-item>
                <el-form-item style="width: 40% " label="姓名：">
                    <input v-model="myObject.name" :disabled="true" type="text">
                </el-form-item>
                <el-form-item style="width: 40%" label="电话号码：">
                    <input v-model="myObject.phone" :disabled="true" type="text">
                </el-form-item>
                <el-form-item  style="width: 40% " label="地址：">
                    <!-- <input v-model="myObject.site" :disabled="true" type="text"> -->
                    <el-input type="textarea" :rows="2" placeholder="收货地址" v-model="myObject.textarea" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item  style="width: 40% " label="物品详情：">
                    <input v-model="myObject.details" :disabled="true" type="text">
                </el-form-item>
                <el-form-item  style="width: 40% " label="付款时间：">
                    <input v-model="myObject.time" :disabled="true" type="text">
                </el-form-item>
                <el-form-item  style="width: 40% " label="付款方式：">
                    <input v-model="myObject.paymentMethod" :disabled="true" type="text">
                </el-form-item>
                <el-form-item  style="width: 40% " label="标签价格：">
                    <input v-model="myObject.price" :disabled="true" type="text">
                </el-form-item>
                <el-form-item  style="width: 40% " label="实际价格：">
                    <input v-model="myObject.price" :disabled="true" type="text">
                </el-form-item>
                <el-form-item  style="width: 40% " label="客户备注：">
                    <!-- <input v-model="myObject.remark" :disabled="false" type="text"> -->
                    <el-input type="textarea" :rows="3" placeholder="客户备注" v-model="myObject.remark" :disabled="false"></el-input>
                </el-form-item>
                <el-form-item  style="width: 40% " label="取送时间：">
                    <input v-model="myObject.takeTime" :disabled="false" type="text">
                </el-form-item>
                <el-form-item  style="width: 40% " label="状态：">
                    <input v-model="myObject.condition" :disabled="false" type="text">
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
            <el-button @click="centerDialogVis= false">取 消</el-button>
            <el-button type="primary" @click="centerDialogVis = false">确 定</el-button>
            </span>
            <!-- <audio src="">播放</audio> -->
        </el-dialog>
    </div>
</template>
<script>
    import DjObject from './object.js';
    export default {
    data(){
        return {
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
        this.getList()
    },
    computed: {

    },
    methods: {
        //这里做列表的轮询。。查看是不是有新订单

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
        handleEdit (a,b) {//这个是点击编辑以后当前行的数据在input框中

            this.centerDialogVis = true;
            console.log(b)
            console.log(a)
            this.scopeIndex = a
            console.log(this.object[a])
            this.myObject =this.object[a]
            this.object[a]=this.myObject
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



