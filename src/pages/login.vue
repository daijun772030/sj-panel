<template>
  <div class="login">
    <el-row class="title">
      <el-col :span="10" class="login-form">
        <div class="grid-content bg-purple">
          <el-form :model="loginForm" :rules="loginRule" ref="loginForm" label-width="0">
            <el-row>
              <el-col>
                <el-form-item prop="phone">
                  <el-input type="text" placeholder="请输入用户名" v-model="loginForm.phone" auto-complete="off"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col>
                <el-form-item prop="password">
                  <el-input type="text" placeholder="请输入密码" v-model="loginForm.password" auto-complete="off"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col class="menus">
                <el-button class="loginBtn" type="primary" @click.stop="submitFrom('loginFrom')">登录</el-button>
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
        loginForm: {
          phone: "",
          password: ""
        },
        loginRule: {
          phone:[
            {required: true, message: "请输入用户名", trigger: "blur"}
          ],
          password: [
            {required: true, message: "请输入密码", trigger: "blur"},
            {min: 6,max:18, message: "请输入6-18位密码", trigger: "blur"}
          ]
        }
      }
    },
    created: function () {
      this.login ()
    },
    mounted: function () {
    },
    methods: {
     login () {
       this.$api("logPwd",{phone:'13666288963'~,password:'qweasd'}).then((data)=>{
         console.log(data)
       })
     }
    }
  }
</script>
<style long="less" scope>
  .login {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        overflow: hidden;
        background: url("~/static/images/login_bg.png") top center;
        background-size: cover;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .login-header {
        background: #3e4d5c;
        padding: 20px;
    }
    .valiimg {
        text-align: right;
    }
    .valiimg img {
        width: 100%;
    }
    .login-form {
        width: 257px;
    }
    .login .title {
        position: absolute;
        top: 20px;
        left: 10rem;
        text-align: center;
        color: #abd0aa;
        font-size: 46px;
    }
    .login-form .input-body {
        line-height: 35px;
        margin: 20px 0;
    }
    .login-form .label-title {
        text-align: right;
        padding-right: 20px;
    }
    .login-form img {
        height: 35px;
    }
    .login-form .last-margin {
        margin-bottom: 0px !important;
    }
    .login-form .menus {
        text-align: center;
    }
    .loginBtn {
        width: 100%;
    }
    .login-form .lxwm {
        margin-top: 100px;
        text-align: center;
    }
    .login-form .lxwm button {
        font-size: 16px;
        color: #fff;
    }
    .forgetPass {
        text-align: right;
        font-size: 14px;
    }
    .wecloeme {
        text-align: right;
        color: #fff;
    }
    .forget-pass {
        position: relative;
        top: -10px;
        margin: 0px 0px 10px !important;
    }
    .login-form .border-bottom {
        margin-bottom: 20px;
    }
    .remenber {
        color: #ded8d8;
    }
    .title img {
        height: 60px;
        vertical-align: text-bottom;
        margin-right: 15px;
    }
    .el-form-item{
        margin-bottom: 20px;
    }
</style>
