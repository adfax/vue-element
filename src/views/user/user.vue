<template>
  <div class="user">
    <el-row>
      <el-col :span='24'>
        <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>用户管理</el-breadcrumb-item>
          <el-breadcrumb-item>用户列表</el-breadcrumb-item>
        </el-breadcrumb>
      </el-col>
    </el-row>


    <el-row>
      <el-col :span='24'>
        <el-input placeholder="请输入内容" class="search-input" v-model="query" @keydown.native.enter="list()">
            <el-button slot="append" icon="el-icon-search" @click='list()'></el-button>
        </el-input>
        <el-button type="success" plain @click="addFormVisible = true">添加用户</el-button>
      </el-col>
    </el-row>


      <el-table
        :data="userList"
        border
        style="width: 100%">
        <el-table-column
          type="index"
          width="50">
        </el-table-column>
        <el-table-column
          prop="username"
          label="姓名"
          width="180">
        </el-table-column>
        <el-table-column
          prop="email"
          label="邮箱"
          width="180">
        </el-table-column>
        <el-table-column
          prop="mobile"
          label="电话">
        </el-table-column>
        <el-table-column label="用户状态">
          <template slot-scope="scope">
        <el-switch
        v-model="scope.row.mg_state" @change='changeuserstate(scope.row)'>
        </el-switch>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button sizi="mini" class="el-icon-edit" type="primary" plain></el-button>
            <el-button sizi="mini" class="el-icon-delete" type="danger" plain></el-button>
            <el-button sizi="mini" class="el-icon-check" type="warning" plain></el-button>
          </template>
        </el-table-column>
      </el-table>


        <div class="page">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="1"
            :page-sizes="[1, 2, 3, 4]"
            :page-size="100"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total">
          </el-pagination>
        </div>





<!-- 添加表单 -->
        <el-dialog title="收货地址" :visible.sync="addFormVisible">
          <el-form :model="addForm" label-width="80px" :rules="rules">
            <el-form-item label="用户名" prop='username'>
              <el-input v-model="addForm.username" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop='password'>
              <el-input v-model="addForm.password" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="邮箱" prop="email">
              <el-input v-model="addForm.email" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="电话" prop="mobile">
              <el-input v-model="addForm.mobile" auto-complete="off"></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
          </div>
        </el-dialog>
  </div>
</template>

<script>
import {userList,changeUserState} from '@/api'
export default {
  data: () => ({
     userList: [],
     pagesize:1,
     pagenum:1,
     query:'',
     total:0,
     addFormVisible:false,
     addForm:{
       username:'',
       password:'',
       email:'',
       mobile:''
     },
     rules:{
       username:[
         {requierd:true,message:'请输入用户名',trigger:'blur'}
       ],
       password:[
         {requierd:true,message:'请输入密码',trigger:'blur'}
       ],
       email:[
         {requierd:true,message:'请输入邮箱地址',trigger:'blur'},
          {type:'email',message:'请输入正确的邮箱地址',trigger:'blur,change'}
       ],
       mobile:[
         {requierd:true,message:'电话不能为空'}
       ]
     }
  }),
  created(){
    this.list()
  },
  methods: {
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.pagesize=val
      this.list()
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.pagenum=val
      this.list()
    },
    list(){
      userList({params:{query:this.query,pagenum:this.pagenum,pagesize:this.pagesize}}).then(res=>{
        console.log(res);
        this.userList=res.data.users
        this.total=res.data.total
      })
    },
    changeuserstate(row){
      console.log(row);
      changeUserState({uid:row.id,type:row.mg_state}).then(res=>{
        console.log(res);
        if(res.meta.status===200){
          this.$message({
          message: '设置成功',
          type: 'success'
        });
        }else {
          this.$message({
          message: res.meta.msg,
          type: 'warning'
        });
        }
      })
    }
  },
};
</script>

<style lang='scss' scoped>
  .user {
   .el-breadcrumb {
      background-color: #d3dce6;
      height: 45px;
      font-size: 15px;
      padding-left: 10px;
      line-height: 45px;
      margin-bottom: 15px;
    }
    .search-input {
      width: 300px;
    }
    .page {
      padding: 5px 0;
      background-color: #d3dce6;
    }
  }
</style>