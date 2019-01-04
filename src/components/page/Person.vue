<template>
  <div class="person">
    <el-card>
      <div class="user-main">
        <div class="user-title">我的账户</div>
        <div class="user-content">
          <p>基本信息</p>
          <el-form label-width="100px" :model="form" ref="form">
            <el-form-item label="账号">
              <el-input disabled v-model="form.userName"></el-input>
            </el-form-item>
            <el-form-item label="头像">
              <div class="user-img">
                <!-- <img :src="form.profilePhoto===undefined && form.profilePhoto=== ''?require('../../assets/logo.png'):form.profilePhoto" alt width="148px" > -->
                <img :src="form.profilePhoto" alt width="148px">
                <!-- <p v-else>1111</p> -->
              </div>

              <input
                class="file"
                name="file"
                type="file"
                accept="image/png, image/gif, image/jpeg"
                @change="changeImage($event)"
              >
            </el-form-item>
            <el-form-item label="昵称">
              <el-input v-model="form.nickname"></el-input>
            </el-form-item>
            <el-form-item label="原密码">
              <el-input v-model="form.oldPassword"></el-input>
              <i class="red"><i>* </i> 修改请输入原密码</i>
            </el-form-item>
            <el-form-item label="新密码">
              <el-input v-model="form.password"></el-input>
              <i class="red"><i>* </i> 修改密码，请输入新密码</i>
            </el-form-item>
            <el-form-item label="邮箱">
              <el-input v-model="form.email"></el-input>
            </el-form-item>
            <el-form-item label="账户类型">
              <el-input disabled v-model="form.role"></el-input>
              <!-- 主管 报告员 管理员 财务人员 财务主管 -->
            </el-form-item>
            <el-form-item>
              <el-button @click="upfile">修改</el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
import { _userinfo, _updateuser } from "../../services/service.js";
import Axios from "axios";
export default {
  data() {
    return {
      form: {
        userName: "", //账号
        profilePhoto: '', // 头像
        nickname: "", // 昵称
        oldPassword:'', // 原密码
        password: "", // 新密码
        email: "", // 邮箱
        role: "" // 身份权限
      },
      dialogImageUrl: "",
      dialogVisible: true
    };
  },
  created() {
    this.getuserinfo();
  },
  methods: {
    getuserinfo() {
      _userinfo()
        .then(res => {
          console.info(res);
          this.form = res.data;
          
        })
        .catch(err => {
          console.info(err);
        });
    },
    changeImage(e) {
      let file = e.target.files[0];
      let reader = new FileReader();
      let that = this;
      reader.readAsDataURL(file);
      // console.info(res)
      reader.onload = function(e) {
        that.form.profilePhoto = this.result;
        console.info(this.result)
      };
    },
    upfile() {
      console.info(11);
      console.info(JSON.stringify(this.form));
      _updateuser(this.form)
        .then(res => {
          console.info(res);
          
          if (res.status===205) {
            this.$message({
            showClose: true,
            message: "修改错误！！！",
            type: "err"
          });
          }
          this.$nextTick(() => {
            
            this.$message({
            showClose: true,
            message: "修改成功！！！",
            type: "success"
          });
          this.$router.push("/person");

          });
        })
        .catch(err => {
          this.$refs["form"].resetFields();
          this.$message({
            showClose: true,
            message: "修改错误！！！",
            type: "error"
          });
        });
    }
  }
};
</script>

<style lang="less" scoped>
.person-left-sidebar {
  padding: 10px 0;
}
.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}
.user-main {
  padding: 10px 0;
  background: #fff;
  font-size: 14px;
  background: #fff;
  font-size: 14px;
  width: 800px;
  margin: 0 auto;
}
.user-title {
  margin-top: -10px;
  margin-bottom: 30px;
  color: #409eff;
  font-size: 20px;
  line-height: 25px;
  border-left: 12px solid #409eff;
  padding-left: 21px;
  padding-bottom: 10px;
  border-bottom: 1px solid #ddd;
  font-weight: bold;
}
.user-content {
  p {
    padding-bottom: 10px;
    border-bottom: 1px solid #ddd;
    font-size: 16px;
  }
  .el-form {
    margin: 20px 0;
    .user-img {
      width: 150px;
      height: 150px;
      padding: 2px;
      // line-height: 1;
      img {
        width: 148px;
        height: 148px;
      }
    }
  }
}
.red{
  color: red;
  font-size: 12px;
  font-style: inherit;
}
</style>
