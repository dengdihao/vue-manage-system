<template>
  <div class="login-wrap">
    <div class="ms-login">
      <div class="ms-title">后台管理系统</div>
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="0px" class="ms-content">
        <el-form-item prop="userName">
          <el-input type="text" v-model="ruleForm.userName" placeholder="username">
            <el-button slot="prepend" icon="el-icon-lx-people"></el-button>
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            type="password"
            placeholder="password"
            v-model="ruleForm.password"
            @keyup.enter.native="submitForm('ruleForm')"
          >
            <el-button slot="prepend" icon="el-icon-lx-lock"></el-button>
          </el-input>
        </el-form-item>
        <div class="login-btn">
          <el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
        </div>
        <div class="login-btn">
          <el-button type="primary" @click="register()">注册</el-button>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script>
import { _loginpost, _userinfo } from "../../services/service.js";
import store from "./../../store/store.js";

export default {
  data: function() {
    return {
      ruleForm: {
        userName: "",
        password: ""
      },
      rules: {
        userName: [
          {
            type: "string",
            required: true,
            message: "请输入用户名",
            trigger: "blur"
          }
        ],
        password: [
          {
            type: "string",
            required: true,
            message: "请输入密码",
            trigger: "blur"
          }
        ]
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          console.info(this.ruleForm)
          _loginpost(this.ruleForm)
            .then(res => {
              debugger
              console.info(res);
              if (res.status === 401) {
                this.$message.error("账号或密码错误");
              }
              this.$store.commit("set_token", res.token);
              sessionStorage.setItem("user_role",res.data.role)
              if (store.state.token) {
                this.$message({
                  message: "恭喜你，这是一条成功消息",
                  type: "success"
                });
                _userinfo().then(res=>{
                  console.info(res)
                  
                })
                this.$router.push("/dashboard");
                
              } else {  
                this.$router.replace("/login");
              }
            })
            .catch(err => {
              console.info(err);
              console.info(err);
              this.$message.error("账号或密码错误");
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    register() {
      // console.info(11)
      this.$router.push("/register");
    }
  },

  mounted() {}
};
</script>

<style scoped>
.login-wrap {
  position: relative;
  width: 100%;
  height: 100%;
  background-image: url(../../assets/login-bg.jpg);
  background-size: 100%;
}
.ms-title {
  width: 100%;
  line-height: 50px;
  text-align: center;
  font-size: 20px;
  color: #fff;
  border-bottom: 1px solid #ddd;
}
.ms-login {
  position: absolute;
  left: 50%;
  top: 50%;
  width: 350px;
  margin: -190px 0 0 -175px;
  border-radius: 5px;
  background: rgba(255, 255, 255, 0.3);
  overflow: hidden;
}
.ms-content {
  padding: 30px 30px;
}
.login-btn {
  text-align: center;
}
.login-btn button {
  width: 100%;
  height: 36px;
  margin-bottom: 10px;
}
.login-tips {
  font-size: 12px;
  line-height: 30px;
  color: #fff;
}
</style>