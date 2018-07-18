<template>
    <div class="goods">
       <el-form :inline="true" :model="searchObj" label-width="5px" size="mini"  class="searchForm">
            <el-form-item class="float_left">
                <el-input v-model="searchObj.searchKey" placeholder="搜索" clearable prefix-icon="el-icon-search" style="width:217px"></el-input>
            </el-form-item>
            <el-form-item class="float_left">
              <el-date-picker type="date" clearable placeholder="选择上传时间" v-model="searchObj.createDay" class="wd"></el-date-picker>
            </el-form-item>
            <el-form-item class="float_left">
              <el-date-picker type="date" clearable placeholder="选择上传时间" v-model="searchObj.updateDay" class="wd"></el-date-picker>
            </el-form-item>
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
              <el-button type="primary">添加商品</el-button>
            </el-form-item>
        </el-form>
        <el-table class="goods-table" height="calc(100% - 105px)" border :data="list">
          <el-table-column prop="goodsName" label="商品名称" align="center" ></el-table-column>
          <el-table-column prop="producType" label="商品类型" align="center"></el-table-column>
          <el-table-column prop="goodsLogo" label="商品logo" align="center"></el-table-column>
          <el-table-column prop="price" label="商品价格" align="center"></el-table-column>
          <el-table-column prop="putawayState" label="是否上架" align="center">
            <template slot-scope="scope">
              <span v-if="scope.row.putawayState === '1' ">已上架</span>
              <span v-else>未上架</span>
            </template>
          </el-table-column>
          <el-table-column prop="upData" label="上传时间" align="center"></el-table-column>
          <el-table-column prop="endData" label="最后编辑时间" align="center"></el-table-column>
          <el-table-column label="操作" align="center" width="200">
            <template slot-scope="scope">
              <el-button type="text" size="mini">编辑</el-button>
              <el-button type="text" size="mini">删除</el-button>
              <el-button v-if="scope.row.putawayState === '1' " type="text" size="mini">上架</el-button>
              <el-button v-if="scope.row.putawayState === '0' " type="text" size="mini">下架</el-button>
            </template>  
          </el-table-column>
        </el-table>
        <!-- <el-dialog :title="title" :show-close="false" width="900px" @close="close('addFrom')" @open="dialogOpen">

        </el-dialog> -->
    </div>
</template>
<script>
  import GoodsObJ from './goods.js'
  export default {
    data () {
      return {
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
        list:GoodsObJ.list
      }
    },
    created () {

    },
    methods: {
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
</style>

