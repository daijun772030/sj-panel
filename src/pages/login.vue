<template>
    <div class="login">
      <el-row>
        <el-col :span="24">
          <img src="~/static/images/logo.png">尚洁科技
        </el-col>
      </el-row>
      <el-row class="login-body">
        <el-col :span="10" class="login-form">
          <div>
            <el-form >
              <el-row>
                <el-col>
                  <el-form-item>
                    <el-input placeholder="请输入用户名"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col>
                  <el-form-item>
                    <el-input placeholder="密码"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col>
                  <el-button type="primary">登录</el-button>
                </el-col>
              </el-row>
            </el-form>
          </div>
        </el-col>
      </el-row>
    </div>
</template>
<script>
export default {
  data () {
     return {
       
     }
  } 
}
</script>
<style long="less" scoped>
  .login{
    position: absolute;
    top: 0;
    left:0;
    right:0;
    bottom: 0;
    overflow:hidden;
    background:url("~/static/images/login_bg.png") top center;
    background-size:cover;
    display: flex;
    justify-content: center;
    align-items:center;
  }
  .login-body{
    margin:0 20px;
    background-color: black;
    font-size: 100%;
  }
  /* .login-body{
      line-height:35px;
      margin:20px 0;

    } */
</style>
<style long="less">

</style>



