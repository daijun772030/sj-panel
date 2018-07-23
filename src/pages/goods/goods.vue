<template>
    <div class="goods">
       <el-form :inline="true" :model="searchObj" label-width="5px" size="mini"  class="searchForm">
            <el-form-item class="float_left">
                <el-input v-model="searchObj.searchKey" placeholder="搜索" clearable prefix-icon="el-icon-search" style="width:217px"></el-input>
            </el-form-item>
            <!-- <el-form-item class="float_left">
              <el-date-picker type="date" clearable placeholder="选择上传时间" v-model="searchObj.createDay" class="wd"></el-date-picker>
            </el-form-item>
            <el-form-item class="float_left">
              <el-date-picker type="date" clearable placeholder="选择上传时间" v-model="searchObj.updateDay" class="wd"></el-date-picker>
            </el-form-item> -->
            <el-form-item class="float_left">
              <el-select v-model="searchObj.productType" placeholder="商品类型" clearable>
                <el-option v-for="channel in productTypes" :key="channel.productType" :label="channel.productName" :value="channel.productType">
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
        <el-table class="goods-table" height="calc(100% - 105px)" border :data="list">
          <el-table-column prop="goodsName" label="商品名称" align="center" ></el-table-column>
          <el-table-column prop="producType" label="商品类型" align="center"></el-table-column>
          <el-table-column prop="goodsLogo" label="商品logo" align="center"></el-table-column>
          <el-table-column prop="price" label="商品价格" align="center"></el-table-column>
          <el-table-column prop="putawayState" label="是否上架" align="center">
            <template slot-scope="scope">
              <span v-if="scope.row.putawayState === '1'">已上架</span>
              <span v-else>未上架</span>
            </template>
          </el-table-column>
          <!-- <el-table-column prop="upData" label="上传时间" align="center"></el-table-column>
          <el-table-column prop="endData" label="最后编辑时间" align="center"></el-table-column> -->
          <el-table-column label="操作" align="center" width="200">
            <template slot-scope="scope">
              <el-button type="text" size="mini" @click="edit(scope.row.classify)">编辑</el-button>
              <!-- <el-button type="text" size="mini">删除</el-button> -->
              <el-button v-if="scope.row.putawayState === '1' " type="text" size="mini" @click="status(scope.row)">上架</el-button>
              <el-button v-if="scope.row.putawayState === '0' " type="text" size="mini" @click="status(scope.row)">下架</el-button>
            </template>  
          </el-table-column>
        </el-table>
        <el-dialog :modal-append-to-body="false" :title="title" center :visible.sync="dialogVisible" :show-close="false" width="900px">
          <el-form :inline="false" label-width="100px" class="searchform" :model="addform">
            <el-form-item label="商品类型：" prop="productType" class="uniq">
              <el-select v-model="addform.productType" placeholder="请选择商品得类型">
                <el-option v-for="item in productTypes" :key="item.productType" :label="item.productName" :value="item.productType"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="商品名称：" prop="productType" class="uniq">
              <el-select v-model="addform.productType" placeholder="请选择商品">
                <el-option v-for="item in productTypes" :key="item.productType" :label="item.productName" :value="item.productType"></el-option>
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
    </div>
</template>
<script>
  import GoodsObj from './goods1.js'
  export default {
    data () {
      return {
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
          pageSize: 15,
          totalCount: 0
        },
        addform: {
          productTypes:[],
          classify: null,
          goodsName:null,
          goodsLogo: null,
          producType: null,
          price: null,
          putawayState: 0,
          upData: null,
          endData: null
        },
        productTypes: [
          { productType: 1, productName: "上衣" },
          { productType: 2, productName: "裤子/裙装" },
          { productType: 3, productName: "皮草" },
          { productType: 4, productName: "配件" },
          { productType: 5, productName: "床上用品" },
          { productType: 6, productName: "鞋" },
          { productType: 7, productName: "包" },
          { productType: 8, productName: "套装" }
        ],
        list:GoodsObj.list
      }
    },
    created () {
      // this.allshop()
      this.addshop();
      this.ces();
      this.delshop()
      this.typeid()
      this.upshop()
    },
    methods: {
      //弹窗修改和新增后的保存/取消
      //查询商品
      // allshop () {
      //   this.$api('upshop',{id:'1',price:'1'}).then((data)=>{
      //     console.log(data)
      //   })
      // },
      //查询一级下单栏
      upshop () {
        this.$api('upshop',{id:'1',price:'34'}).teh((res)=>{
          console.log(res)
        })
      },
      typeid (){
        this.$api('typeFind',{id:'1'}).then((res)=>{
          console.log(res)
        })
      },
      addshop () {
        // debugger;
        this.$api('addshop',{typeid:'7',price:'36'}).then((res)=>{
          console.log(res)
        })
      },
      delshop () {
        this.$api('delshop',{id:'1'}).then((res)=>{
          console.log(res)
        })
      },


      close (addform) {
        this.dialogVisible = false;
      },
      save () {//保存

      },
      //测试代码
      ces (){
        // debugger;
        this.$api("myshop",{pageNum:'1',pageSize:'1'}).then((res)=>{
          console.log(res)
        })
      },
      //添加商品
      add () {
        this.title = "添加商品"
        this.dialogVisible = true
      },
      //编辑商品
      edit (myCode) {
        this.dialogVisible = true;
        this.title = '编辑商品';
        
      },
      //上下架状态
      status (row) {
        let message = row.putawayState === "1" ? "上架" : "下架";
        // let url = row.putawayState === '0';
        this.$confirm(`是否确定${message}该商品？`, '提示', {
          confirmButtonT: '确定',
          concelButtonText: '取消',
          type: 'warning',
          closeOnClickModal: false
        }).then(()=> {
          this.$message ({
            type: "success",
            message:`${message}成功`
          })
        }).catch(()=> {
          this.$message ({
            type: 'info',
            message:`已经取消${message}该商品？`
          })
        })
      },
      earchForm () {
        console.log("戴军")
      }
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

