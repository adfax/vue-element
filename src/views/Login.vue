<template>
  <div class="login">
    <el-form ref="formname" :model="form" class="container" :rules="rules">
        <el-form-item>
          <div class="avatar">
            <img src="../assets/1.jpg" alt="">
          </div>
        </el-form-item>
        <el-form-item prop='username'>
          <el-input v-model="form.username" placeholder="账号" prefix-icon="el-icon-mobile-phone"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input v-model="form.password" placeholder="密码" prefix-icon="el-icon-goods" type="password" @keydown.native.enter="loginbtn('formname')"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" class="login-btn" @click="loginbtn('formname')">主要按钮</el-button>
        </el-form-item>
    </el-form>
  </div>
</template>

<script>
// import {checkUser} from '@/api/index'
import {loginT} from '@/api'
export default {
  data: () => ({
    form: {
      username:'',
      password:''
    },
    rules:{
      username:[
        {required:true,message:'请输入用户名',trigger:'blur'}
      ],
      password:[
        {required:true,message:'请输入密码',trigger:'blur'}
      ]
    }
  }),
  methods:{
    loginbtn(formname){
     this.$refs[formname].validate(valide => {
          if (valide) {
            loginT(this.form).then(res=>{
                if(res.meta.status===200){
                  //将token 存入localStorge中
                  localStorage.setItem('mytoken',res.data.token)
                  this.$store.commit('setusername',res.data.username)
                  //跳转到登录页面
                  this.$router.push({name:'Home'})
                }else{
                  this.$message({
                    type:'error',
                    message:res.meta.msg
                  })
                }       
            })
          } else {
            console.log('error submit!!');
            return false;
          }
        });
    }
  }
};
</script>

<style lang='scss' scoped>
  .login {
    position: fixed;
    width:100%;
    height: 100%;
    background-color: #2f4050;

    .container {
      position: absolute;
      left: 0;
      right: 0;
      width: 400px;
      padding: 0 40px 15px 40px;
      margin: 200px auto;
      background-color: #fff;
      .avatar {
        position: relative;
        left: 50%;
        width: 120px;
        height: 120px;
        margin-left: -60px;
        margin-top: -60px;
        box-sizing: border-box;
        border-radius: 50%;
        border:10px solid #fff;
        box-shadow: 0 1px 5px #ccc;
        overflow: hidden;
      }
      .login-btn {
        width: 100%;
      }
    }
  }
</style>