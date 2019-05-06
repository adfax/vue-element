<template>
    <div class="home">
      <el-container>
        <el-aside width="auto">
          <div class="log">
            后台管理
          </div>
          <el-menu
            class="el-menu-admin"
            :router='true'
            :collapse="isCollapse"
            @open="handleOpen"
            @close="handleClose"
             background-color="#545c64"
            text-color="#fff"
            active-text-color="#ffd04b">
            <el-submenu index='1'>
              <template slot="title">
                <i class="el-icon-location"></i>
                <span>用户管理</span>
              </template>
                <el-menu-item index="/user">
                    <i class="el-icon-menu"></i>
                    <span slot="title">用户列表</span>
                </el-menu-item>
            </el-submenu>

          </el-menu>
        </el-aside>
        <el-container>
          <el-header>
            <i class="el-icon-tickets" @click="dianji"></i>
            <div class="biaoti">后台管理系统</div>
            <div class="tuichu">
              <span>你好，{{$store.getters.username}}</span>
              <el-button type="text" @click="logout">退出</el-button>
            </div>
          </el-header>
          <el-main>
            <router-view></router-view>
          </el-main>
        </el-container>
      </el-container>
    </div>
</template>

<script>
export default {
  data: () => ({
    isCollapse:false
  }),
  methods:{
    handleOpen(key ,keypath){
      console.log(key,keypath);
    },
    handleClose(key ,keypath){
      console.log(key,keypath);
    },
    dianji(){
      this.isCollapse=!this.isCollapse
    },
    logout(){
      localStorage.removeItem("mytoken")
      this.$router.push({name:'Login'})
    }
  }
};
</script>

<style lang='scss' scoped>
  .home {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    .el-menu-admin:not(.el-menu--collapse) {
      width: 200px;
      min-height: 400px;
    }
    .el-container {
      width: 100%;
      height: 100%;
    }
    .el-aside {
      height: 100%;
      background-color: #535B64;
    }
    .el-header {
    background-color: #535B64;
    height: 60px;
    line-height: 60px;
    text-align: center;
    .el-icon-tickets {
      font-size: 30px;
      color: #ccc;
      float: left;
     margin-top: 15px;
    }
    .biaoti {
      display: inline;
      text-align: center;
      color: #fff;
      font-size: 30px;
    }
    .tuichu {
      display: inline;
      float: right;
      span {
        color: #fff;
        font-size: 18px;
      }
    }
    }
    .log {
      height: 60px;
      font-size: 22px;
      text-align: center;
      line-height: 60px;
      color: #fff
      
    }
  
  }
</style>