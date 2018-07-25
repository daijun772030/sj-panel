<template>
    <div class="goods">
      <el-form :inline="true" :model="searchObj" label-width="5px" size="mini"  class="searchForm">
        <!-- <el-form-item class="float_left">
            <el-input v-model="searchObj.searchKey" placeholder="搜索" clearable prefix-icon="el-icon-search" style="width:217px"></el-input>
        </el-form-item> -->
        <!-- <el-form-item class="float_left">
          <el-date-picker type="date" clearable placeholder="选择上传时间" v-model="searchObj.createDay" class="wd"></el-date-picker>
        </el-form-item>
        <el-form-item class="float_left">
          <el-date-picker type="date" clearable placeholder="选择上传时间" v-model="searchObj.updateDay" class="wd"></el-date-picker>
        </el-form-item> -->
        <el-form-item class="float_left">
          <el-select v-model="searchObj.productType" placeholder="商品类型" @change="changeValue" clearable>
            <el-option v-for="channel in productTypes" :key="channel.id" :label="channel.name" :value="channel.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item class="float_left">
            <el-button @click="earchForm" type="primary">确定</el-button>
        </el-form-item>
        <el-form-item class="float_right">
          <el-button type="primary" @click="add">添加商品</el-button>
        </el-form-item>
      </el-form>

      <el-table class="goods-table" height="calc(100% - 105px)" border :data="list1">
        <el-table-column prop="name" label="商品名称" align="center" ></el-table-column>
        <el-table-column prop="upName" label="商品类型" align="center"></el-table-column>
        <el-table-column prop="img" label="商品logo" align="center"></el-table-column>
        <el-table-column prop="price" label="商品价格" align="center"></el-table-column>
        <!-- <el-table-column prop="putawayState" label="是否上架" align="center">
          <template slot-scope="scope">
            <span v-if="scope.row.putawayState === '1'">已上架</span>
            <span v-else>未上架</span>
          </template>
        </el-table-column> -->
        <!-- <el-table-column prop="upData" label="上传时间" align="center"></el-table-column>
        <el-table-column prop="endData" label="最后编辑时间" align="center"></el-table-column> -->
        <el-table-column label="操作" align="center" width="200">
          <template slot-scope="scope">
            <el-button type="text" size="mini" @click="edit(scope)">编辑</el-button>
            <el-button type="text" size="mini">删除</el-button>
            <el-button v-if="scope.row.putawayState === '1' " type="text" size="mini" @click="status(scope.row)">上架</el-button>
            <el-button v-if="scope.row.putawayState === '0' " type="text" size="mini" @click="status(scope.row)">下架</el-button>
          </template>  
        </el-table-column>
      </el-table>
      <el-dialog :modal-append-to-body="false" :title="title" center :visible.sync="dialogVisible" :show-close="false" width="900px">
        <el-form :inline="false" :model="addform" label-width="100px" class="searchform" >
          <el-form-item label="商品类型：" class="uniq">
            <el-select v-model="addform.productType" placeholder="请选择商品得类型" @change="changeValue1" :disabled="disable" clearable>
              <el-option  v-for="item in productTypes" :key="item.id" :label="item.name" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="商品名称：" class="uniq">
            <el-select v-model="addform.listName" placeholder="请选择商品" @change="myValue" :disabled="disable" clearable>
              <el-option v-for="item in addShop" :key="item.id" :label="item.name" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
          <!-- <el-form-item label="商品logo：" class="uniq">
            <div><img src="" alt=""></div>
          </el-form-item> -->
          <el-form-item label="商品价格：" prop="price" class="uniq">
            <el-input width='100' type="text" placeholder="请输入商品定价金额" v-model="addform.price">
              <template slot="append">元</template>
            </el-input>
          </el-form-item>
          <el-form-item label="是否上架:" class="uniq">
            <el-radio v-model="addform.putawayState" :label="1">是</el-radio>
            <el-radio v-model="addform.putawayState" :label="0">否</el-radio>
          </el-form-item>
          <el-form-item label="是否上架:" class="uniq">
            <div><img src="" alt=""></div>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="close(addform)">取消</el-button>
          <el-button type="primary" @click="save(addform)">保存</el-button>
        </span>
      </el-dialog>
      <!-- 这里是分页功能 -->
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
  // import GoodsObj from './goods1.js'
  export default {
    data () {
      return {
        disable:false,//是否禁用select框
        dialogVisible: false,
        title: null,
        searchObj: {
          createDay: null,
          searchContent: null,
          sortField: null,
          sortOrder: null,
          updateDay: null,
          topicalName: null,
          channelId: null,
          productType: null,
          pageNum: 1,
          pageSize: 10,
          totalCount:0
        },
        higherup:null, //搜索框需要传递的参数
        shopId:null,
        addform: {
          productTypes:[],
          classify: null,
          goodsName:null,
          goodsLogo: null,
          producType: null,
          price: null,
          listName:null,
          putawayState: 0,
          upData: null,
          endData: null
        },
         addShop:[],
        productTypes: [],
        list1:[]
      }
    },
    created () {
      // this.allshop()
      // this.addshop();
      this.ces();
      // this.delshop()
      // this.typeid()
      // this.upshop()
      this.status()
    },
    methods: {
      //这里是添加商品的函数
      changeValue1(value) {
        this.changeValue(value)
        this.typeid()
      },
       save (addform) {//保存
       var price = addform.price
        this.$api('addshop',{typeid:this.shopId,price:price}).then((res)=>{
          console.log( res);
          this.dialogVisible = false;
        });
      },
      close (addform) {//取消的时候数据消失
        this.dialogVisible = false;
      },

      changeValue (value) {//这里获取搜索框的id
        var obj={};
        obj = this.productTypes.find((item)=>{
          return item.id == value
        });
         this.higherup = value
         console.log(this.higherup)
         console.log(obj)
      },
      myValue (value) {
        console.log(value)
        var obj ={};
        obj = this.addShop.find((item)=>{
          return item.id ==value
        });
        this.shopId = value;
        console.log(obj)
      },
      status () {//查询一级菜单函数
        this.$api('typeStatus',{params:{status:"1"}}).then ((res)=>{
          console.log(res.data.data)
          this.productTypes = res.data.data
        })
      },
      typeid (){
        this.addShop = null;      //查询一级下单栏
        this.$api('typeFind',{params:{id:this.higherup}}).then((res)=>{
          console.log(res)
          this.addShop = res.data.data
        })
      },
      earchForm () {       //搜索框搜索内容的
         this.$api("myshop",{params:{pageNum:this.searchObj.pageNum,pageSize:this.searchObj.pageSize,higherup:this.higherup}}).then((res)=>{
           var list = res.data.data.list;
          this.searchObj.pageNum = res.data.data.pageNum || 1;  
          this.searchObj.pageSize = res.data.data.pageSize;
          this.searchObj.totalCount = res.data.data.total;
          this.list1 = list;
         })
      },  
      ces (){ //查询所有商品(模版)
        // debugger;
        this.$api("myshop",{params:{pageNum:this.searchObj.pageNum,pageSize:this.searchObj.pageSize}}).then((res)=>{
          console.log(res.data)
          var list = res.data.data.list;
          this.searchObj.pageNum = res.data.data.pageNum || 1;  
          this.searchObj.pageSize = res.data.data.pageSize;
          this.searchObj.totalCount = res.data.data.total;
          this.list1 = list;
        })
      },
      handleSizeChange (val) {   //点击每页多少条的时候触发的函数(end)
        // debugger;
        this.searchObj.pageSize = val
        this.ces()
      },
      handleCurrentChange (val) { //点击前往第几页的时候触发的函数(end)
        this.searchObj.pageNum = val;
        this.ces();
      },
      upshop () { //修改商品
        this.$api('upshop',{id:'2',price:'34'}).then((res)=>{
          console.log(res)
        })
      },
      // addshop () {        //添加商品
      //   // debugger;
      //   this.$api('addshop',{typeid:'7',price:'36'}).then((res)=>{
      //     console.log( res)
      //   })
      // },
      // delshop () {       //删除商品
      //   this.$api('delshop',{id:'1'}).then((res)=>{
      //     console.log(res)
      //   })
      // },
      
     
      add () {       //添加商品函数
      this.disable = false
        this.title = "添加商品"
        this.dialogVisible = true
      },
      edit (myCode) {        //编辑商品
        this.dialogVisible = true;
        this.disable = true
        this.addform.price = myCode.row.price
        console.log(myCode.row);
        this.addShop[myCode.$index] = myCode.row
        

        this.title = '编辑商品';
        
      },
      //上下架状态
      // status (row) {
      //   let message = row.putawayState === "1" ? "上架" : "下架";
      //   // let url = row.putawayState === '0';
      //   this.$confirm(`是否确定${message}该商品？`, '提示', {
      //     confirmButtonT: '确定',
      //     concelButtonText: '取消',
      //     type: 'warning',
      //     closeOnClickModal: false
      //   }).then(()=> {
      //     this.$message ({
      //       type: "success",
      //       message:`${message}成功`
      //     })
      //   }).catch(()=> {
      //     this.$message ({
      //       type: 'info',
      //       message:`已经取消${message}该商品？`
      //     })
      //   })
      // },
      
    },
    computed: {
    } 
  }
</script>
<style long="less">
  .goods{
        width: 100%;
        height:100%;
        text-align: center;
        color: black;
        color: rgba(0, 0, 0, 0.349)
    }
    .searchForm{
        padding: 10px;
    }
  .uniq {
    width: 50%;
    float: left !important;
    }
  .el-form-item__label {
    float: none;
    width: 300px !important;
  }
  .el-form-item__content {
    margin-left: 0 !important;
  }
    .el-input {
      width: 90% !important;
    }
    .el-select {
      width: 90% !important;
    }
      .el-input {
        width: 100% !important;
      }
    .radio {
      width: 90% !important;
    }
</style>

