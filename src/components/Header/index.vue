<template>
    <div class="head">
            <!-- <div>
                <img src="~/static/images/logo.png" alt="">
            </div> -->
            <p style="text-aligin: center">营业状态：</p>
        <el-form class="earchForm">
            <el-form-item  prop="region">
                <el-select v-model="object.region" placeholder="营业状态">
                <el-option label="营业中" value="shanghai"></el-option>
                <el-option label="休息中" value="beijing"></el-option>
                </el-select>
            </el-form-item>
        </el-form>
        <el-dropdown class="head-option" @command="handler">
            <span class="el-dropdown-link">
                {{status}}<i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="loginout">注销</el-dropdown-item>
                <el-dropdown-item command="modifyPassword">修改个人信息</el-dropdown-item>
            </el-dropdown-menu>
        </el-dropdown>
        <audio v-if="true" src=""></audio>
        <el-dialog :modal-append-to-body="false" @close="close(addForm)" :title="title" center :visible.sync="dialogVisible" :show-close="false" width="900px">
            
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancel" type="primary">取消</el-button>
        <el-button @click="save" type="primary">保存</el-button>
      </span>
    </el-dialog>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                dialogVisible:false,
                object: {
                    region: ""
                },
                activeIndex : "1",
                status : "操作"
            }
        },
        methods : {
            handler(option) {
                switch(option) {
                    case "loginout" : this.loginout(); break;
                    case "modifyPassword" : this.modifyPassword(); break;
                }
            },
            loginout() {
                // debugger;
            this.$api('cancellation').then((res)=>{
                if(res.data.retCode==-200){
                    this.$router.replace({ path : '/login' });
                }
                console.log(res)
            })
            },
            modifyPassword() {
                this.dialogVisible= true;
            }
        }
    }
</script>

<style lang="less" scoped>
.head{
    box-sizing: border-box;
    width: 100%;
    height: 50px;
    padding: 0 15px;
    overflow: hidden;
    display: flex;
    flex-flow: row nowrap;
    justify-content: flex-end;
    align-items: center;
    box-shadow: 0 5px 10px -2px #ccc;
    &-option{
        cursor: pointer;
    }
    .earchForm {
        margin-bottom: 0;
    }
    .el-form-item,.el-form-item--mini{
        margin: 0 50px 0 5px ;
    }
    
}
</style>

